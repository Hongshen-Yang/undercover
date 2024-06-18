import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, Pressable, ScrollView } from 'react-native';
import supabase from "../../utils/supabase";
import db from '../../../assets/db.json';

const GameScreen = ({route, navigation}) => {
  const [player, setPlayer] = useState(null)
  const [keyword, setKeyword] = useState(null)
  const {gameid, usrname, ishost} = route.params

  const fetchPlayer = async () => {
    const { data, error } = await supabase
      .from('playerids')
      .select('*')
      .eq('gameid', gameid)
      .eq('name', usrname)
    if (error) {
      console.error("error:" + error.message);
    }
    if (data) {
      setPlayer(Object.values(data)[0]);
    }
  }

  useEffect(() => {
    fetchPlayer();
  }, []);

  useEffect(() => {
    if (player) {
      setKeyword(player['isagent']? db[player['keyword']]['agent'] : db[player['keyword']]['nonagent']);
    }
  }, [player])

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Text>Undercover</Text>
      </View>
      <View>
        <Text>You {player ? (player['isagent'] ? "are" : "are not") : "pending..." } an Undercover agent</Text>
        </View>
      <View>
        <Text>{player ? keyword : "pending..."}</Text>
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