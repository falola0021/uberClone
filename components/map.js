import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectOrigin,
  selectDestination,
  setTravelTimeInformation,
} from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useRef } from 'react';
const map = () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  useEffect(() => {
    if (!origin || !destination) return;
    // console.log(origin, destination)

    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          let distanceTimeInfo = data.rows[0].elements[0];
          console.log(distanceTimeInfo);
          dispatch(setTravelTimeInformation(distanceTimeInfo));
        });
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      mapType='mutedStandard'
      style={tw`flex-1`}
      region={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}>
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor='black'
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title='Origin'
          description={origin.description}
          identifier='origin'
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title='Destination'
          description={destination.description}
          identifier='destination'
        />
      )}
    </MapView>
  );
};

export default map;
