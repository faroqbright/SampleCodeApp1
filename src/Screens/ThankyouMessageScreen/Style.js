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
    messageContainer: {
        alignSelf: 'center',
        marginTop: '10%',
        borderRadius: 20,
        height: 300,
        width: '90%',
        padding: 10,
        backgroundColor: Colors.white
    },
    messageInputStyle: {
        width: '100%',
        height: 80,
        color: Colors.textColor
    },
    cameraIconContainer: {
        width: '100%',
        // height: '20%',
        flexDirection: 'row',
        // justifyContent:'center',
        marginTop: 15
    },
    cameraIcon: {
        width: 30,
        height: 30,
        // marginTop:'8%',
        tintColor:Colors.LightGray,
        justifyContent: 'center'
    },
    uploadText: {
        justifyContent: 'center',
        marginLeft: 15,
        marginTop: 10,
        color: Colors.textColor,
        alignSelf: 'center'
    },
    continueButtonStyle: {
        marginTop: 15,
        borderWidth: 1,
        borderColor: Colors.white,
        backgroundColor: 'transparent'
    },
    continueButtonTextStyle: {
        color: Colors.LightGray
    },
    messageImageContainer: {
        width: '100%',
        alignSelf: 'center',
        height: 150
    },
    modalContainerStyle: {
        height: 250,
    },
    modalLabelStyle: {
        color: Colors.LightGray
    },
    cameraButton: {
        backgroundColor: Colors.green,
        borderColor: Colors.green
    },
    cameraButtonText: {
        color: Colors.white
    },
})

export default Style;