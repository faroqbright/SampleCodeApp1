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
        height: '40%',
        marginTop: 'auto',
        backgroundColor: Colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    bottomInnerainContainer: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 15,
        // backgroundColor:'red'
    },
    IconContainer: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        // backgroundColor:'red',
        paddingLeft: 50
    },
    imageContainer: {
        width: '25%',
        height: 80,
        borderColor: Colors.blue
        // backgroundColor:'blue'
    },
    payPalImageContainer: {
        width: '25%',
        height: 80,
        marginLeft: 25,
        borderColor: Colors.blue
        // backgroundColor:'blue'
    },
    inputHeadingContainer: {
        width: '80%',
    },
    inputHeading: {
        fontSize: 12,
        marginLeft: 15,
        fontFamily: 'JosefinSans-Bold',
        color: Colors.blue
    },
    rowContainer: {
        width: "80%",
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
        marginBottom: 80,
        backgroundColor: 'transparent',
        borderColor: Colors.LightBlue,
        borderWidth: 1
    },
    payButtonTextStyle: {
        color: Colors.LightBlue
    },
    visaContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomWidth: 0.5,
        paddingHorizontal: 15,
        borderColor: Colors.LightGray
    },
    payPalContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomWidth: 0.5,
        paddingHorizontal: 15,
        borderColor: Colors.LightGray
    },

    visaCardImageContainer: {
        width: 120,
        borderRadius: 10,
        borderColor: Colors.LightGray,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    payPalImageContainer: {
        width: 120,
        borderRadius: 10,
        borderColor: Colors.LightGray,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // backgroundColor:'red',
    },
    visaImage: {
        width: 40,
        height: 40,
        // tintColor:Colors.LightBlue,
        alignSelf: 'center'
    },
    gPayImage: {
        width: 40,
        height: 40,
        // tintColor:Colors.LightBlue,
        alignSelf: 'center',
        marginRight: 'auto',
        marginLeft: 10,
        marginTop: 15
    },
    payPalImage: {
        width: 60,
        height: 40,
        // tintColor:Colors.LightBlue,
        alignSelf: 'center',
        marginRight: 'auto',
        marginLeft: 10,
        marginTop: 15
    },
    cardText: {
        marginLeft: 10,
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: 'JosefinSans-Regular',
        color: Colors.LightGray,
        marginBottom: 15
    },
    backSlashText: {
        color: Colors.mediumGray,
        alignSelf: 'center',
        fontSize: 20,
        marginHorizontal: 5
    },
    checkBoxStyle: {
        marginTop: 5,
        marginLeft: 15,
        tintColors: Colors.blue,
        transform: [{ scaleX: .8 }, { scaleY: .8 }]
    },
    pricContainer: {
        alignSelf: 'center',
        width: '95%',
        height: 280,
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginBottom: 10,
        borderRadius: 10,
        padding: 10
    },
    priceText: {
        color: Colors.black,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        letterSpacing: 0.5
    },
    priceRowContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        paddingHorizontal: 10
    },
    priceDetailText: {
        color: Colors.black,
        fontFamily: "Roboto-Medium",
        fontSize: 18
    }
})

export default Style;