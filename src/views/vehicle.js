import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from "react-native";

function VehicleSelection({ route }) {
    const { pickup, destination } = route.params
    console.log("🚀 ~ VehicleSelection ~ pickup:", pickup)

    const VehicleCharges = {
        Bike: 50,
        Auto: 130,
        Car: 200
    }

    const calculateDistance = (vehicle) => {
        const { latitude: pickupLat, longitude: pickupLong } = pickup.geocodes.main;
        const { latitude: destinationLat, longitude: destinationLong } = destination.geocodes.main;

        const distance = calcCrow(pickupLat, pickupLong, destinationLat, destinationLong);

        const fare = VehicleCharges[vehicle] * distance
        alert('Rs .' + fare.toFixed(2))
    }

    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }

    return (
        <View>
            <View>
                <Text style={styles.locationText}>Your Selected Pickup Location</Text>
                <Text style={styles.text}>{pickup.name}, {pickup.location.address}</Text>
            </View>
            <View>
                <Text style={styles.locationText}>Your Selected Destination Location</Text>
                <Text style={styles.text}>{destination.name}, {destination.location.address}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => calculateDistance('Bike')} style={styles.button}>
                    <Image source={require("../../assets/Bike.png")} style={styles.image} />
                    <Text style={styles.buttonText}>Bike</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => calculateDistance('Auto')} style={styles.button}>
                    <Image source={require("../../assets/Car.png")} style={styles.image} />
                    <Text style={styles.buttonText}>Car</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => calculateDistance('Car')} style={styles.button}>
                    <Image source={require("../../assets/AutoRickshaw.png")} style={styles.image} />
                    <Text style={styles.buttonText}>Auto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default VehicleSelection;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        resizeMode: 'cover'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        width: 100,
        height: 100,
        alignItems: 'center'
    },
    buttonText: {
        marginTop: 5,
        color: 'green',
    },
    locationText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'rgb(73, 72, 72)'
    },
    text:{
        fontSize: 15,
    }
});
