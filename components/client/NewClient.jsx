import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import * as schema from '../../database/schema';
import { useState } from "react";
import useCustomContext from "@/hooks/useCustomContext";
import Feather from '@expo/vector-icons/Feather';

export default function NewClient({ visible, setVisible }){
    
    const {
        db,
        getClients
    } = useCustomContext()

    const [ client, setClient ] = useState({})

    const closeModal = () => setVisible(false)
    
    const add = async () => {
        try {
            const res = await db.insert(schema.clients).values( client )
            getClients()
            closeModal()
        } catch (error) {
            console.log(error)
        }
    }


    return (
       <Modal
            transparent
            visible = { visible }
            onTouchCancel = { closeModal }
            animationType = "slide"
        >
            <Pressable style = { styles.layer } onPress = { closeModal }/>

            
                <View style = { styles.form }>

                    <View style = { styles.titleContainer }>
                        <Feather name="user-plus" size={24} color="#1e3d58" />
                        <Text style = { styles.title }> Nouveau client </Text>
                    </View>
                    
                    <ScrollView
                        style = {{ flex: 1, width: '100%',display: 'flex' }}
                        contentContainerStyle = {{ gap: 20 }}
                    >

                        <View style = { styles.inputContainer }>
                            <Text style = { styles.labelContainer }> Nom </Text>
                            <TextInput
                                style = { styles.input }
                                onChangeText = { text => setClient({ ...client, clientName: text })}
                            />
                        </View>

                        <View style = { styles.inputContainer }>
                            <Text style = { styles.labelContainer }> Contact </Text>
                            <TextInput
                                style = { styles.input }
                                onChangeText = { text => setClient({ ...client, clientContact: text })}
                            />
                        </View>

                        <View style = { styles.inputContainer }>
                            <Text style = { styles.labelContainer }> Adresse </Text>
                            <TextInput
                                style = { styles.input }
                                onChangeText = { text => setClient({ ...client, clientAddress: text })}
                            />
                        </View>
                        </ScrollView>

                        <View style = { styles.inputContainer }>
                            <Pressable style = { styles.addButton } onPress = { add }>
                                <AntDesign name="plussquareo" size={24} color="white" />
                                <Text style = { styles.buttonText }> Ajouter </Text>
                            </Pressable>
                        </View>
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    layer: {
        flex: 1,
        backgroundColor: 'rgba( 100, 100, 100, .4)'
    },
    form: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 40,
        width: '100%',
        height: '85%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        color: '#1e3d58'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        color: '#1e3d58'
    },
    inputContainer: {
        width: '100%'
    },
    labelContainer: {
        color: 'gray',
        paddingVertical: 8
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        padding: 10,
        fontSize: 18
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#1e3d58',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        gap: 10
    },
    buttonText: {
        color: 'white'
    }
})