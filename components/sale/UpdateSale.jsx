import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import * as schema from '../../database/schema';
import useCustomContext from "@/hooks/useCustomContext";
import Feather from '@expo/vector-icons/Feather';
import { eq } from "drizzle-orm";

export default function UpdateSales({ visible, setVisible }){
    
    const {
        db,
        currentSale,
        getSales
    } = useCustomContext()

    const closeModal = () => setVisible(false)

    const deleteSale = async () => {
        try {
            await db.delete(schema.sales).where(eq(schema.sales.salesId, currentSale.salesId));
            getSales()
            closeModal()
        } catch (error) {
            alert("Echec de la suppression: " + error.message )
        }
    }

    
    const updateSale = async () => {
        try {
            await db.update(schema.sales)
                .set({ salesStatus: 'Effectuée' })
                .where(eq(schema.sales.salesId, currentSale.salesId));
            getSales()
            closeModal()
        } catch (error) {
            alert("Echec de la modification: " + error.message )
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
                    <Feather name="info" size={24} color="#1e3d58" />
                    <Text style = { styles.title }> Détail </Text>
                </View>

                <ScrollView style = {{ width: '100%'}}  contentContainerStyle = {{ gap: 20 }}>

                <View style = { styles.inputContainer }>
                    <Text style = { styles.labelContainer }> Client </Text>
                    <TextInput
                        value = { currentSale.client?.clientName }
                        style = { styles.input }
                        readOnly
                    />
                </View>

                <View style = { styles.inputContainer }>
                    <Text style = { styles.labelContainer }> Livreur </Text>
                    <TextInput
                        value = { currentSale.salesPerson?.salesPersonName }
                        style = { styles.input }
                        readOnly
                    />
                </View>

                <View style = { styles.inputContainer }>
                    <Text style = { styles.labelContainer }> Produit </Text>
                    <TextInput
                        value = { currentSale.productName }
                        style = { styles.input }
                        readOnly
                    />
                </View>
                </ScrollView>

                <View style = { styles.buttonContainer }>
                    <Pressable style = { styles.addButton } onPress = { updateSale }>
                        <AntDesign name="checksquareo" size={24} color="white" />
                        <Text style = { styles.buttonText }> Effectuée </Text>
                    </Pressable>
                    <Pressable style = { styles.addButton } onPress = { deleteSale }>
                        <AntDesign name="delete" size={24} color="white" />
                        <Text style = { styles.buttonText }> Supprimer </Text>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        gap: 10
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