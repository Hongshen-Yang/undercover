import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, Pressable, ScrollView, FlatList } from 'react-native';
import { nanoid } from 'nanoid'
import supabase from "../../utils/supabase";

const HostScreen = ({navigation}) => {
  const [playerids, setPlayerids] =useState(null)

  useEffect(() => {
    const fetchPlayerids = async () => {
        const { data, error } = await supabase
          .from('playerids')
          .select('*');

        if (error) {
          setPlayerids(null);
          console.error("error:" + error.message);
          return;
        }

        if (data) {
          setPlayerids(data);
          console.log(data)
        }
      };
    fetchPlayerids();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Text>Undercover</Text>
      </View>
      <View>
        <Text>Game ID</Text>
        <Text>{nanoid(8)}</Text>
      </View>
      <View>
        <Text>Total {playerids ? playerids.length : ""} People</Text>
      </View>
      <ScrollView>
        <FlatList
          data={playerids}
          renderItem={({item}) => 
            <View>
              <Text>{item.name}</Text>
            </View>
          }
          keyExtractor={item => item.id}
        />
    </ScrollView>
    <View>
      <Pressable 
        onPress={() => navigation.navigate('Game')}
        style={{backgroundColor: "#841584", padding: 10, margin: 10}}
      >
        <Text style={{color: "white"}}>Start</Text>
      </Pressable>
    </View>
    <View>
      <Pressable 
        onPress={() => navigation.navigate('Home')}
        style={{backgroundColor: "#841584", padding: 10, margin: 10}}
      >
        <Text style={{color: "white"}}>Cancel</Text>
      </Pressable>
    </View>
    </SafeAreaView>
  );
};

export default HostScreen