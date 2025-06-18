import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const HeaderComp = () => {
  return (
   <LinearGradient
      colors={['#00C6FF', '#0072FF']}  // Blue gradient colors
      style={styles.container}
    >
      {/* Speech bubble icon */}
      <View style={styles.iconContainer}>
        <Icon name="chat" size={100} color="white" />
      </View>

      {/* Login Title */}
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Forgot Password & Sign Up links */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.footerText, styles.signupText]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

export default HeaderComp

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff50',  // Slightly transparent white
    color: 'white',
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#0072FF',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 14,
  },
  signupText: {
    marginLeft: 20,
    textDecorationLine: 'underline',
  },
})