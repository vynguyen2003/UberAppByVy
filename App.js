import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import MapScreen from './Screens/MapScreen';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
             style={{flex: 1}} 
             behavior={Platform.OS === "ios" ? "padding" : "height"}
             keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen
               name = "HomeScreen"  //need to the same when navigate to 
               component = {HomeScreen}
               options={{
                 headerShown: false,
               }}
              />
            
            <Stack.Screen
               name = "MapScreen"  //need to the same when navigate to 
               component = {MapScreen}
               options={{
                 headerShown: false,
               }}
              />
            
            </Stack.Navigator>
            
          </KeyboardAvoidingView>

        </SafeAreaProvider>
      </NavigationContainer>

    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
