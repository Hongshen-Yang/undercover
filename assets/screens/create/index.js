import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, Pressable, TextInput, Alert } from 'react-native';
import { nanoid } from 'nanoid'
import supabase from "../../utils/supabase";

const CreateScreen = ({navigation}) => {
    const [usrname, onChangeUsrname] = React.useState('');
    const gameid = nanoid(6);

    const insertGameid = async () => {
      const { data, error } = await supabase
        .from('playerids')
        .insert([{gameid: gameid, name: usrname}])
        .select()
      if (error) {
        console.error("error:" + error.message);
        return;
      }
    };

    const handleGameCreation = async () => {
      if (usrname.trim() === '') {
        Alert.alert('Warning', 'Please input username');
      } else {
        await insertGameid();
        navigation.navigate('Host', {gameid: gameid, usrname: usrname, ishost: true});
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
            onChangeText={text=>onChangeUsrname(text)}
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