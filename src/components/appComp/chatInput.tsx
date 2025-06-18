import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputField = ({ message, setMessage, sendMessage, setEmojiModalVisible }: any) => {
  return (
    <View style={styles.inputFieldContainer}>
      <TextInput
        style={styles.textInput}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        placeholderTextColor="#ccc"
      />
      {/* <TouchableOpacity onPress={() => setEmojiModalVisible(true)}>
        <Icon name="emoticon" size={30} color="#0072FF" />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={sendMessage}>
        <Icon name="send" size={30} color="#0072FF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    // backgroundColor: '#f1f1f1',
    paddingLeft: 15,
    fontSize: 16,
  },
});

export default InputField;
