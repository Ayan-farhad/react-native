import { View, Text, Button } from "react-native";

function Updates({ navigation }) {
    return (
        <>
            <View>
                <Button title="Calls" onPress={() => navigation.navigate('Calls')} />
                <Text>
                    Status
                </Text>
            </View>
        </>
    );
}

export default Updates;