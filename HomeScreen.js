import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { storeData, getData } from './Storage'; // Update this import
import SplashScreen from './SplashScreen';
import Drawer from './Drawer';

const HomeScreen = ({ navigation }) => {
    // ... (Move the existing App component's code here, and replace "const App = () => {" with the line above)
  
    const [prompt, setPrompt] = useState('');
    const [answer, setAnswer] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [showSplash, setShowSplash] = useState(true);
    const [profileVisible, setProfileVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageScale] = useState(new Animated.Value(1));

  
    useEffect(() => {
        const timer = setTimeout(() => {
          setShowSplash(false);
        }, 2500); // Show splash screen for 3 seconds
      
        return () => clearTimeout(timer); // Clean up the timer when the component is unmounted
      }, []);
    
    if (showSplash) {
        return <SplashScreen />;
      }
            
      const startPulseAnimation = (stop = false) => {
        const animationSequence = Animated.sequence([
          Animated.timing(imageScale, {
            toValue: 1.18,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(imageScale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]);
    
        if (stop) {
          Animated.loop(animationSequence).stop();
        } else {
          Animated.loop(animationSequence).start();
        }
      };
      
    const handleChange = (text) => {
      setPrompt(text);
    };
  
    const handleTextSubmit = async () => {
        try {
            setIsLoading(true);
          startPulseAnimation(); // Start the pulse animation
          const response = await axios.post("https://sophic.herokuapp.com/text", { prompt }, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
          setAnswer(response.data.choices[0].text);
          startPulseAnimation(true); // Stop the pulse animation
      
          const history = await getData("text_history") || [];
          const newItem = {
            id: Date.now(),
            prompt: prompt,
            answer: response.data.choices[0].text,
            timestamp: Date.now(),
          };
          const updatedHistory = [...history, newItem];
          await storeData("text_history", updatedHistory);
        } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false); // Set isLoading to false
          }
        };     
  
    
    const handleRefresh = () => {
      setPrompt('');
      setAnswer('');
      setImageURL('');
    };
  
    const MindMapButton =
      "https://static.wixstatic.com/media/55a99a_9672c5a322ef4ddfaace58c31c5712f6~mv2.png/v1/fill/w_568,h_568,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/mindmapneeds%20removal%20background.png"; // Replace with the URL of the button image you want to use
  
    const handleButtonPress = () => {
      navigation.navigate('MindMap');
    };
  
    const handleImageSubmit = async () => {
        try {
            setIsLoading(true);
          startPulseAnimation(); // Start the pulse animation
          const response = await axios.post(
            " https://sophic.herokuapp.com/image",
            { prompt },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
          setImageURL(response.data.data[0].url);
          startPulseAnimation(true); // Stop the pulse animation
      
          const history = await getData("image_history") || [];
          const newItem = {
            id: Date.now(),
            prompt: prompt,
            imageURL: response.data.data[0].url,
            timestamp: Date.now(),
          };
          const updatedHistory = [...history, newItem];
          await storeData("image_history", updatedHistory);
        } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false); // Set isLoading to false
  }
};

      
      
      const handleProfilePress = () => {
        console.log("Profile button pressed");
        setProfileVisible(!profileVisible);
      };
    
      const DrawerURL =
        'https://static.wixstatic.com/media/55a99a_cf8f50f8c09c4c96bfa396af234c3377~mv2.png/v1/fill/w_464,h_464,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Drawer.png';

    const staticImageURL =
      "https://static.wixstatic.com/media/55a99a_54482e2a0e3a44888ada9ecb460219c4~mv2.png/v1/fill/w_296,h_296,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/FINAL%20LOGO%20.png";
  
      
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
          }}>
            <View
  style={{
    position: 'absolute',
    bottom: 13,
    marginBottom: 26,
  }}
>
  <Text style={{ fontSize: 16.5, fontFamily: 'Verdana' }}>S O P H I C</Text>
</View>
            <TouchableOpacity
        onPress={handleProfilePress}
        style={{
          position: 'absolute',
          top: 55,
          left: 30,
          zIndex: 1,
        }}
      >
        <Image
          style={{
            width: 55,
            height: 55,
            resizeMode: 'contain',
            marginTop: 12,
          }}
          source={{ uri: DrawerURL }}
        />
      </TouchableOpacity>
            <TouchableOpacity
            onPress={handleButtonPress}
            style={{
              position: 'absolute',
              top: 55,
              right: 30,
              zIndex: 1,
             
            }}>
            <Image
              style={{
                width: 60, // Adjust the size of the button image
                height: 60, // Adjust the size of the button image
                resizeMode: 'contain',
                marginTop: 9,
              }}
              source={{ uri: MindMapButton }}
            />
          </TouchableOpacity>
          <Animated.Image
          style={{
             width: 65,
              height: 65,
              resizeMode: 'contain',
              marginBottom: 10,
              marginTop: 50,
              transform: [{ scale: imageScale }],
            }}
            source={{ uri: staticImageURL }}
            />

          <View
            style={{
              width: '100%',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{ width: '100%' }}>
              <TextInput
                style={{
                  height: 50,
                  borderColor: 'black',
                  borderWidth: 2.5,
                  marginTop: 1,
                  marginBottom: 20,
                  padding: 5,
                  fontSize: 17,
                  width: '100%',
                  justifyContent: 'flex-start',
                }}
                placeholder=" What would you like to know?"
                onChangeText={handleChange}
                value={prompt}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View
                style={{
                  width: '30%',
                  borderWidth: 2.5,
                  borderColor: 'black',
                  justifyContent: 'flex-start',
                }}>
                <Button title="Refresh" onPress={handleRefresh} color="#000000" />
              </View>
              <View
                style={{
                  width: '30%',
                  borderWidth: 2.5,
                  borderColor: 'black',
                    
                }}>
                <Button title="Search" onPress={handleTextSubmit} color="#000000" />
              </View>
              <View
                style={{
                  width: '30%',
                  borderWidth: 2.5,
                  borderColor: 'black',
                }}>
                <Button title="Image" onPress={handleImageSubmit} color="#000000" />
              </View>
            </View>
            {answer !== '' || imageURL !== '' ? (
      <View
        style={{
          width: '100%',
          height: 540, // Set the fixed height for the scroll box
          marginTop: 20,
          borderWidth: 2.5,
          borderColor: 'black',
          overflow: 'hidden', // Hide the overflow content
        }}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 10,
          }}>
          {answer !== '' && (
            <Text style={{ fontSize: 17, fontFamily: 'Verdana', marginLeft: 14, marginTop: 10 }}>
              {'Answer: ' + answer}
            </Text>
          )}
          {imageURL !== '' && (
            <Image
              style={{
                width: '100%',
                height: 340,
                resizeMode: 'contain',
                marginTop: 20 // Add this line to center the image
              }}
              source={{ uri: imageURL }}
            />
          )}
        </ScrollView>
      </View>
    ) : null}
    
          </View>
          <View
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
      }}
    >
    </View>
    <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      >
      </View>
      {profileVisible && <Drawer profileVisible={profileVisible} setProfileVisible={setProfileVisible} />}

      </View>
      );
    };

export default HomeScreen;