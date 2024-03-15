import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

function Dashboard({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logoDashboard.jpg')}
                style={styles.logo}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Pickup')}
            >
                <Text style={styles.buttonText}>Pickup</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: '100%',
        height: 300,
        marginBottom: 30,
    },
    button: {
        width: 250,
        backgroundColor: 'rgb(152, 240, 46)',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        shadowColor: 'rgba(0, 0, 0, 0.7)',
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
