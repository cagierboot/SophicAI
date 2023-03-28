import React from 'react';
import { View, Text, Image } from 'react-native';

const SplashScreen = ({ text = 'S O P H I C' }) => {
  const staticImageURL =
    'https://static.wixstatic.com/media/55a99a_54482e2a0e3a44888ada9ecb460219c4~mv2.png/v1/fill/w_296,h_296,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/FINAL%20LOGO%20.png';

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: '150%',
          height: 240,
          resizeMode: 'contain',
          marginBottom: 20,
        }}
        source={{ uri: staticImageURL }}
      />
      <Text style={{ fontSize: 45, marginTop: 30, fontFamily: 'Verdana' }}>
        {text}
      </Text>
    </View>
  );
};

export default SplashScreen;
