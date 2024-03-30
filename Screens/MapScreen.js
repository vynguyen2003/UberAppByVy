import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import Map from '../Components/Map'
import tw from "twrnc";
import OptionRide from '../Components/OptionRide';
import DestinationCard from '../Components/DestinationCard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

// in the MapScreen will have Map component and additional components.
const MapScreen = () => {
  const Stack = createStackNavigator();

  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
        <View style={{width: "100%", height: "50%"}}>
            <Map/>
        </View>        
        // use stack navigator to flip back and forth to other cards, while Map does not swip to anything, so navigation does not need to use for it
        <Stack.Navigator>
            <Stack.Screen
             name = "DestinationCard"  //need to the same when navigate to 
             component = {DestinationCard}
             options={{
               headerShown: false,
             }}
            />
            <Stack.Screen
             name = "OptionRide"  //need to the same when navigate to 
             component = {OptionRide}
             options={{
               headerShown: false,
             }}
            />
        </Stack.Navigator>
        
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})
