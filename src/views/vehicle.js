import { View, Text, Button } from "react-native";
import { useState } from "react";

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
            <Text>Vehicle Selection</Text>
            <View>
                <Text>{pickup.name}, {pickup.location.address}</Text>
            </View>
            <View>
                <Text>{destination.name}, {destination.location.address}</Text>
            </View>

            <Button onPress={() => calculateDistance('Bike')} title="Bike" />
            <Button onPress={() => calculateDistance('Auto')} title="Auto" />
            <Button onPress={() => calculateDistance('Car')} title="Car" />
        </View>
    )
}

export default VehicleSelection;