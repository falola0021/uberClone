import React from 'react';

import tw from 'tailwind-react-native-classnames';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/core';
import NavFavourite from './NavFavourite';
import { Icon } from 'react-native-elements/dist/icons/Icon';
const NavigationCard = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Adedayo</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            styles={toInputBokStyle}
            placeholder='Where To ?'
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            query={{ key: GOOGLE_MAPS_APIKEY, language: 'en' }}
            minLength={2}
            fetchDetails={true}
            returnKeyType={'search'}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              // console.log(details)
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate('RideOptionCard');
            }}
          />
        </View>
        <NavFavourite />
      </View>
      <View
        style={tw`flex flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RideOptionCard')}
          style={tw`justify-between flex flex-row bg-black w-24 rounded-full py-3 px-4`}>
          <Icon name='car' type='font-awesome' color='white' size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between rounded-full py-3 px-4 w-24`}>
          <Icon
            name='fast-food-outline'
            type='ionicon'
            color='black'
            size={16}
          />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const toInputBokStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 0,
    paddingTop: 20,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});

export default NavigationCard;
