import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../views/dashboard';
import PickUp from '../views/pickup';
import Destination from '../views/destination';
import VehicleSelection from '../views/vehicle';
import Pickup from '../views/pickup';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

function AppNavigator() {
    return (
        <>
            <NavigationContainer >
                <Stack.Navigator >
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                    <Stack.Screen name="PickUp" component={PickUp} />
                    <Stack.Screen name="Destination" component={Destination} />
                </Stack.Navigator>
            </NavigationContainer>

        </>
    );
}

function WhatsAppTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Ride" component={Ride} />
            <Tab.Screen name="PickUp" component={PickUp} />
            <Tab.Screen name="Destination" component={Destination} />
        </Tab.Navigator>

    );
}

function MyDrawer() {
    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: 'rgb(139, 209, 34)', 
            },
            drawerStyle: {
                backgroundColor: 'rgb(31, 31, 36)',
            },
            drawerLabelStyle:{
                fontSize: 17
            },
            headerTintColor: '#fff',
            drawerActiveTintColor: 'green',
            drawerInactiveTintColor: 'rgb(187, 187, 187)',
    
        }}>
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Pickup" component={Pickup} />
            <Drawer.Screen name="Destination" component={Destination} />
            <Drawer.Screen name="VehicleSelection" component={VehicleSelection} />
        </Drawer.Navigator>
    );
}

export { AppNavigator, WhatsAppTabs, MyDrawer };