import { View, Text, SafeAreaView, Pressable } from 'react-native';

function HomeScreen({navigation}) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Text>Undercover</Text>
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate('Create')} style={{backgroundColor: "#841584", padding: 10, margin: 10}}>
            <Text style={{color: "white"}}>Host a game</Text>
          </Pressable>
        </View>
        <View>
          <Pressable 
            onPress={() => navigation.navigate('Join')} 
            style={{backgroundColor: "#841584", padding: 10, margin: 10}}
          >
            <Text style={{color: "white"}}>Join a game</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

export default HomeScreen