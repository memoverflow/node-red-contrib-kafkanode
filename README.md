PATCHED VERSION OF https://www.npmjs.com/package/node-red-contrib-kafka-node

# Kafka Node
Kafka node can produce/consume the mesasges to/from kafka cluster along with topic on [NodeRED](http://nodered.org).


## Install

Install from [npm](http://npmjs.org)
```
npm install -g node-red-contrib-kafka-node-latest
```

## Prerequisites
 * Node-RED platform. (see [Node-RED](http://nodered.org/docs/getting-started/installation.html))
 * Kafka cluster (see [Kafka](http://kafka.apache.org/documentation.html#gettingStarted)). 
 * Some topics (see [How to create a topic](http://kafka.apache.org/documentation.html#quickstart))

## Usage
##### Producer Node

![Alt text](https://github.com/fwang7/node-red-contrib-kafka-node/blob/screenshot/imgs/producer.jpg?raw=true "Producer Example")

###### Parameters:
 - brokerUrl - <i>The brokerUrl of Kafka.
 - Topic - <i>The topic of message to produce.

##### Consumer Node

![Alt text](https://github.com/fwang7/node-red-contrib-kafka-node/blob/screenshot/imgs/consumer.jpg?raw=true "Consumer Example")

###### Parameters:
 - brokerUrl - <i>TThe brokerUrl of Kafka.
 - Topic - <i>The topic of message to produce.
 - GroupId - <i> The group ID.
> Group ID is a string that uniquely identifies the group of consumer processes to which this consumer belongs. By setting the same group id multiple processes indicate that they are all part of the same consumer group.


## Version
0.1.5

## Tech
 * [Kafka](http://kafka.apache.org/) - Apache Kafka is publish-subscribe messaging rethought as a distributed commit log.
 * [Zookeeper](https://zookeeper.apache.org/) - ZooKeeper is a centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services.
 * [Kafka-Node](https://www.npmjs.com/package/kafka-node) - Kafka-node is a Node.js client with Zookeeper integration for Apache Kafka 0.8.1 and later. 


## Authors
* Lucas Ren - [nichokiki@hotmail.com](mailto:nichokiki@hotmail.com)