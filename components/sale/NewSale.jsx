import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import * as schema from '../../database/schema';
import { useEffect, useState } from "react";
import useCustomContext from "@/hooks/useCustomContext";
import Feather from '@expo/vector-icons/Feather';
import { SelectList } from 'react-native-dropdown-select-list'

export default function NewClient({ visible, setVisible }){
    
    const {
        db,
        clients,
        salesPersons,
        getClients,
        getSalesPersons,
        getSales
    } = useCustomContext()

    const [ sale, setSale ] = useState({})

    useEffect(() => {
        getClients()
        getSalesPersons()
    }, [])

    const closeModal = () => setVisible(false)
    
    const add = async () => {
        if( !sale.clientId ) Alert.alert('Livraison', 'veuillez choissir le client')
        else if( !sale.salesPersonId ) Alert.alert('Livraison', 'veuillez choissir le Livreur')
        else if( !sale.productName ) Alert.alert('Livraison', 'veuillez indiquer la designation du produit à livrer')
        else{
            try {
                const res = await db.insert(schema.sales).values( sale )        
                getSales()
                closeModal()
            } catch (error) {
                console.log(error)
            }
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
                    <Feather name="shopping-cart" size={24} color="#1e3d58" />
                    <Text style = { styles.title }> Nouvelle livraison </Text>
                </View>

                
                <ScrollView
                    style = {{ flex: 1, width: '100%',display: 'flex', gap: 10 }}
                    contentContainerStyle = {{ gap: 10 }}
                >

                <View style = { styles.inputContainer }>
                    <Text style = { styles.labelContainer }> Client </Text>
                    <SelectList 
                        setSelected={(value) => setSale({...sale, clientId: value})}
                        placeholder='Client'
                        notFoundText='Aucun résultat'
                        data = {
                            clients.map( clientItem => ({ key: clientItem.clientId, value: clientItem.clientName }))
                        } 
                        save="key"
                    />
                </View>

                <View style = { styles.inputContainer }>
                    <Text style = { styles.labelContainer }> Livreur </Text>
                    <SelectList 
                        setSelected={(value) => setSale({...sale, salesPersonId: value})}
                        placeholder='Livreur'
                        notFoundText='Aucun résultat'
                        data = {
                            salesPersons.map( salesPerson => ({ key: salesPerson.salesPersonId, value: salesPerson.salesPersonName }))
                        } 
                        save="key"
                    />
                </View>

                <View style = { styles.inputContainer }>
                    <Text style = { styles.labelContainer }> Désignation du produit </Text>
                    <TextInput
                        style = { styles.input }
                        placeholder="Désignation du produit"
                        onChangeText = { text => setSale({ ...sale, productName: text })}
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