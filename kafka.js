/**
 * Created by fwang1 on 3/25/15.
 */
module.exports = function (RED) {
    /*
     *   Kafka Producer
     *   Parameters:
     - brokerUrl(example: brokerUrl = “[host]:9092")
     */
    function kafkaNode(config) {
        RED.nodes.createNode(this, config);
        var topic = config.topic;
        var brokerUrl = config.brokerUrl;
        var debug = (config.debug == "debug");
        var node = this;
        var kafka = require('kafka-node');
        var HighLevelProducer = kafka.HighLevelProducer;
        var Client = kafka.KafkaClient;
        var client = new Client({ kafkaHost : brokerUrl });
        var producer = new HighLevelProducer(client);
        try {
            this.on("input", function (msg) {
                var payloads = [];
                payloads = [{ topic: topic, messages: msg.payload }];

                producer.send(payloads, function (err, data) {
                    if (err) {
                        node.error(err);
                    }
                    node.log("Message Sent: " + data);
                });
            });
        }
        catch (e) {
            node.error(e);
        }
        
        this.status({ fill: "green", shape: "dot", text: "connected to " + brokerUrl });
    }

    RED.nodes.registerType("kafka", kafkaNode);


    /*
     *   Kafka Consumer
     *   Parameters:
     - topic
     - groupId
     - brokerUrl(example: brokerUrl = “[host]:9092")
     */
    function kafkaInNode(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        var kafka = require('kafka-node');
        var HighLevelConsumer = kafka.HighLevelConsumer;
        var Client = kafka.KafkaClient;
        var topic = config.topic;
        var brokerUrl = config.brokerUrl;
        var groupId = config.groupId;
        var debug = (config.debug == "debug");

        var client = new Client({ kafkaHost: brokerUrl });

        var options = {
            groupId: groupId,
            autoCommitMsgCount: 10,
            autoCommit: true, 
            fetchMaxWaitMs: 1000, 
            fetchMaxBytes: 1024 * 1024 
        };

        var createConsumer = function () {
            try {
                var consumer = new HighLevelConsumer(client, topic, options);
                node.log("Consumer created...");
                node.status({ fill: "green", shape: "dot", text: "connected to " + brokerUrl });

                consumer.on('message', function (message) {
                    if (debug) {
                        console.log(message);
                        node.log(message);
                    }
                    var msg = { payload: message };
                    node.send(msg);
                });

                consumer.on('error', function (err) {
                    console.error(err);
                });
            }
            catch (e) {
                node.error(e);
                return;
            }
        };
    }

    RED.nodes.registerType("kafka in", kafkaInNode);
};