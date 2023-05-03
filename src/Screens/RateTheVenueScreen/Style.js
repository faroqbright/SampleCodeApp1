import { StyleSheet } from "react-native";

import Colors from '../../Utils/Colors'

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    shadowContainer: {
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: "rgba(10, 10, 10,0.5)",
        // backgroundColor:"red"

    },
    rowContainer: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop:15,
        justifyContent:'space-evenly'
    },
    innerContainer: {
        width: '100%',
        backgroundColor: 'red',
        padding: 10,
        // marginTop: 20,
        alignItems: 'center',
        // height: '60%'
    },
    checkImageContainer: {
        width: '100%',
        marginTop: 20,
        alignSelf: 'center',
        alignItems: 'center',
        // backgroundColor:'red'
    },
    checkMarkStyle: {
        width: 120,
        height: 150,
        tintColor: Colors.white
    },
    successTextContainer: {
        width: '100%',
        marginTop: 15,
        alignSelf: 'center',
        alignItems: 'center',
        // backgroundColor:'red'
    },
    successTextStyle: {
        color: Colors.white,
        fontFamily: 'JosefinSans-SemiBold',
        fontSize: 20,
        textAlign: 'center'
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        borderColor: Colors.white,
        borderWidth: 2,
        marginTop: 20,
        width:'90%'
    },
    messageContainer: {
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 20,
        // height: 300,
        width: '90%',
        padding: 10,
        borderColor: Colors.white,
        borderWidth: 1,
        backgroundColor: 'transparent'
    },
    messageInputStyle: {
        width: '100%',
        color: Colors.white,
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
        justifyContent: 'center'
    },
    uploadText: {
        justifyContent: 'center',
        marginLeft: 15,
        marginTop: 10,
        alignSelf: 'center'
    },
    messageImageContainer: {
        width: '100%',
        alignSelf: 'center',
        height: 150,
        marginTop: 30
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
    descriptionContainer:{
        alignSelf:'center',
        width:'90%',
        justifyContent:'center'
    },
    venuName:{
        color:Colors.white,
        textAlign:'center',
        fontSize:18,
        fontFamily:'JosefinSans-SemiBold'
    },
    venuAddress:{
        color:Colors.white,
        textAlign:'center',
        fontSize:17,
    }
})

export default Style;