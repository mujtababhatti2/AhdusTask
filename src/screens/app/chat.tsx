import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MessageBubble from '../../components/appComp/messageBubble';
import InputField from '../../components/appComp/chatInput';
import Header from '../../components/appComp/header';
import EmojiSelector from 'react-native-emoji-selector';
import { auth, db } from '../../firebase/firebaseConfig';
import { MMKVStorage } from '../../utils/HelperFuctions';
import {
  addToArray,
  getData,
  saveData,
  updateData,
} from '../../firebase/helperFunctions';

const Chat = ({ navigation, route }: any) => {
  const { user } = route.params;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [emojiModalVisible, setEmojiModalVisible] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    getCurrentUser();
    db.collection('message').onSnapshot(() => {
      fetchMessages();
    });
  }, []);
  const getCurrentUser = async () => {
    let parsedUserData = '';
    const storedUserData = MMKVStorage.getString('userData');
    console.log({ storedUserData });
    if (storedUserData) {
      parsedUserData = JSON.parse(storedUserData);
      console.log(parsedUserData);
      setUserData(parsedUserData);
    }
  };

  const fetchMessages = async () => {
    try {
      await getData('message', user.uid).then((res: any) => {
        console.log(res.message);
        setMessages(res.message);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (user && message.trim()) {
      const messageData = {
        text: message,
        sender: userData.uid,
        timestamp: Date.now(),
        receiver: user.uid,
      };

      try {
        await addToArray('message', userData.uid, 'messages', messageData).then(
          async res => {
            await addToArray('message', user.uid, 'message', messageData).then(
              async res => {
                await updateData('users', userData.uid, {
                  message: message,
                });
              },
            );
          },
        );

        setMessage('');
      } catch (error) {
        console.log('Error sending message:', error);
      }
    } else {
      console.log('User not authenticated or message is empty');
    }
  };

  const addEmoji = (emoji: any) => {
    setMessage(prevMessage => prevMessage + emoji);
    setEmojiModalVisible(false);
  };
  return (
    <LinearGradient colors={['#00C6FF', '#0072FF']} style={styles.container}>
      <View style={styles.chatContainer}>
        <Header title={`${user.firstName} ${user.lastName}`} />
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <MessageBubble message={item} sender={userData} />
          )}
          keyExtractor={item => item.id}
          style={styles.messageList}
          inverted
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}
        >
          <InputField
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            setEmojiModalVisible={setEmojiModalVisible}
          />
        </KeyboardAvoidingView>
      </View>
      {emojiModalVisible ? <EmojiSelector onEmojiSelected={addEmoji} /> : null}
      {/* <Modal
        visible={emojiModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEmojiModalVisible(false)}
      >
        <View style={styles.modal}>
         
          <TouchableOpacity
            onPress={() => setEmojiModalVisible(false)}
            style={styles.closeModalButton}
          >
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  chatContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  header: {
    height: 50,
    backgroundColor: '#0072FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  closeModalButton: {
    padding: 10,
    backgroundColor: '#0072FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModalText: {
    color: 'white',
    fontSize: 16,
  },
});
export default Chat;
