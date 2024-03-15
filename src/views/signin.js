import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { signIn } from '../config/firebase';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginBtn = async () => {
        try {
            await signIn(email, password);
            Alert.alert('Sign In Successful!');
        } catch (error) {
            // Handle errors
            console.error(error);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View>
            <Text>Sign In</Text>
            <TextInput placeholder='Enter email' onChangeText={setEmail} />
            <TextInput placeholder='Enter password' onChangeText={setPassword} secureTextEntry={true} />
            <Button title='Signin' onPress={handleLoginBtn} />
        </View>
    );
};

export default Signin;
