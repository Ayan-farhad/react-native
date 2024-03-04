import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Dashboard({ navigation }) {
    return (
        <>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    disabled={!pickup}
                    onPress={() => navigation.navigate('Pickup')}
                >
                    <Text style={styles.buttonText}>Destination</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default Dashboard;
const styles = StyleSheet.create({
    button: {
        width: 300,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    }
})
