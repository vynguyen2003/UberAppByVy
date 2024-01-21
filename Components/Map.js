import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../ReduxSlices/navSlice';
import { Marker } from 'react-native-maps';
import { setTimePriceInformation } from '../ReduxSlices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from "@env";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const locationChangeRef = React.useRef();

  React.useEffect(() =>{
    if (!origin || !destination) return;

    //Zoom and fit to markers
    locationChangeRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50}
    });
  }, [origin, destination]);

  React.useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async() => {
       fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&units=imperial&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`).then((res) => res.json()).then(data => {
         console.log(data);// this is to check the json what's inside
         dispatch(setTimePriceInformation(data.rows[0].elements[0]));
       });
    };

    getTravelTime();
 }, [origin, destination, GOOGLE_MAPS_APIKEY]); 

  return (
      <MapView
         ref={locationChangeRef}
         style={{flex: 1}}
         initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}       
      >
        {origin?.location && (
            <>
            {console.log("origin: ", origin )} 
            <Marker
               coordinate = {{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
               }}
               title="Origin"
               description={origin.description}
               identifier="origin"
               pinColor='black'
            />
            </>
        )}
        {destination?.location && (
            <>
            {console.log("destination: ", destination )} 
            <Marker
               coordinate = {{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
               }}
               title="Destination"
               description={destination.description}
               identifier="destination"
            />
            </>
        )}
        {origin && destination && (
          <MapViewDirections
           origin={origin.description}
           destination={destination.description}
           apikey={GOOGLE_MAPS_APIKEY}
           strokeWidth={3}
           strokeColor="black"
           />
        )}

      </MapView>
          
      
   
    )
}

export default Map

const styles = StyleSheet.create({})