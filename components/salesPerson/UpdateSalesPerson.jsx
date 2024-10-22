import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import useCustomContext from "@/hooks/useCustomContext";
import * as schema from '../../database/schema'
import { eq } from "drizzle-orm";
import { Feather } from "@expo/vector-icons";

export default function UpdateSalesPerson({ visible, setVisible }){
    
    const {
        db,
        getSalesPersons,
        currentSalesPerson,
        setCurrentSalesPerson
    } = useCustomContext()

    const closeModal = () => setVisible(false)
   
    const updatePerson = async () => {
        try {
            await db.update(schema.salesPersons)
                .set({ ...currentSalesPerson })
                .where(eq(schema.salesPersons.salesPersonId, currentSalesPerson.salesPersonId));
            getSalesPersons()
            closeModal()
        } catch (error) {
            alert("Echec de la modification: " + error.message )
        }
    }

    const deletePerson = async () => {
        try {
            await db.delete(schema.salesPersons).where(eq(schema.salesPersons.salesPersonId, currentSalesPerson.salesPersonId));
            getSalesPersons()
            closeModal()
        } catch (error) {
            alert("Echec de la suppression: " + error.message )
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
                    <Feather name="edit" size={24} color="#1e3d58" />
                    <Text style = { styles.title }> Modification </Text>
                </View>

                <ScrollView style = {{ width: '100%' }} contentContainerStyle = {{ gap: 20 }}>

                <View style = { styles.inputContainer }>
                    <Text style = { styles.labelContainer }> Nom </Text>
                    <TextInput
                        style = { styles.input }
                        onChangeText = { text => setCurrentSalesPerson({ ...currentSalesPerson, salesPersonName: text })}
                        value = { currentSalesPerson.salesPersonName || '' }
                    />
                </View>

                <View style = { styles.inputContainer }>
                    <Text style = { styles.labelContainer }> Contact </Text>
                    <TextInput
                        style = { styles.input }
                        onChangeText = { text => setCurrentSalesPerson({ ...currentSalesPerson, salesPersonContact: text })}
                        value = { currentSalesPerson.salesPersonContact || '' }
                    />
                </View>
                </ScrollView>

                <View style = { styles.buttonContainer }>

                    <Pressable style = { styles.button } onPress = { updatePerson }>
                        <AntDesign name="plussquareo" size={24} color="white" />
                        <Text style = { styles.buttonText }> Modifier </Text>
                    </Pressable>

                    <Pressable style = { styles.button } onPress = { deletePerson }>
                        <AntDesign name="delete" size={24} color="white" />
                        <Text style = { styles.buttonText }> Suppimer </Text>
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
        padding: 20,
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
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 20
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#1e3d58',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        gap: 10,
    },
    buttonText: {
        color: 'white'
    }
})