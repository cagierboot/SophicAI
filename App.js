import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import MindMap from './MindMap';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="MindMap"
          component={MindMap}
          options={{ title: '', headerLeft: () => null, headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;