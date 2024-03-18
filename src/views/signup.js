import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { signUp } from '../config/firebase';

const Signup = () => {
  const [fullname, setfullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleRegisterBtn = async () => {
    try {
      await signUp(email, password, fullname);
      Alert.alert('Sign Up Successful!');
    } catch (error) {
      // Handle errors
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  const validateInputs = () => {
    if (!fullname || !email || !password) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  return (
    <View>
      <Text>SignUp</Text>
      <TextInput
        placeholder='Enter fullname'
        onChangeText={(text) => {
          setfullname(text);
          validateInputs();
        }}
      />
      <TextInput
        placeholder='Enter email'
        onChangeText={(text) => {
          setEmail(text);
          validateInputs();
        }}
      />
      <TextInput
        placeholder='Enter password'
        onChangeText={(text) => {
          setPassword(text);
          validateInputs();
        }}
        secureTextEntry={true}
      />
      <Button title='Signup' onPress={handleRegisterBtn} disabled={isButtonDisabled} />
    </View>
  );
};

export default Signup;
