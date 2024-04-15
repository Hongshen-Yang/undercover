import React, {useState} from 'react';
import { View, Text, SafeAreaView, Pressable, TextInput, Alert } from 'react-native';
import { nanoid } from 'nanoid'
import supabase from "../../utils/supabase";

const JoinScreen = ({navigation}) => {
    const [gameid, onChangeGameid] = useState('');
    const [usrname, onChangeUsrname] = useState('');

    const insertPlayerid = async () => {
      const { data, error } = await supabase
        .from('playerids')
        .insert([{gameid: gameid, name: usrname}])
        .select()
      if (error) {
        console.error("error:" + error.message);
        return;
      }
    };
    
    const checkGameid = async () => {
      if (!usrname) {
        Alert.alert("Please fill in username");
        return false;
      }
      const { data, error } = await supabase
        .from('playerids')
        .select('*')
        .eq('gameid', gameid)
      if (error) {
        console.error("error:" + error.message);
        return false;
      }
      if (data) {
        if (data.length === 0 || usrname === null) {
          Alert.alert("Please fill in correct gameid and username");
        } else {
          const duplicateUser = data.some(player => player.name === usrname);
          if (duplicateUser) {
            Alert.alert("Username already exists in this game");
          } else {
            await insertPlayerid();
            navigation.navigate('Host', {gameid: gameid, usrname: usrname});
          }
        }
      }
      return true;
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
        </View>
        <View>
          <Text>Game ID</Text>
          <TextInput
            placeholder="Enter the joining game ID"
            placeholderTextColor="#C7C7CD"
            onChangeText={onChangeGameid}
            value={gameid}
          />
        </View>
        <Pressable onPress={checkGameid} style={{backgroundColor: "#841584", padding: 10, margin: 10}}>
          <Text style={{color: "white"}}>Confirm</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Home')} style={{backgroundColor: "#841584", padding: 10, margin: 10}}>
          <Text style={{color: "white"}}>Cancel</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

export default JoinScreen