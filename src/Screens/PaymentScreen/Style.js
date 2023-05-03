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
        backgroundColor: "rgba(10, 10, 10,0.5)",
        // backgroundColor:"red"
    },
    bottomContainer: {
        width: '100%',
        height: '75%',
        // marginTop: 'auto',
        backgroundColor: Colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    bottomInnerainContainer: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        // marginTop: 15,
    },
    IconContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingLeft: 25
    },
    imageContainer: {
        width: 120,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderColor: Colors.LightGray,
        // borderWidth: 1,
        marginVertical: 5,
        borderRadius: 15
    },
    payPalImageContainer: {
        width: 40,
        height: 80,
        marginLeft: 25,
        borderColor: Colors.blue
        // backgroundColor:'blue'
    },
    inputHeadingContainer: {
        width: '90%',
    },
    inputHeading: {
        fontSize: 12,
        marginLeft: 15,
        fontFamily: 'JosefinSans-Bold',
        color: Colors.blue
    },
    rowContainer: {
        width: "90%",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    expiryInputContainer: {
        width: "60%"
    },
    cvcInputContainer: {
        width: '40%'
    },
    expiryInputField: {
        width: '100%'
    },
    expiryInputHeading: {
        marginTop: 15,
        marginLeft: 15,
        fontSize: 12,
        fontFamily: 'JosefinSans-Bold',
        color: Colors.blue
    },
    payButtonStyle: {
        marginTop: 'auto',
        backgroundColor: 'transparent',
        borderColor: Colors.blue,
        borderWidth: 1,
        width: '90%',
        marginBottom: 60,
    },
    payButtonTextStyle: {
        color: Colors.blue
    },
    checkBoxContainer: {
        width: "80%",
        flexDirection: 'row',
        // backgroundColor:'red',
        marginTop: 10
    },
    checkBoxStyle: {
        marginTop: 10,
        marginLeft: 15,
        tintColors: Colors.blue
    },
    cardText: {
        fontSize: 15,
        marginTop: 15,
        marginLeft: 5,
        color: Colors.LightGray
    },
    backSlashText: {
        color: Colors.mediumGray,
        alignSelf: 'center',
        fontSize: 20,
        marginHorizontal: 5
    }
})

export default Style;