import { StyleSheet } from "react-native";

import Colors from "../../Utils/Colors";

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // padding: 10,
        backgroundColor: Colors.black,
    },
    shadowContainer: {
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: "rgba(10, 10, 10,0.5)",
        // backgroundColor:"red"
    },
    innerContainer: {
        width: '100%',
        // backgroundColor:'red',
        // padding: 5,
        marginTop: 20,
        alignItems: 'center',
        height: '80%'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        padding: 10,
        alignItems: 'center',
    },
    menuIconStyle: {
        width: 35,
        height: 35,
        tintColor: Colors.white,
        // backgroundColor:'red',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    flatListMainContainer: {
        width: '100%',
        // height: 150,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: "rgba(239,239,239,0.6)",
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    flatListInnerContainer: {
        width: "95%",
        alignSelf: 'center',
        flexDirection: 'row',
    },
    flatListLocationName: {
        color: Colors.black,
        fontFamily: 'JosefinSans-Bold',
        fontSize: 15,
        // marginTop: '5%'
    },
    flatListLocation: {
        color: Colors.black,
        // backgroundColor:'red',
        // width: '85%',
        fontSize: 13,
        marginBottom: -12
    },
    flatListImageContainer: {
        width: 120,
        height: 120,
        // backgroundColor:'red',
        borderWidth: 3,
        borderRadius: 5,
        borderColor: Colors.white,
        marginRight: 20,
    },
})

export default Style;