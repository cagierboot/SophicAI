import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { getData } from './Storage';
import { useNavigation } from '@react-navigation/native';

const MindMap = () => {
  const [textHistory, setTextHistory] = useState([]);
  const [imageHistory, setImageHistory] = useState([]);
  const [expandedTextId, setExpandedTextId] = useState(null);
  const [expandedImageId, setExpandedImageId] = useState(null);
  const [historyType, setHistoryType] = useState('text');

  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    const textHistoryData = await getData('text_history');
    setTextHistory(textHistoryData || []);

    const imageHistoryData = await getData('image_history');
    setImageHistory(imageHistoryData || []);
  };

  const toggleTextExpansion = (id) => {
    setExpandedTextId(expandedTextId === id ? null : id);
  };

  const toggleImageExpansion = (id) => {
    setExpandedImageId(expandedImageId === id ? null : id);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return 'Invalid date';
    }
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 55, paddingHorizontal: 15 }}>
        <TouchableOpacity onPress={handleButtonPress} style={{ marginRight: 20 }}>
          <Image
            source={{ uri: 'https://static.thenounproject.com/png/3565454-200.png' }}
            style={{ width: 50, height: 50, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setHistoryType('text')}
          style={{
            padding: 10,
            borderBottomWidth: historyType === 'text' ? 2 : 0,
            borderBottomColor: '#1F1F1F',
          }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F1F1F' }}>
            Text History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setHistoryType('image')}
          style={{
            padding: 10,
            borderBottomWidth: historyType === 'image' ? 2 : 0,
            borderBottomColor: '#1F1F1F',
          }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F1F1F' }}>
            Image History
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ width: '100%', marginTop: 15 }}>
        {historyType === 'text' &&
          textHistory.slice().reverse().map((item) => (
            <View
              key={item.id}
              style={{
                padding: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0',
              }}>
              <TouchableOpacity
                onPress={() => toggleTextExpansion(item.id)}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F1F1F' }}>
                  {item.prompt}
                </Text>
                <Text style={{ fontSize: 14, color: '#757575', marginTop: 5 }}>
                  {formatDate(item.timestamp)}
                </Text>
              </TouchableOpacity>
              {expandedTextId === item.id && (
                <Text style={{ fontSize: 16, color: '#1F1F1F', marginTop: 10 }}>{item.answer}</Text>
              )}
            </View>
          ))}
        {historyType === 'image' &&
  imageHistory.slice().reverse().map((item) => (
    <View
      key={item.id}
      style={{
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
      }}>
      <TouchableOpacity
        onPress={() => toggleImageExpansion(item.id)}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F1F1F' }}>
          {item.prompt}
        </Text>
        <Text style={{ fontSize: 14, color: '#757575', marginTop: 5 }}>
          {formatDate(item.timestamp)}
        </Text>
      </TouchableOpacity>
      {expandedImageId === item.id && (
  <Image
    source={{ uri: item.imageURL }}
    style={{ width: '100%', height: 200, resizeMode: 'contain', marginTop: 10 }}
  />
)}
    </View>
))}

      </ScrollView>
    </View>
  );
};
    export default MindMap;