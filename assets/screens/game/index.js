import React from 'react';
import { View, Text, SafeAreaView, Pressable, ScrollView } from 'react-native';

function GameScreen({navigation}) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Text>Undercover</Text>
        </View>
        <View>
          <Text>You are an Undercover</Text>
          </View>
        <View>
          <Text>Keyword</Text>
        </View>
        <View>
        <Pressable onPress={() => console.log('pending')} style={{backgroundColor: "#841584", padding: 10, margin: 10}}>
            <Text style={{color: "white"}}>Next Round</Text>
        </Pressable>
        </View>
        <View>
        <Pressable onPress={() => navigation.navigate('Home')} style={{backgroundColor: "#841584", padding: 10, margin: 10}}>
            <Text style={{color: "white"}}>Quit</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

export default GameScreen