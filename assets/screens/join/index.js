import React from 'react';
import { View, Text, SafeAreaView, Pressable, TextInput } from 'react-native';

function JoinScreen({navigation}) {
    const [gameid, onChangeGameid] = React.useState('');
    const [usrname, onChangeUsrname] = React.useState('');
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
        <Pressable onPress={() => navigation.navigate('Game')} style={{backgroundColor: "#841584", padding: 10, margin: 10}}>
          <Text style={{color: "white"}}>Confirm</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Home')} style={{backgroundColor: "#841584", padding: 10, margin: 10}}>
          <Text style={{color: "white"}}>Cancel</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

export default JoinScreen