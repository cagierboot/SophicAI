import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  PanResponder,
} from 'react-native';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



const Drawer = ({ profileVisible, setProfileVisible }) => {
  const slideAnim = useRef(new Animated.Value(-1000)).current;
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // ...

const renderSectionContent = (section) => {
    if (expandedSection === section) {
        if (section === 'Privacy Policy') {
            return (
              <Text style={{ marginBottom: 5, marginTop: 10, fontFamily: 'Verdana'}}>
                Sophic does not store any information users provide in the App. The app is powered by GPT-3.5, an AI model that generates text and images made by OpenAI. OpenAI does not store any information users provide in the App. To read more OpenAI's privacy policy visit the following link: 
                <TouchableOpacity onPress={() => Linking.openURL('https://openai.com/policies/privacy-policy')}>
                  <Text style={{color: 'blue', fontSize: 15, marginTop: 10}}>
                    OpenAI Privacy Policy
                  </Text>
                </TouchableOpacity>
              </Text>
            );
          } else if (section === 'Vision for Sophic') {
        return (
          <>
            <Text style={{ marginBottom: 10, marginTop: 10, fontFamily: 'Verdana'}}>
              Hello! Welcome to Sophic. 
              </Text>
              <Text style={{ marginBottom: 10, marginTop: 5, fontFamily: 'Verdana'}}>
              The vision for this app is to develop a tool that maximizes the potential of human thought and consequently human potential. Whether its building a business model, designing a rocket, or writing an essay - this tool is designed to support the quality and efficiency of your work. This app is also fun - if I were 10 years old I would prefer playing with this than a Nerf Gun.
            </Text>
            <Text style={{ marginBottom: 10, marginTop: 5, fontFamily: 'Verdana' }}>
              Sophic needs time to actualize its intended impact. The initial version will be the bare minimum - text and image generations + history. But I have a strong sense of how to evolve it. The next step is to build a screen that displays the branches your thoughts take while tactfully suggesting subsequent branches to support your understanding / workflow. Sophic should be so well integrated into your thoughts and questions that you won't want to think without it. Your thought quality should feel chained by ancient biology without technology like this - because it is.
            </Text>
            <Text style={{ marginBottom: 10, marginTop: 5, fontFamily: 'Verdana' }}>
  The distance between our thoughts and this technology will and should continiously decrease in order to unlock human potential.
  
  In the meantime, enjoy watching the app develop and feel free to reach out with any questions or feedback at markortega0214@gmail.com.
  </Text>
  <Text style={{ marginBottom: 10, marginTop: 5, fontFamily: 'Verdana' }}>
  Best,
  </Text>
    <Text style={{ marginBottom: 10, marginTop: 5, fontFamily: 'Verdana' }}>
  Mark Ortega
            </Text>
          </>
        );
      } else if (section === 'Terms and Conditions') {
        return (
            <Text style={{ marginBottom: 10, marginTop: 10, fontFamily: 'Verdana'}}>
            By using Sophic, you agree to the following terms and conditions. Sophic is intended for users aged 13 years and above. The app generates images and text using advanced large language models. We are not responsible for any loss or damage caused by the use of this app, and we make no warranties regarding its performance or availability. You agree to use the app for lawful purposes only and to indemnify us against any claims arising from your use of the app. These terms and conditions are subject to change without prior notice, and they are governed by the laws of the United States of America. If you have any questions or concerns, please contact us at markortega0214@gmail.com. By using the app, you agree to these terms and conditions.
          </Text>
        );
      }
      else if (section === 'Social Media') {
        return (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                const twitterUrl = 'https://twitter.com/cagierboot';
                Linking.openURL(twitterUrl).catch((err) =>
                  console.error('An error occurred while opening the URL:', err)
                );
              }}
            >
              <Icon name="twitter" size={30} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const linkedinUrl = 'https://www.linkedin.com/in/markortega1/';
                Linking.openURL(linkedinUrl).catch((err) =>
                  console.error('An error occurred while opening the URL:', err)
                );
              }}
            >
              <Icon name="linkedin" size={30} color="#0e76a8" />
            </TouchableOpacity>
          </View>
        );
      }
      
      return <Text>{section} content goes here.</Text>;
    }
    return null;
  };
  
  // ...
  
  
  
  
  

  useEffect(() => {
    if (profileVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setIsOpen(true);
    } else {
      Animated.timing(slideAnim, {
        toValue: -1000,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsOpen(false);
      });
    }
  }, [profileVisible]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => isOpen,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx < 0) {
        slideAnim.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -100) {
        setProfileVisible(false);
      } else {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={profileVisible}
      onRequestClose={() => setProfileVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            transform: [{ translateX: slideAnim }],
            backgroundColor: 'white',
            width: '101%',
            height: '100%',
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20, marginTop: 40 }}>
            Logistics
          </Text>
          {['Vision for Sophic', 'Social Media', 'Terms and Conditions', 'Privacy Policy'].map((section) => (
            <View key={section}>
              <TouchableOpacity onPress={() => toggleSection(section)}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 10 }}>{section}</Text>
              </TouchableOpacity>
              {renderSectionContent(section)}
            </View>
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Drawer;

