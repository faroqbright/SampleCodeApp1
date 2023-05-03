import { StyleSheet } from "react-native";
import Colors from "../../Utils/Colors";

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.black,
        // alignSelf:'center'
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
        paddingHorizontal: 15
    },
    avatarIconStyle: {
        width: 44,
        height: 44,
        marginTop: 5
    },
    inputContainer: {
        alignSelf: 'center',
        width: '80%',
        alignItems: 'center',
        color: Colors.textColor
    },
    phoneContainer: {
        width: '80%',
        height: 50,
        flexDirection: 'row',
        backgroundColor: Colors.inputColor,
        borderRadius: 25,
        alignSelf: 'center',
        marginTop: 20,
        paddingHorizontal: 15,
        alignItems: "center",
    },
    phoneInputContainer: {
        height: "60%",
        width: "78%",
        paddingLeft: 10,
        borderLeftWidth: 0.5,
        borderLeftColor: Colors.DarkGray,
        marginLeft: 10,
        fontFamily: 'Roboto-Regular',
        color: Colors.textColor,
        padding:0
    },
    countryImageContainer: {
        width: '18%',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },
    messageInput: {
        alignSelf: 'center',
        height: 250,
        width: '80%',
        marginTop: 20,
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: Colors.inputColor,
        fontFamily: 'Roboto-Regular',
        borderColor: Colors.LightGray,
        color: Colors.textColor
    },
    messageContainer: {
        alignSelf: 'center',
        height: 70,
        width: '100%',
        marginTop: 10,
        borderRadius: 15,
        fontFamily: 'Roboto-Regular',
        paddingLeft: 15,
        color: Colors.textColor
    },
    messageImageContainer: {
        width: '90%',
        alignSelf: 'center',
        height: 120,
    },
    imagePickerContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto'
    },
    imageButton: {
        width: 25,
        height: 25,
        marginLeft: 15
    },
    uploadText: {
        color: Colors.LightGray,
        marginLeft: 10,
        fontFamily: 'JosefinSans-Regular',
        marginTop: 5,
        alignSelf: 'center'
    },
    modalContainerStyle: {
        // height: 250,
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
    contactView: {
        width: '70%',
        backgroundColor: Colors.LightGray
    },
    rowContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemImageContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: Colors.white,
        height: 130,
        marginTop: 20,
        borderRadius: 10,
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
        top: 109,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(10, 10, 10,0.4)",
        position: 'absolute',
        alignSelf: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    priceContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 2
    },
    nameText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 15
    },
    priceText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 15
    },
})


export default Style;