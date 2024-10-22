import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as schema from '../database/schema'
import useCustomContext from "../hooks/useCustomContext";

export default function Index() {

    const {
        db
    } = useCustomContext()

  const [ user, setUser ] = useState({})

    const handleSignUp = async () => {
        if( !user.userEmail ) Alert.alert( 'Inscription', 'Veuillez saisir l\'adresse mail!')
        else if( !user.userPassword ) Alert.alert( 'Inscription', 'Le mot de passe ne peut pas être vide!')
        else if( user.userPassword != user.passwordCheck ) Alert.alert( 'Inscription', 'Confirmation de mot de passe incorrecte!')
        else{
            try {
                await db.insert(schema.users).values({ ...user})
                router.navigate('/')
            } catch (error) {
                Alert.alert('Erreur', error.message )
            }
        }
    }

  return (
    <View style = { styles.pageContainer }>

      <View style = { styles.loginForm }>

        <View>
          <Text style = { styles.title }> Inscription </Text>
        </View>

        <View style = { styles.inputContainer }>
            <Text style = { styles.labelContainer }> Adresse E-mail </Text>
            <TextInput
                style = { styles.input }
                onChangeText = { text => setUser({ ...user, userEmail: text })}
            />
        </View>

        <View style = { styles.inputContainer }>
            <Text style = { styles.labelContainer }> Mot de passe </Text>
            <TextInput
                style = { styles.input }
                onChangeText = { text => setUser({ ...user, userPassword: text })}
                secureTextEntry
            />
        </View>

        <View style = { styles.inputContainer }>
            <Text style = { styles.labelContainer }> Confirmation du mot de passe </Text>
            <TextInput
                style = { styles.input }
                onChangeText = { text => setUser({ ...user, passwordCheck: text })}
                secureTextEntry
            />
        </View>

        <Pressable style = { styles.button } onPress = { handleSignUp }>
          <Text style = { styles.buttonText }> S'inscrire </Text>
        </Pressable>

        <Pressable style = { styles.button } onPress = { () => router.push('/') }>
          <Text style = { styles.buttonText }> Se connecter </Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2'
  },
  loginForm: {
    backgroundColor: 'white',
    padding: 40,
    gap: 25
  },
  title: {
    color: '#1e3d58',
    fontSize: 25,
    fontWeight: 'bold'
  },
  inputContainer: {
    width: '100%'
  },
  labelContainer: {
      color: 'gray',
      paddingVertical: 8
  },
  input: {
      borderWidth: .4,
      borderColor: 'gray',
      padding: 10,
      fontSize: 18,
      width: 300
  },
  button: {
    width: 300,
    backgroundColor: '#1e3d58',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row'
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  }
})