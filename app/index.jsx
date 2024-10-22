import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import useCustomContext from '../hooks/useCustomContext'
import * as schema from '@/database/schema'
import { and, eq } from "drizzle-orm";

export default function Index() {
  
  const {
    db,
    createAdmin
  } = useCustomContext()

  useEffect(() => {
    createAdmin()
  })

  const [ showPassword, setShowPassword ] = useState(false)
  const [ user, setUser ] = useState({})

  const handleLogin = async () => {
    if( !user.userEmail ) Alert.alert('Authentification', 'Veuillez saisir votre adresse mail!')
    else if( !user.userPassword ) Alert.alert('Authentification', 'Veuillez saisir votre mot de passe!')
    else{
      const res = await db.select().from(schema.users).where(eq(schema.users.userEmail, user.userEmail))
      if( res.length == 0) Alert.alert('Authentification', "Adresse mail incorrect!")
      else {
        const isAuth = await db.select().from(schema.users).where(and(
          eq(schema.users.userEmail, user.userEmail),
          eq(schema.users.userPassword, user.userPassword)
        ))

        if ( isAuth.length == 0 ) Alert.alert('Authentification', "Mot de passe incorrect!")
        else {
          router.navigate('/Sale')
          setUser({})
        }
      }
    }
  }

  return (
    <View style = { styles.pageContainer }>

      <View style = { styles.loginForm }>

        <View>
          <Text style = { styles.title }> Gestion de livraison </Text>
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

        <Pressable style = { styles.button } onPress = { handleLogin }>
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
    paddingHorizontal: 40,
    paddingVertical: 60,
    gap: 25,
    alignItems: 'center',
    borderRadius: 5,
    borderTopWidth: 10,
    borderTopColor: '#1e3d58'
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