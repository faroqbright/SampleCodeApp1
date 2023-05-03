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
    headerContainer:{
        width:'90%',
        alignSelf:'center',
        alignItems:'center',
    },
    innerContainer: {
        width: '100%',
        // backgroundColor:'red',
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
        // height: '60%'
    },
    homeIconContainer:{
        alignSelf:'flex-start',
        marginBottom:15,
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
    buttonContainer:{
        backgroundColor:'transparent',
        borderColor:Colors.white,
        borderWidth:2,
        marginTop:70
    },
    starButtonContainer: {
        width: 60,
        height: 50,
        backgroundColor: Colors.blue,
        flexDirection: 'row',
        alignSelf: 'center',
        borderWidth:1,
        borderColor:Colors.blue,
        borderRadius:5,
        alignItems:'center',
    },
    labelText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize:20,
        marginLeft:10
    },
    iconContainer: {
        width: 20,
        height: 20,
        marginLeft:5,
        tintColor:Colors.white
    }
    
})

export default Style;