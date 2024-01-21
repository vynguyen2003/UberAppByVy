import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from "twrnc"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { selectDestination, setDestination } from '../ReduxSlices/navSlice';
import NavigationFav from './NavigationFav';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const DestinationCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);
  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
      <View style={tw `items-center p-3`}>
        <Text style={[tw `font-semibold`, {fontSize: 20}]}>Welcome Back Vy!</Text>
      </View>
      <View style={tw `bg-gray-200 h-0.5` }/>
      <View style={{ padding: 5}}>
        <GooglePlacesAutocomplete
          placeholder={"Where To?"}
          styles={searchBoxStyles}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en"
          }}
          nearbyPlacesAPI = "GooglePlacesSearch"
          debounce={400}
          
          onPress={(data, details = null) => {
            console.log(data);
            console.log(details);
            dispatch(setDestination({
              location: details.geometry.location,
              description: data.description,
            }));
            }
          }
            
        />
      </View>

      <NavigationFav/>
      
      <View style={tw `flex-1 m-5`}>
        <TouchableOpacity
          style={tw `w-full items-center bg-black p-3 ${!destination && "bg-gray-300"}`}
          onPress={() => (navigation.navigate("OptionRide"))}
          disabled={!destination}
        >
          <Text style={[tw `text-white font-semibold` , {fontSize: 18}]}>Pick a Ride</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default DestinationCard

const searchBoxStyles = StyleSheet.create({
    container:{
        flex: 0,
        backgroundColor: "white",
      },
      textInputContainer:{
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginTop: 2,
        
      },
      textInput:{
        fontSize: 20,
        fontFamily: "Arial",
        borderRadius: 20, // Adjust the value based on your preference
        backgroundColor: '#dbdcdc',
        color: "black"
        //fontWeight: "bold"
      },
  
})