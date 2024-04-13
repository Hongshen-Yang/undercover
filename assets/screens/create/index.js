import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, Pressable, TextInput, Alert } from 'react-native';

function CreateScreen({navigation}) {
    const [usrname, onChangeUsrname] = React.useState('');

    const handleGameCreation = () => {
      if (usrname.trim() === '') {
        Alert.alert('Warning', 'Please input username');
      } else {
        navigation.navigate('Host')
      }
    };
    
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Text>Undercover</Text>
        </View>
        <View>
          <Text>Username</Text>
          <TextInput
            placeholder="Enter your username"
            placeholderTextColor="#C7C7CD"
            onChangeText={onChangeUsrname}
            value={usrname}
          />
          <Pressable onPress={handleGameCreation} style={{backgroundColor: "#841584", padding: 10, margin: 10}}>
            <Text style={{color: "white"}}>Confirm</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Home')} style={{backgroundColor: "#841584", padding: 10, margin: 10}}>
            <Text style={{color: "white"}}>Cancel</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

export default CreateScreen