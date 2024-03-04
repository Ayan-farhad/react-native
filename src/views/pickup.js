import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';

function Pickup({ navigation }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [places, setPlaces] = useState([]);
    const [pickup, setPickup] = useState('');

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            Location.watchPositionAsync({
                accuracy: 6,
                distanceInterval: 1,
            }, (location) => {
                setLocation(location);
                console.log("🚀 ~ newLocation:", location)
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
        setPickup(item);
    }

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    if (!location) {
        return <Text>Loading.....</Text>
    }

    return (
        <>
            {location && (
                <View style={styles.container}>

                    <TextInput style={styles.input} placeholder='Search' onChangeText={searchLocation} />

                    {!pickup && <View>
                        {places.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => onPlaceSelect(item)}>
                                    <Text>{item.name},{item.location.address}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>}


                    {pickup && <View>
                        <Text>Your selected location </Text>
                        <Text>{pickup.name}, {pickup.location.address}</Text>
                    </View>
                    }

                    <MapView
                        showsMyLocationButton
                        showsUserLocation
                        style={styles.map}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0010,
                            longitudeDelta: 0.0010,
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
                        onPress={() => navigation.navigate('Destination', { pickup })}
                    >
                        <Text style={styles.buttonText}>Destination</Text>
                    </TouchableOpacity>

                </View>

            )}
        </>
    );
}

export default Pickup;
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