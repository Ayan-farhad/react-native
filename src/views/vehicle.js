import { View, Text, Button, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

function VehicleSelection({ route }) {
    const { pickup, destination } = route.params
    console.log("🚀 ~ VehicleSelection ~ pickup:", pickup)

    if (!pickup) {
        return (
            <View>
                <Text>
                    Error: Pickup location not found
                </Text>
            </View>
        )
    }

    const VehicleCharges = {
        Bike: 50,
        Auto: 130,
        Car: 250,
        Courier: 300,
        Truck: 500,
        miniCar: 180,
        city: 1000, 
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
                <View>
                    <Text style={styles.locationText}>Your Selected Pickup Location</Text>
                    <Text style={styles.text}>{pickup.name}, {pickup.location.address}</Text>
                </View>
                <View>
                    <Text style={styles.locationText}>Your Selected Destination Location</Text>
                    <Text style={styles.text}>{destination.name}, {destination.location.address}</Text>
                </View>
            </View>

            <Text style={styles.service} >Categories</Text>

            <ScrollView horizontal={true} style={{ height: 150 }} >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => calculateDistance('Bike')} style={styles.button}>
                        <Image source={require("../../assets/Bike.png")} style={styles.image} />
                        <Text style={styles.buttonText}>Bike</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => calculateDistance('Auto')} style={styles.button}>
                        <Image source={require("../../assets/AutoRickshaw.png")} style={styles.image} />
                        <Text style={styles.buttonText}>Auto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => calculateDistance('Car')} style={styles.button}>
                        <Image source={require("../../assets/Car.png")} style={styles.image} />
                        <Text style={styles.buttonText}>Car</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => calculateDistance('miniCar')} style={styles.button}>
                        <Image source={require("../../assets/mini-car.webp")} style={styles.image} />
                        <Text style={styles.buttonText}>mini ride</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => calculateDistance('Courier')} style={styles.button}>
                        <Image source={require("../../assets/Courier.webp")} style={styles.image} />
                        <Text style={styles.buttonText}>Courier</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => calculateDistance('Truck')} style={styles.button}>
                        <Image source={require("../../assets/Truck.webp")} style={styles.image} />
                        <Text style={styles.buttonText}>Truck</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => calculateDistance('city')} style={styles.button}>
                        <Image source={require("../../assets/4x4.jpeg")} style={styles.image} />
                        <Text style={styles.buttonText}>City to city</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>


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
        marginLeft: 15,
        alignItems: 'center'
    },
    buttonText: {
        marginTop: 5,
        color: 'green',
    },
    locationText: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10,
    },
    text: {
        fontSize: 15,
        color: 'gray',
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 10,
    },
    service: {
        marginTop: 20,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    }
});
