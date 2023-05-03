import { StyleSheet } from "react-native";
import Colors from "../../Utils/Colors";

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 10
    },
    upperContainer: {
        width: '100%',
        padding: 5,
        flexDirection: "row",
    },
    titleContainer: {
        width: "90%",
        paddingRight:20,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom:10,
    },
    title: {
        color: Colors.black,
        fontSize: 18,
        fontFamily: 'Moniker-Bold'
    }
})

export default Style;