import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Optional icon
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // For handling keyboard scroll
import auth from '@react-native-firebase/auth'; // Import Firebase Auth
import { validateEmail, validatePassword } from '../../utils/validation';
import Button from '../../components/authComp/button';
import { db } from '../../firebase/firebaseConfig';
import { MMKVStorage } from '../../utils/HelperFuctions';

const Login = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const emailErr = validateEmail(formData.email);
    const passwordErr = validatePassword(formData.password);

    setErrors({
      emailError: emailErr,
      passwordError: passwordErr,
    });

    if (!emailErr && !passwordErr) {
      try {
        setLoading(true);
        await auth()
          .signInWithEmailAndPassword(formData.email, formData.password)
          .then(async res => {
            console.log(res.user.uid);
            let uid = res.user.uid
            const userDocument:any = await db.collection('users').doc(uid).get()
            if(userDocument.exists){
                console.log(userDocument.data())
                MMKVStorage.set('userData', JSON.stringify(userDocument.data()))
                navigation.replace('Main')
            }
          });
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Error', 'No user found with this email.');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Error', 'Incorrect password.');
        } else {
          Alert.alert('Login Error', error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={true}
>
      <LinearGradient
        colors={['#00C6FF', '#0072FF']} 
        style={styles.gradientContainer}
      >
        <View style={styles.iconContainer}>
          <Icon name="chat" size={100} color="white" />
        </View>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={[styles.input, errors.emailError ? styles.inputError : null]}
          placeholder="Email"
          placeholderTextColor="#fff"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={text => handleInputChange('email', text)}
        />
        {errors.emailError ? (
          <Text style={styles.errorText}>{errors.emailError}</Text>
        ) : null}
        <TextInput
          style={[
            styles.input,
            errors.passwordError ? styles.inputError : null,
          ]}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry
          value={formData.password}
          onChangeText={text => handleInputChange('password', text)}
        />
        {errors.passwordError ? (
          <Text style={styles.errorText}>{errors.passwordError}</Text>
        ) : null}
        <Button title="Login" onPress={handleLogin} loading={loading} />
        <Text style={styles.text}>
          Don't have an account?{' '}
          <Text
            style={styles.login}
            onPress={() => {
              navigation.replace('Signup');
            }}
          >
            Signup
          </Text>
        </Text>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff50', // Slightly transparent white
    color: 'white',
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#0072FF',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  iconContainer: {
    marginBottom: 20,
  },
  text: {
    color: 'white',
    marginTop: 5,
    fontSize: 15,
  },
  login: {
    fontWeight: 'bold',
  },
});

export default Login;
