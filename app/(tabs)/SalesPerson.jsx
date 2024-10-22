import { FlatList, Text, TextInput, View } from "react-native"
import useCustomContext from '../../hooks/useCustomContext'
import { useEffect, useState } from "react"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { StyleSheet } from "react-native"
import SalesPersonItem from "../../components/salesPerson/SalesPersonItem"
import FloatingButton from "../../components/button/FloatingButton"
import { AntDesign } from "@expo/vector-icons"
import NewSalesPerson from "../../components/salesPerson/NewSalesPerson"
import UpdateSalesPerson from "../../components/salesPerson/UpdateSalesPerson"

export default function SalesPerson(){

    const {
        getSalesPersons,
        salesPersons
    } = useCustomContext()

    const [ search, setSearch ] = useState('')
    const [ visible, setVisible ] = useState( false )
    const [ visibleUpdate, setVisibleUpdate ] = useState( false )

    useEffect(() => {
        getSalesPersons()
    }, [])

    const filteredData = salesPersons.filter( item =>
        item.salesPersonName?.toString().toLowerCase().includes( search.toString().toLowerCase() ) ||
        item.salesPersonContact?.toString().toLowerCase().includes( search.toString().toLowerCase() )
    )

    return(
        <View style = { styles.pageContainer }>

            <NewSalesPerson visible = { visible } setVisible = { setVisible } />
            <UpdateSalesPerson visible = { visibleUpdate } setVisible = { setVisibleUpdate } />

            <View style = { styles.pageHeader }>
                <TextInput
                    style = { styles.searchInput }
                    inputMode = "text"
                    onChangeText = { text => setSearch( text ) }
                    placeholder="Recherche ..."
                />
            </View>

            <FlatList
                data = { filteredData }
                keyExtractor = { item => String( item.salesPersonId ) }
                renderItem = { ({ item }) => <SalesPersonItem salesPerson = { item } setVisibleUpdate = { setVisibleUpdate } /> }
                style = { styles.list }
                contentContainerStyle = {{ gap: 8 }}
            />

            <FloatingButton
            press = { () => setVisible(true) }
            style = { styles.floatingButton }
            icon = { <AntDesign name="plus" size={35} color="white" /> }
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    pageHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        gap: 10
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#1e3d58',
        padding: 3,
        paddingLeft: 10,
        flex: 1,
        borderRadius: 5
    },
    list: {
        padding: 20,
    },
    floatingButton: {
        width: 50,
        height: 50,
        bottom: 80,
        right: 50,
        borderRadius: 25
    }
})