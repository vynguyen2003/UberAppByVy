import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, setDestination, setOrigin } from '../ReduxSlices/navSlice';
import NavigationFav from '../Components/NavigationFav';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';

const HomeScreen = () => {
  const [isRidePressed, setRidePressed] = React.useState(true); 
  const [isFoodPressed, setFoodPressed] = React.useState(false);
  const [searchPlaceholder, setSearchPlaceholder] = React.useState("Where From?");
  const dispatch = useDispatch();    // call separate function from function state library redux slice
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin); // this is optional, just add to control the get a ride button when clicked

  async function setCurrentLocaion(){
    try{
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status != "granted"){
        Alert.alert("Current Location Permisson Not Allowed!");
        return;
      }
      let {coords} = await Location.getCurrentPositionAsync();
      if(coords){
        const {latitude, longitude} = coords;   // object destructure in javascript 
        let response = await Location.reverseGeocodeAsync({latitude,longitude}); //Location.reverseGeocodeAsync returns an array //{latitude,longitude} use object literal shorthand, pass direcly objects

        for (let item of response){
          let address = `${item.name} ${item.city} ${item.postalCode}`;
          return address;
        }
      }
    }
    catch(error){
      console.error(error);
    }
  }

  React.useEffect(() => {
    // Run when the component mounts
    async function init() {
      const address = await setCurrentLocaion();
      if (address) {
        setSearchPlaceholder(address);
      }
    }

    init();
  }, []); // run once first load

  return (
    <SafeAreaView style={tw `h-full bg-white`}>
      <View>
        <Image source={{uri: "https://cdn-images-1.medium.com/max/1200/1*kg5JVNgH_oJmwCBSA0NAXA.jpeg"}}
             style={[tw `ml-5`,{height: 110, width: 110, resizeMode: "contain"}]}
        />
        <View style={tw `flex-row justify-evenly bg-white border-b border-gray-200 `}>
          <TouchableOpacity 
            onPress={()=>{setRidePressed(true); setFoodPressed(false);}}
            style={tw `flex-row items-center justify-between w-33 px-4 py-3 rounded-full mb-5 ${isRidePressed && !isFoodPressed ? "bg-black" : "bg-white"}`}
          >
            <Icon name="car" type="font-awesome" color={isRidePressed && !isFoodPressed ? 'white' : 'black'} size={24} style={tw `ml-2`}/>
            <Text style={[tw `${isRidePressed && !isFoodPressed ? "text-white" : "text-black"}`,{fontSize: 18, marginRight: 7}]}>Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=> {setRidePressed(false); setFoodPressed(true);}}
            style={tw `flex-row items-center justify-between w-33 px-4 py-3 rounded-full mb-5 ${!isRidePressed && isFoodPressed ? "bg-black" : "bg-white"} `}
          >
            <Icon name="fast-food-outline" type="ionicon" color={!isRidePressed && isFoodPressed ? 'white' : 'black'} size={24} />
            <Text style={[tw `${!isRidePressed && isFoodPressed ? "text-white" : "text-black"}`, {fontSize: 18}]}>Delivery</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw `w-88 m-5`}>
       
        <GooglePlacesAutocomplete
          placeholder={searchPlaceholder}
          styles={{
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
          
          }}
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
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description,
            }));
            dispatch(setDestination(null));
            }
          }
            
        />
          
      </View>
      <NavigationFav/>
      
      <TouchableOpacity
        style={tw `bg-black w-90 ml-4 p-2 items-center mb-5 ${!origin && "bg-gray-300"}`}
        onPress={() => navigation.navigate("MapScreen")}
        disabled={!origin}
      >
        <Text style={tw `text-white text-xl font-semibold`}>Get a Ride</Text>
      </TouchableOpacity>
        
      
      
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({})

/*
setOrigin({
           location: {
              "lat": 43.2033332,
              "lng": -79.9198526,
            },
            description: "99 Medici Lane, Hamilton, ON, Canada"
          })
Object {
  "description": "99 Medici Lane, Hamilton, ON, Canada",
  "matched_substrings": Array [
    Object {
      "length": 2,
      "offset": 0,
    },
    Object {
      "length": 6,
      "offset": 3,
    },
  ],
  "place_id": "ChIJ_bXZN02FLIgRWGBU5vWK4BU",
  "reference": "ChIJ_bXZN02FLIgRWGBU5vWK4BU",
  "structured_formatting": Object {
    "main_text": "99 Medici Lane",
    "main_text_matched_substrings": Array [
      Object {
        "length": 2,
        "offset": 0,
      },
      Object {
        "length": 6,
        "offset": 3,
      },
    ],
    "secondary_text": "Hamilton, ON, Canada",
  },
  "terms": Array [
    Object {
      "offset": 0,
      "value": "99",
    },
    Object {
      "offset": 3,
      "value": "Medici Lane",
    },
    Object {
      "offset": 16,
      "value": "Hamilton",
    },
    Object {
      "offset": 26,
      "value": "ON",
    },
    Object {
      "offset": 30,
      "value": "Canada",
    },
  ],
  "types": Array [
    "premise",
    "geocode",
  ],
}
Object {
  "address_components": Array [
    Object {
      "long_name": "99",
      "short_name": "99",
      "types": Array [
        "street_number",
      ],
    },
    Object {
      "long_name": "Medici Lane",
      "short_name": "Medici Ln",
      "types": Array [
        "route",
      ],
    },
    Object {
      "long_name": "Mount Hope",
      "short_name": "Mount Hope",
      "types": Array [
        "neighborhood",
        "political",
      ],
    },
    Object {
      "long_name": "Hamilton",
      "short_name": "Hamilton",
      "types": Array [
        "locality",
        "political",
      ],
    },
    Object {
      "long_name": "Hamilton",
      "short_name": "Hamilton",
      "types": Array [
        "administrative_area_level_3",
        "political",
      ],
    },
    Object {
      "long_name": "Hamilton",
      "short_name": "Hamilton",
      "types": Array [
        "administrative_area_level_2",
        "political",
      ],
    },
    Object {
      "long_name": "Ontario",
      "short_name": "ON",
      "types": Array [
        "administrative_area_level_1",
        "political",
      ],
    },
    Object {
      "long_name": "Canada",
      "short_name": "CA",
      "types": Array [
        "country",
        "political",
      ],
    },
    Object {
      "long_name": "L0R 1W0",
      "short_name": "L0R 1W0",
      "types": Array [
        "postal_code",
      ],
    },
  ],
  "adr_address": "<span class=\"street-address\">99 Medici Ln</span>, <span class=\"locality\">Hamilton</span>, <span class=\"region\">ON</span> <span class=\"postal-code\">L0R 1W0</span>, <span class=\"country-name\">Canada</span>",
  "formatted_address": "99 Medici Ln, Hamilton, ON L0R 1W0, Canada",
  "geometry": Object {
    "location": Object {
      "lat": 43.2033332,
      "lng": -79.9198526,
    },
    "viewport": Object {
      "northeast": Object {
        "lat": 43.20479058029149,
        "lng": -79.91844106970849,
      },
      "southwest": Object {
        "lat": 43.20209261970849,
        "lng": -79.9211390302915,
      },
    },
  },
  "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
  "icon_background_color": "#7B9EB0",
  "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
  "name": "99 Medici Ln",
  "place_id": "ChIJ_bXZN02FLIgRWGBU5vWK4BU",
  "reference": "ChIJ_bXZN02FLIgRWGBU5vWK4BU",
  "types": Array [
    "premise",
  ],
  "url": "https://maps.google.com/?q=99+Medici+Ln,+Hamilton,+ON+L0R+1W0,+Canada&ftid=0x882c854d37d9b5fd:0x15e08af5e6546058",
  "utc_offset": -300,
  "vicinity": "Hamilton",
}
*/

// data: description, place_id, structure_formatting
//details: place_id: address_components, formatted_address, geometry, icon, name and types