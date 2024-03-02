import { View, Text, Button, TouchableOpacity } from "react-native";

function Ride({ navigation }) {
    return (
        <>
            <View>
                <Button
                    title="Pickup"
                    onPress={() => navigation.navigate('PickUp')} />
            </View>
        </>
    );
} 

export default Ride;
