import { Pressable, StyleSheet, Text } from "react-native";

export default function FloatingButton({ icon, style, press }){

    return(
        <Pressable onPress = { press } style = {[ style, styles.floatingButton ]}>
            <Text style = { styles.buttonText }> { icon } </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    floatingButton: {
        display: 'flex',
        position: 'absolute',
        backgroundColor: '#1e3d58',
        justifyContent: 'center',
        alignItems: 'center',
    },
})