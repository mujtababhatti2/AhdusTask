import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const MessageBubble = ({ message, sender }:any) => {

  return (
    <View
      style={[
        styles.messageBubble,
        message.sender === sender.uid ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Text style={[styles.messageText, message.sender !== 'me' && styles.receivedText]}>
        {message.text}
      </Text>
      <Text style={styles.timestamp}>{moment(message.timestamp).format('hh:mm')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  sentMessage: {
    backgroundColor: '#0072FF',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  receivedMessage: {
    backgroundColor: '#fff', // White background for received messages
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#0072FF',
  },
  messageText: {
    fontSize: 16,
    color: '#fff', // White text for sent messages
  },
  receivedText: {
    color: '#000', // Black text for received messages
  },
  timestamp: {
    fontSize: 12,
    color: '#ccc',
    alignSelf: 'flex-end',
    width:50,
    textAlign:'right'
  },
});

export default MessageBubble;
