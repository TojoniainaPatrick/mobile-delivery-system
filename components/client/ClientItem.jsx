import { StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";
import useCustomContext from "../../hooks/useCustomContext";

export default function ClientItem({ client, setVisibleUpdate }){

    const {
        setCurrentClient
    } = useCustomContext()

    const {
        clientName,
        clientContact,
        clientAddress
    } = client

    const pressItem = () => {
        setCurrentClient(client)
        setVisibleUpdate( true )
    }

    return(
        <Pressable onPress = { pressItem } style = { styles.item } >

            <View style = { styles.infoContainer }>
                <Text style = { styles.infoKey } >Nom: </Text>
                <Text style = { styles.infoValue } > { clientName } </Text>
            </View>

            <View style = { styles.infoContainer }>
                <Text style = { styles.infoKey } >Contact: </Text>
                <Text style = { styles.infoValue } > { clientContact } </Text>
            </View>

            <View style = { styles.infoContainer }>
                <Text style = { styles.infoKey } >Adresse: </Text>
                <Text style = { styles.infoValue } > { clientAddress } </Text>
            </View>

        </Pressable>
    )
}


const styles = StyleSheet.create({
    item: {
        padding: 15,
        backgroundColor: '#F2F2F2',
    },
    infoContainer: {
        flexDirection: 'row',
        marginVertical: 5
    },
    infoKey: {
        fontWeight: 'bold',
        color: '#1e3d58',
        width: 100,
        fontSize: 16
    },
    infoValue: {
        color: 'gray',
        fontSize: 14
    }
})