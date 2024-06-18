import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, Pressable, ScrollView, FlatList } from 'react-native';
import { nanoid } from 'nanoid'
import Slider from '@react-native-community/slider';
import supabase from "../../utils/supabase";
import db from '../../../assets/db.json';

const HostScreen = ({route, navigation}) => {
  const { gameid, usrname, ishost } = route.params;
  const [playerids, setPlayerids] = useState(null)
  const [agentCount, setAgentCount] = useState(1);
  const [prep, setPrep] = useState(false)

  const fetchPlayerids = async () => {
    const { data, error } = await supabase
      .from('playerids')
      .select('*')
      .eq('gameid', gameid)
    if (error) {
      setPlayerids(null);
      console.error("error:" + error.message);
      return;
    }
    if (data) {
      setPlayerids(data);
      let player = data.find(player => player.name === usrname);
      setPrep(player ? player.isprep : false);
    }
  };

  const updateIsprep = async () => {
    const { data, error } = await supabase
      .from('playerids')
      .update({isprep: true})
      .eq('gameid', gameid)
      .eq('name', usrname)
      .select()
    if (data) {
      setPrep(true);
    }
    if (error) {
      console.error("error:" + error.message);
      return;
    }
  }

  const deletePlayerid = async () => {
    const { data, error } = await supabase
      .from('playerids')
      .delete()
      .eq('name', usrname)
      .eq('gameid', gameid)
    if (error) {
      console.error("error:" + error.message);
      return;
    }
  }
  const handleGameCreation = async () => {

    const keywordDraw = Math.floor(Math.random()*db.length);
    const { data, error } = await supabase
      .from('playerids')
      .update([{isagent:false, keyword: keywordDraw}])
      .eq('gameid', gameid)
      .select('id')

    if (error) {
      console.error("error:" + error.message);
      return;
    }
  
    const shuffled = playerids.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, agentCount).map(player => player.id);

    const {data:data2, error:error2} = await supabase
      .from('playerids')
      .update({isagent: true})
      .in('id', selected)
      .eq('gameid', gameid)
      .select();
    
    if (error2) {
      console.error("error:" + error2.message);
      return;
    }
  
    if (data2) {
      navigation.navigate('Game', { gameid: gameid, usrname: usrname, ishost: ishost });
    }
  }

  const AgentSlider = () => {
    if (playerids && playerids.length > 1 && true) {
      return (
        <View>
          <Text>There will be {agentCount} agent</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={1}
            maximumValue={Math.floor((playerids.length-1)/2)}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={value => setAgentCount(value)}
            value={Math.floor(playerids.length/3)}
            step={1}
          />
        </View>
      );
    }
  }

  const StartButton = () => {
    if (playerids && playerids.length > 1 && true) {
      let isDisabled = playerids.length < 3 || !playerids.every(player => player.isprep);
      return (
        <View>
          <Pressable
            onPress={handleGameCreation}
            disabled={isDisabled}
            style={{backgroundColor: isDisabled ? 'grey' : '#841584', padding: 10, margin: 10}}
          >
            <Text style={{color: "white"}}>Start</Text>
          </Pressable>
        </View>
      )
    }
  }

  useEffect(() => {
    fetchPlayerids();
    const subscription = supabase.channel('custom-filter-channel')
      .on(
        'postgres_changes',
        {event: '*', schema: 'public', table: 'playerids', filter: 'gameid=eq.'+gameid},
        () => {fetchPlayerids();}
      )
      .subscribe();
  return;
  }, []);

  useEffect(() => {
    if (playerids && playerids.length > 0) {
    setAgentCount(Math.floor(playerids.length/3));
    }
  }, [playerids]);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Text>Undercover</Text>
      </View>
      <View>
        <Text>Game ID</Text>
        <Text>{gameid}</Text>
      </View>
      <View>
        <Text> {playerids ? "Total " + playerids.length + " Players": ""}</Text>
      </View>
      <ScrollView>
        <FlatList
          data={playerids}
          renderItem={({item}) => 
            <View>
              <Text style={{ color: usrname === item.name ? 'blue' : 'black' }}>
                {item.name} {item.isprep ? "✔" : ""}
              </Text>
            </View>
          }
          keyExtractor={item => item.id}
        />
    </ScrollView>
    {AgentSlider()}
    {StartButton()}
    <View>
      <Pressable 
        onPress={updateIsprep}
        disabled={prep}
        style={{backgroundColor: prep ? 'grey' : '#841584', padding: 10, margin: 10}}
      >
        <Text style={{color: "white"}}>{prep ? "Waiting..." : "I'm ready!"}</Text>
      </Pressable>
    </View>
    <View>
      <Pressable 
        onPress={() => {
          deletePlayerid(); 
          navigation.navigate('Home');
        }}
        style={{backgroundColor: "#841584", padding: 10, margin: 10}}
      >
        <Text style={{color: "white"}}>Cancel</Text>
      </Pressable>
    </View>
    </SafeAreaView>
  );
};

export default HostScreen