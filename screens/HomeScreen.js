import React from 'react';
import { Text, SafeAreaView, Image, View } from 'react-native';
import Style from './Style';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourite from '../components/NavFavourite';
const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[tw`bg-white h-full`, [Style.AndroidSafeArea]]}>
      <View style={tw`p-5`}>
        <Image
          style={Style.logo}
          source={{ uri: 'https://links.papareact.com/gzs' }}
        />
        <GooglePlacesAutocomplete
          placeholder='Where From ?'
          styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
          returnKeyType={'search'}
          query={{ key: GOOGLE_MAPS_APIKEY, language: 'en' }}
          minLength={2}
          fetchDetails={true}
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            // console.log(details)
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
        />
        <NavOptions />
        <NavFavourite />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
// <Text style={[tw`text-red-500 `, styles.AndroidSafeArea]}>
