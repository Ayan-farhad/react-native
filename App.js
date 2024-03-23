import { StyleSheet } from 'react-native';
import { MyDrawer } from './src/config/navigation';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

export default function App() {

  return (
    <>
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