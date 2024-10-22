import { StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";
import useCustomContext from "../../hooks/useCustomContext";
import { AntDesign } from "@expo/vector-icons";

export default function ClientItem({ sale, setVisibleUpdate }){

    const {
        setCurrentSale
    } = useCustomContext()

    const {
        client,
        salesPerson,
        salesDate,
        productName,
        salesStatus
    } = sale

    const pressItem = () => {
        setCurrentSale(sale)
        setVisibleUpdate( true )
    }

    return(
        <Pressable onPress = { pressItem } style = { styles.item }>

            <View style = { styles.infoContainer }>
                <Text style = { styles.infoKey }>Client: </Text>
                <Text style = { styles.infoValue }> { client?.clientName } </Text>
            </View>

            <View style = { styles.infoContainer }>
                <Text style = { styles.infoKey }>Livreur: </Text>
                <Text style = { styles.infoValue }> { salesPerson?.salesPersonName } </Text>
            </View>

            <View style = { styles.infoContainer }>
                <Text style = { styles.infoKey }>Produit: </Text>
                <Text style = { styles.infoValue }> { productName } </Text>
            </View>

            <View style = { styles.statusContainer }>
                {
                    salesStatus?.toString().toLowerCase() == 'nouvelle'
                    ? <Text style = { styles.statusNew }> { salesStatus } </Text>
                    : <Text style = { styles.statusDone }> { salesStatus } </Text>
                }
            </View>

            <View style = { styles.dateContainer }>
                <AntDesign name="calendar" size = { 24 } color = '#1e3d58' />
                <Text style = { styles.infoValue }> { salesDate } </Text>
            </View>

        </Pressable>
    )
}


const styles = StyleSheet.create({
    item: {
        padding: 20,
        paddingBottom: 60,
        backgroundColor: '#F2F2F2',
        // borderLeftColor: '#1e3d58',
        // borderLeftWidth: 2,
        position: 'relative'
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
    },
    statusDone: {
        color: 'white',
        fontSize: 16,
        backgroundColor: '#007f4e',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    statusNew: {
        color: 'white',
        fontSize: 16,
        backgroundColor: '#e12729',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    dateContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    statusContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20
    }
})