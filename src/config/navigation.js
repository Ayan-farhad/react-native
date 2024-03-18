import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../views/dashboard';
import Destination from '../views/destination';
import VehicleSelection from '../views/vehicle';
import Pickup from '../views/pickup';
import Signup from '../views/signup';
import Signin from '../views/signin';

const Drawer = createDrawerNavigator();

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

export { MyDrawer };