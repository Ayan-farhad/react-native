import { StyleSheet, View, Text } from 'react-native';
import { AppNavigator, MyDrawer, WhatsAppTabs } from './src/config/navigation';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <>
      {/* <AppNavigator>
        <View style={styles.container}></View>
      </AppNavigator>*/}

      {/* <View style={styles.container}></View>
      <NavigationContainer >
        <WhatsAppTabs />
      </NavigationContainer> */}

      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>


    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});