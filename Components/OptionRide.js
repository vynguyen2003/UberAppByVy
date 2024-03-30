import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from "twrnc"
import { useSelector } from 'react-redux'
import { selectTimePriceInformation } from '../ReduxSlices/navSlice'
import 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const OptionRide = () => {
  const timePriceInformation = useSelector(selectTimePriceInformation);
  const chargeRate = 1.5;
  const [chooseFare, setChooseFare] = React.useState(null);
  const navigation = useNavigation();
  // store in array of objects, since it has the same pattern
  const data = [
    {
        id: "123",
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_538/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png",
        title: "UberX", 
        priceTimes: 1
    },
    {
        id: "124",
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_538/v1635756461/assets/36/e053ef-e935-4549-a10e-9d97ef38116f/original/uber-van.png",
        title: "Uber LUX", 
        priceTimes: 1.3
    },
    {
        id: "125",
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_956/v1599010311/assets/00/4c6379-7586-4d55-9fe6-8170b18260d1/original/Product-Icon-2.jpg",
        title: "Uber Green", 
        priceTimes: 1.35
    },
    {
        id: "126",
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_851,h_478/v1597151185/assets/e0/815670-02de-44f4-83fa-02fdab69d751/original/Pool.jpg",
        title: "Uber Share", 
        priceTimes: 0.7
    },
  ]
  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
       <View style={tw `items-center p-3 `}>
          <TouchableOpacity
            style={tw `absolute top-1 left-5 z-50 p-3 rounded-full`}
            onPress={() => navigation.navigate("DestinationCard")}
          >
            <Icon name="chevron-left" type="fontawesome" />
          </TouchableOpacity>
          <Text style={tw `text-lg font-semibold`}>Choose a Ride - {timePriceInformation?.distance?.text}</Text>
       </View>
       <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={tw `flex-row`}
              onPress={() => {setChooseFare(item)}}
            >
                <Image source={{uri: item.image}} style={{height: 110, width: 110, resizeMode: "contain"}} />
                <View style={tw `m-5`}>
                    <Text style={tw `font-semibold text-xl`}>{item.title}</Text>
                    <Text>{timePriceInformation?.duration?.text} travel time</Text>
                </View>
                <View style={tw `mt-5`}>
                <Text style={tw `text-xl`}>
                {new Intl.NumberFormat('en-gb', {
                  style: "currency",
                  currency: "CAD"
                }).format(
                  (timePriceInformation?.duration?.value * chargeRate * item.priceTimes) / 100
                )}
              </Text>
              </View>
            </TouchableOpacity>
          )}
       />
       <TouchableOpacity
         style={tw `bg-black w-88 p-3 mr-4 ml-5 mb-5  items-center ${(!chooseFare) && "bg-gray-300"}`}
         disabled={!chooseFare}
       >
         <Text style={[tw `text-white font-semibold`, {fontSize: 18}]}>Choose {chooseFare?.title}</Text>
       </TouchableOpacity>

    </View>
  )
}

export default OptionRide;

const styles = StyleSheet.create({})

/*
 "rows": Array [
    Object {
      "elements": Array [
        Object {
          "distance": Object {
            "text": "3.6 mi",
            "value": 5848,
          },
          "duration": Object {
            "text": "10 mins",
            "value": 588,
          },
          "status": "OK",
        },
      ],
    },
  ],
  "status": "OK",
*/
