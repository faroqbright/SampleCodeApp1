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
        paddingBottom: 40
        // backgroundColor:"red"

    },
    flatListMainContainer: {
        width: '100%',
        height: 150,
        margin: 5,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: Colors.white,
        // height: 150,
        marginTop: 20,
        borderRadius: 10,
    },
    imageContainer: {
        width: '40%',
        height: '100%',
        alignSelf: 'center',
        // marginLeft: 15,
        // paddingVertical: 10,
        // borderRadius:15,
        backgroundColor: Colors.white
    },
    descriptionTextContainer: {
        alignSelf: 'center',
        width: '60%',
        height: '80%',
        // marginTop:15,
        // height:60,
        justifyContent: 'center',
        // paddingLeft:5,
        paddingRight: 10,
        // paddingBottom: 30,
        // marginBottom:20,
        marginLeft: 15,
    },
    subDescriptionText: {
        marginTop: 5,
        color: Colors.textColor
    },
    descriptionText: {
        color: Colors.black,
        fontFamily: 'Moniker-Bold',
        fontSize: 12,
    },
    inputContainer: {
        // width: '90%',
        alignSelf: 'center'
    }
})

export default Style;