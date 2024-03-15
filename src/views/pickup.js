import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';

function Pickup({ navigation }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [places, setPlaces] = useState([]);
    const [pickup, setPickup] = useState('');
    const [searchText, setSearchText] = useState('');

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
        setSearchText(''); // Clear search text
        setPlaces([]); // Clear places
    }

    const clearPickup = () => {
        setPickup('');
        setSearchText('');
        setPlaces([]);
    }

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    if (!location) {
        return (
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center',}}>Loading...</Text>
        )
    }


    return (
        <>
            {location && (
                <View style={styles.container}>

                    <TextInput
                        style={styles.input}
                        placeholder='Search'
                        onChangeText={searchLocation}
                        // value={searchText}
                    />

                    {!pickup && <View>
                        {places.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => onPlaceSelect(item)} style={styles.itemContainer}>
                                    <Text style={styles.itemText}>{item.name}, {item.location.address}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>}

                    {pickup && (
                        <View style={styles.selectedLocation}>
                            <Text style={styles.textSelected}>Your selected location:</Text>
                            <View style={styles.detailContainer}>
                                <Text>{pickup.name}, {pickup.location.address}</Text>
                                <TouchableOpacity onPress={clearPickup}>
                                    <Text style={styles.clearButton}>×</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}


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
                        style={[styles.button, { backgroundColor: pickup ? 'rgb(152, 240, 46)' : 'lightgray' }]}
                        disabled={!pickup}
                        onPress={() => navigation.navigate('Destination', { pickup })}
                    >
                        <Text style={styles.buttonText}>Destination</Text>
                    </TouchableOpacity>

                    <View style={{ height: 20 }}></View>
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
        flex: 1,
        width: '100%',
        height: '70%',
        zIndex: 0
    },
    input: {
        width: '90%',
        height: 40,
        backgroundColor: 'lightgray',
        borderRadius: 8,
        alignSelf: 'center',
        paddingLeft: 10,
        marginTop: 5
    },
    button: {
        width: 250,
        height: 45,
        backgroundColor: 'rgb(152, 240, 46)',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.7)',
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    itemContainer: {
        backgroundColor: '#f0f0f0',
        padding: 5,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    itemText: {
        fontSize: 14,
    },
    selectedLocation: {
        marginTop: 10,
        padding: 8,
        backgroundColor: 'rgb(213, 212, 212)',
        borderRadius: 5,
    },
    textSelected: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clearButton: {
        marginLeft: 30,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'red',
    }

});