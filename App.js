import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './assets/screens/home';
import GameScreen from './assets/screens/game';
import HostScreen from './assets/screens/host';
import JoinScreen from './assets/screens/join';
import CreateScreen from './assets/screens/create';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');
const Stack = createNativeStackNavigator();

function App() {
  const linking = {prefixes: [prefix],};
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Host" component={HostScreen} />
          <Stack.Screen name="Join" component={JoinScreen} />
          <Stack.Screen name="Create" component={CreateScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;