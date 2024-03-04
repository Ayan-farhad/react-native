import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';

function Destination({ route, navigation }) {
    const { pickup } = route.params
    const [location, setLocation] = useState(null);
    const [places, setPlaces] = useState([]);
    const [destination, setDestination] = useState('');


    useEffect(() => {
        (async () => {
            Location.watchPositionAsync({
                accuracy: 6,
                distanceInterval: 1,
            }, (location) => {
                setLocation(location);
                console.log("🚀 ~ location:", location)
            });

        })();
    }, []);

    const searchLocation = (text) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'fsq3WHMGprK/+av7EmgdCAvnn1Qwm112bsOx/pmYmcyLiyg='
            }
        };

        const { latitude, longitude } = location.coords;

        fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&radius=3000`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setPlaces(response.results)
            })
            .catch(err => console.error(err));
    }

    const onPlaceSelect = (item) => {
        setDestination(item);
    }

    if (!location) {
        return <Text>loading...</Text>
    }


    return (
        <>
            <View>
                <View>
                    <Text>{pickup.name},{pickup.location.address}</Text>
                </View>

                <TextInput style={styles.input} placeholder='Search' onChangeText={searchLocation} />

                {!destination && <View>
                    {places.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => onPlaceSelect(item)}>
                                <Text>{item.name},{item.location.address}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>}


                {destination && <View>
                    <Text>Your selected location </Text>
                    <Text>{destination.name}, {destination.location.address}</Text>
                </View>
                }


                <MapView
                    showsMyLocationButton
                    showsUserLocation
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0001,
                        longitudeDelta: 0.0001,
                    }}>

                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title={"My location"}
                        description={"This is my marker description"} />

                </MapView>

                <TouchableOpacity
                    style={styles.button}
                    disabled={!pickup}
                    onPress={() => navigation.navigate('VehicleSelection', { pickup, destination })}
                >
                    <Text style={styles.buttonText}>Destination</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default Destination;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '80%',
        zIndex: 0
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: 'gray',
        borderRadius: 8,
        alignSelf: 'center',
        paddingLeft: 10,
        marginTop: 20
    },
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

});