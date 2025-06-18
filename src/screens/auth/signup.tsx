import React, { useEffect, useState } from 'react';
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
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from '../../utils/validation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GetMyFcm } from '../../firebase/helperFunctions';
import messaging from '@react-native-firebase/messaging';
import { auth, db } from '../../firebase/firebaseConfig';
import { serverTimestamp } from 'firebase/firestore';
import { showError, showSuccess } from '../../utils/HelperFuctions';
import Button from '../../components/authComp/button';

const Signup = ({ navigation, route }: any) => {
  const [formData, setFormData] = useState<any>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    fcm: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    emailError: '',
    firstNameError: '',
    lastNameError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  useEffect(() => {
    getFCM();
  }, []);

  const getFCM = async () => {
    await GetMyFcm().then(res => {
      console.log(res);
      setFormData((prevState: any) => ({
        ...prevState,
        fcm: res,
      }));
    });
  };

  const handleInputChange = (name: any, value: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    const emailErr = validateEmail(formData.email);
    const passwordErr = validatePassword(formData.password);
    const confirmPasswordErr = validateConfirmPassword(
      formData.password,
      formData.confirmPassword,
    );

    setErrors({
      emailError: emailErr,
      passwordError: passwordErr,
      confirmPasswordError: confirmPasswordErr,
      firstNameError: formData.firstName ? '' : 'First name is required.',
      lastNameError: formData.lastName ? '' : 'Last name is required.',
    });

    if (
      !emailErr &&
      !passwordErr &&
      !confirmPasswordErr &&
      formData.firstName &&
      formData.lastName
    ) {
      //   Alert.alert(
      //     'Sign Up Successful',
      //     'You have been successfully registered!',
      //   );
      try {
        setLoading(true);
        await auth
          .createUserWithEmailAndPassword(formData.email, formData.password)
          .then(async res => {
            if (res) {
              const userData = {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                createdAt: Date.now(),
                uid: res.user.uid,
                profile_pic:'',
                email_verified:false,
                message:'Start Conversation'
              };
              await db
                .collection('users')
                .doc(res.user.uid)
                .set(userData)
                .then(res => {
                  console.log(res);
                  setFormData({
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    confirmPassword: '',
                    fcm: '',
                  });
                  showSuccess('User Registered.');
                })
                .catch(err => {
                  console.log('Error in firestore', err);
                });
            }
          })
          .catch(err => {
            showError(err)
            console.log(err)})
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <KeyboardAwareScrollView
      //   style={styles.scrollView}
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
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={[
            styles.input,
            errors.firstNameError ? styles.inputError : null,
          ]}
          placeholder="First Name"
          placeholderTextColor="#fff"
          value={formData.firstName}
          onChangeText={text => handleInputChange('firstName', text)}
        />
        {errors.firstNameError ? (
          <Text style={styles.errorText}>{errors.firstNameError}</Text>
        ) : null}

        <TextInput
          style={[
            styles.input,
            errors.lastNameError ? styles.inputError : null,
          ]}
          placeholder="Last Name"
          placeholderTextColor="#fff"
          value={formData.lastName}
          onChangeText={text => handleInputChange('lastName', text)}
        />
        {errors.lastNameError ? (
          <Text style={styles.errorText}>{errors.lastNameError}</Text>
        ) : null}
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

        <TextInput
          style={[
            styles.input,
            errors.confirmPasswordError ? styles.inputError : null,
          ]}
          placeholder="Confirm Password"
          placeholderTextColor="#fff"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={text => handleInputChange('confirmPassword', text)}
        />
        {errors.confirmPasswordError ? (
          <Text style={styles.errorText}>{errors.confirmPasswordError}</Text>
        ) : null}
        <Button title="Signup" onPress={handleSignUp} loading={loading} />
        <Text style={styles.text}>
          Already have an account?{' '}
          <Text
            style={styles.login}
            onPress={() => {
              navigation.replace('Login');
            }}
          >
            Login
          </Text>
        </Text>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "'#0072FF'",
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 20,
    backgroundColor: "'#0072FF'",
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
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  gradientContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
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
