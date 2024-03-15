import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../views/dashboard';
import PickUp from '../views/pickup';
import Destination from '../views/destination';
import VehicleSelection from '../views/vehicle';
import Pickup from '../views/pickup';
import Signup from '../views/signup';
import Signin from '../views/signin';

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
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="PickUp" component={PickUp} />
            <Tab.Screen name="Destination" component={Destination} />
        </Tab.Navigator>

    );
}

function MyDrawer() {
    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: 'rgb(152, 240, 46)',
            },
            drawerStyle: {
                backgroundColor: 'rgb(31, 31, 36)',
            },
            drawerLabelStyle: {
                fontSize: 17
            },
            headerTintColor: 'black',
            drawerActiveTintColor: 'rgb(152, 240, 46)',
            drawerInactiveTintColor: 'rgb(187, 187, 187)',
        }}>

            <Drawer.Screen name="Signup page" component={Signup} />
            <Drawer.Screen name="SignIn page" component={Signin} />
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Pickup" component={Pickup} />
            <Drawer.Screen name="Destination" component={Destination} />
            <Drawer.Screen name="Vehicle Selection" component={VehicleSelection} />
        </Drawer.Navigator>
    );
}

export { AppNavigator, WhatsAppTabs, MyDrawer };