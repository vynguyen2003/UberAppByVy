import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import tw from "twrnc";

const NavigationFav = () => {
  const data = [
    {   
        id : "1",
        icon: "home",
        title: "Home",
        description: "Medici Lane, Hamilton, ON, Canada"
    },
    {
        id : "2",
        icon: "briefcase",
        title: "Work",
        description: "Mohawk College, Hamilton, ON, Canada"
    }
  ]
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={tw `h-0.5 bg-gray-200 ml-3, mr-3`} /> 
      )}
      renderItem={({item}) => (
        <TouchableOpacity style={tw `flex-row items-center p-5`}>
            <Icon
               style={tw `mr-5 bg-gray-400 rounded-full p-2`}
               name={item.icon}
               type="ionicon"
               color="white"
               size={25}
            />
            <View>
                <Text style={tw `font-semibold text-lg`}>{item.title}</Text>
                <Text style={tw `text-base text-gray-500`}>{item.description}</Text>
            </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavigationFav

const styles = StyleSheet.create({})