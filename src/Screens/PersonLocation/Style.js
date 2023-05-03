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
    profileIconView: {
        width: '100%',
        height: '10%',
        // backgroundColor:'red',
        alignItems: 'flex-end',
        paddingHorizontal: 15,
    },
    avatarIconStyle: {
        width: 70,
        height: 70,
        marginTop: 5,
    },
    innerContainer: {
        width: '100%',
        // backgroundColor:'red',
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
        height: '60%'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '90%',
        // padding: 10,
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
    continueButton: {
        // marginTop: 15,
        // marginBottom:-30,
        backgroundColor: 'transparent',
        borderColor: Colors.LightGray,
        borderWidth: 0.5,
    },
    venueTextStyle: {
        color: Colors.white,
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'JosefinSans-Bold',
        marginTop: 10
    },
    flatListMainContainer: {
        width: '100%',
        height: 130,
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    flatListInnerContainer: {
        width: "90%",
        alignSelf: 'center',
        flexDirection: 'row',
    },
    flatListLocationName: {
        color: Colors.white,
        fontFamily: 'JosefinSans-Bold',
        fontSize: 20,
        marginTop: '20%'
    },
    flatListLocation: {
        color: Colors.white,
        fontSize: 15,
        marginTop: 5
    },
    flatListImageContainer: {
        width: "50%",
        // backgroundColor:'red',
        borderWidth: 3,
        borderRadius: 5,
        borderColor: Colors.white,
        marginRight: 20
    },
    checkBoxImageStyle: {
        width: 60,
        height: 90,
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1,
        marginLeft: '10%',
        tintColor: Colors.white
    }
})

export default Style;