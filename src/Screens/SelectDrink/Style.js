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
    shadowContainer2: {
        width: '100%',
        height: '100%',
        // padding: 10,
        // backgroundColor: "#191970",
        borderRadius: 10,
        backgroundColor: "rgba(10, 10, 10,0.5)",
        // paddingBottom: 40,


    },
    itemImageContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: Colors.white,
        height: 150,
        marginTop: 20,
        borderRadius: 10
        // opacity: 0.5,
    },
    checkImageContainer: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: "rgba(10, 10, 10,0.4)",
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    checkBoxImageStyle: {
        width: 60,
        height: 80,
        marginTop: '10%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: '10%',
        tintColor: Colors.white
    },
    nameContainer: {
        width: '100%',
        bottom: 0,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        alignSelf: 'center',
        // borderBottomRightRadius: 10,
        // borderBottomLeftRadius: 10,
        backgroundColor: "rgba(10, 10, 10,0.5)",
    },
    priceContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 2,
    },
    nameText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 14,
        // opacity:80
    },
    priceText: {
        // color: Colors.white,
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: 15,
    },
    drinkButtonStyle: {
        backgroundColor: 'transparent',
        borderColor: Colors.LightGray,
        borderWidth: 0.5,
        marginTop: 15
    },
    nextButtonStyle: {
        backgroundColor: Colors.green,
        width: '60%',
        marginBottom: 'auto'
    },
    modalContainerStyle: {
        // backgroundColor: "rgba(10, 10, 10,0.4)",
        width: '58%',
        borderRadius: -5,
        height: '39%',
        // alignSelf: 'center',
        // marginRight: 90,
        // left:20,
        // marginBottom: 15,
        backgroundColor: 'transparent',
    },
    modalLabelStyle: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center'
    },
    firstButtonStyle: {
        backgroundColor: 'transparent',
        borderColor: Colors.white
    },
    firstButtonTextStyle: {
        color: Colors.white
    },
    secondButtonStyle: {
        backgroundColor: 'transparent',
        borderColor: Colors.white,
        borderWidth: 0.5
    },
    secondButtonTextStyle: {
        color: Colors.white
    },
    cancelButtonStyle: {
        backgroundColor: 'transparent',
        marginTop: 'auto',
        marginBottom: 20
    },
    cancelButtonTextStyle: {
        color: Colors.white
    },
    buttonContainer: {
        backgroundColor: Colors.green,
        position: 'absolute',
        zIndex: 1,
        bottom: 70
    },
})

export default Style;