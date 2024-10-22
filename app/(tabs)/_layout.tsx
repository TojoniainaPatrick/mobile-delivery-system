import { router, Tabs } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Pressable, StyleSheet, Text } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function AppLayout() {

    const handleLogOut = () => {
        router.replace('../../')
    }

    return (
        <Tabs
            screenOptions = {{
                tabBarStyle: {
                    backgroundColor: '#FFF',
                    paddingTop: 15,
                    paddingBottom: 15,
                    height: 80
                },
                headerStyle: {
                    backgroundColor: '#1e3d58'
                },
                headerTintColor: 'white',
                tabBarActiveTintColor: '#1e3d58',
                tabBarInactiveTintColor: 'gray',
                headerRight:  () => (
                    <Pressable style = { styles.logoutButton } onPress = { handleLogOut }>
                        <Text style = {{ color: '#1e3d58'}}> Se deconnecter </Text>
                    </Pressable>
                ) 
            }}
        >

            <Tabs.Screen
                name = 'Sale'
                options = {{
                    title: 'Livraison',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name="delivery-dining" size={24} color={ color } />
                    )
                }}
            />

            <Tabs.Screen
                name = 'SalesPerson'
                options = {{
                    title: 'Livreur',
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome5 name="hospital-user" size={24} color={ color } />
                    )
                }}
            />

            <Tabs.Screen
                name = 'Client'
                options = {{
                    title: 'Client',
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome5 name="user-tie" size={24} color = { color } />
                    )
                }}
            />

        </Tabs>
    )
}

const styles = StyleSheet.create({
    logoutButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginRight: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 15
    }
})

// #1e3d58
// #3eb59d
// #42ab49