import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  // Or use another icon library if you prefer

interface props{
  navigation?: any;
  route: import('@react-navigation/native').RouteProp<any>;
}

const Startup = ({navigation, route}:props) => {


  useEffect(()=>{
    setTimeout(() => {
      navigation.replace('Login')
    }, 3000);
  },[])


  return (
      <LinearGradient
      colors={['#00C6FF', '#0072FF']}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Icon name="chat" size={100} color="white" />
      </View>
      <Text style={styles.title}>{'Welcome to\nAhdus Technologies Task'}</Text>
      {/* <Text style={styles.subtitle}>Simple and Secure Messaging</Text> */}
    </LinearGradient>
  )
}

export default Startup

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center'
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
})