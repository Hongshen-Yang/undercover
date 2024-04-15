import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, Pressable, ScrollView, FlatList } from 'react-native';
import supabase from "../../utils/supabase";

const HostScreen = ({route, navigation}) => {
  const { gameid, usrname } = route.params;
  const [playerids, setPlayerids] = useState(null)
  const [prep, setPrep] = useState(false)

  const fetchPlayerids = async () => {
    const { data, error } = await supabase
      .from('playerids')
      .select('*')
      .eq('gameid', gameid)
      .order('last_modify', { ascending: true })
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

  useEffect(() => {
    fetchPlayerids();
    const test = supabase.channel('custom-filter-channel')
      .on(
        'postgres_changes',
        {event: '*', schema: 'public', table: 'playerids', filter: 'gameid=eq.'+gameid},
        (payload) => {fetchPlayerids();}
      )
      .subscribe();
  return () => {supabase.removeSubscription(subscription);};
  }, []);

  const upsertIsprep = async () => {
    const { data, error } = await supabase
      .from('playerids')
      .upsert({isprep: true})
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
              <Text>{item.name} {item.isprep ? "\u2713" : ""}</Text>
            </View>
          }
          keyExtractor={item => item.id}
        />
    </ScrollView>
    {/* <View>
      <Pressable 
        onPress={upsertIsprep}
        disabled={prep}
        style={{backgroundColor: "#841584", padding: 10, margin: 10}}
      >
        <Text style={{color: "white"}}>{prep ? "Waiting..." : "Start"}</Text>
      </Pressable>
    </View> */}
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