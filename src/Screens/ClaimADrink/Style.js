import { StyleSheet } from "react-native";
import Colors from "../../Utils/Colors";

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.black,
    },

    shadowContainer: {
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: "rgba(10, 10, 10,0.5)",
        // backgroundColor:"red"

    },
    renderContainer: {
        width: '100%',
        height: 130,
        alignSelf: 'center',
        paddingLeft: 50,
        marginTop: 20,
    },
    rowContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',

    },
    imageContainer: {
        width: 100,
        height: 100,
        marginRight: 20,
        borderRadius: 15,
        // borderColor:Colors.LightGray,
        // borderWidth:0.5
        // marginLeft:20
    },
    textContainer: {
        width: '60%',
        // height: 100,
        padding:10,
        alignSelf: 'center',
    },
    itemNameText: {
        color: Colors.white,
        marginTop: 8,
        fontFamily: 'Roboto-Bold',
        fontSize: 18
    },
    itemFromText: {
        color: Colors.white,
        marginTop: 10,
        fontFamily: 'Roboto-Regular',
        fontSize: 13
    },
    itemMessageText: {
        color: Colors.white,
        marginTop: 15,
        fontFamily: 'Roboto-Italic',
        fontSize: 13
    },
    redeemButtonStyle: {
        backgroundColor: 'transparent',
        borderColor: Colors.LightGray,
        borderWidth: 0.5,
        marginBottom: 10,
        // marginTop:15
        position: 'absolute',
        zIndex: 9999,
        top: '85%'
    },
    checkBoxImageStyle: {
        width: 60,
        height: 80,
        marginTop: '10%',
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1,
        marginLeft: '10%',
        tintColor: Colors.white
    },
    messageContainer: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop:'50%'
    },
    messageText:{
        color: Colors.white,
        fontFamily: "Roboto-Bold",
        fontSize: 18
    }
})

export default Style;