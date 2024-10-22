import { StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";
import useCustomContext from "../../hooks/useCustomContext";

export default function SalesPersonItem({ salesPerson, setVisibleUpdate }){

    const {
        setCurrentSalesPerson
    } = useCustomContext()

    const {
        salesPersonName,
        salesPersonContact
    } = salesPerson

    const pressItem = () => {
        setCurrentSalesPerson(salesPerson)
        setVisibleUpdate( true )
    }

    return(
        <Pressable onPress = { pressItem } style = { styles.item }>

            <View style = { styles.infoContainer }>
                <Text style = { styles.infoKey }>Nom: </Text>
                <Text style = { styles.infoValue }> { salesPersonName } </Text>
            </View>

            <View style = { styles.infoContainer }>
                <Text style = { styles.infoKey }>Contact: </Text>
                <Text style = { styles.infoValue }> { salesPersonContact } </Text>
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        backgroundColor: '#F2F2F2',
        // borderLeftColor: '#1e3d58',
        // borderLeftWidth: 2
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