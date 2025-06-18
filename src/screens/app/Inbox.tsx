import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MMKVStorage, showError } from '../../utils/HelperFuctions';
import { db } from '../../firebase/firebaseConfig';

const Inbox = ({ navigation, route }: any) => {
  const [loading, setLoading] = useState(true);
  const [inboxData, setInboxData] = useState<any>([]);
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    // getUserDataFromMMKV();
    fetchUsers();
  }, []);

  const getUserDataFromMMKV = () => {
    try {
      const storedUserData = MMKVStorage.getString('userData');

      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        console.log(parsedUserData);
        setUserData(parsedUserData);
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error retrieving user data from MMKV:', error);
    }
  };

  const fetchUsers = async () => {
    let parsedUserData = {};
    try {
      const storedUserData = MMKVStorage.getString('userData');
      if (storedUserData) {
        parsedUserData = JSON.parse(storedUserData);
        console.log(parsedUserData);
        setUserData(parsedUserData);
      }
      // Query Firestore to get all users
      await db.collection('users').onSnapshot(snapshot => {
        const userList = snapshot.docs
          .map(doc => ({
            id: doc.id, // Document ID
            ...doc.data(), // All user data from Firestore
          }))
          .filter(user => user.id !== parsedUserData.uid); // Exclude active user

        console.log(userList);
        setInboxData(userList);
      });
    } catch (err) {
      showError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item: any) => {
    navigation.navigate('Chat', { user: item });
  };
  return (
    <LinearGradient colors={['#00C6FF', '#0072FF']} style={styles.container}>
      <Text style={styles.title}>Inbox</Text>

      <FlatList
        data={inboxData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleItemClick(item)}
          >
            <Icon name="email" size={30} color="white" style={styles.icon} />

            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>
                {item.firstName} {item.lastName}
              </Text>
              {/* <Text style={styles.itemSender}>{item.sender}</Text> */}
              <Text style={styles.itemPreview}>{item.message}</Text>
            </View>

            <Text style={styles.itemTime}>{item.time}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </LinearGradient>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff30',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    height: 80,
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  itemSender: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  itemPreview: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
  },
  itemTime: {
    fontSize: 12,
    color: 'white',
    marginLeft: 10,
    alignSelf: 'center',
  },
});
