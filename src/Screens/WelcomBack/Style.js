import { StyleSheet } from "react-native";
import Colors from "../../Utils/Colors";


const Style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.black,
        // backgroundColor: 'red',
        // alignSelf:'center',
        // alignItems:'center'
    },
    shadowContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:"rgba(10, 10, 10,0.5)",
        // tintColor:('rgba',68, 66, 65,0.6)

    },
    profileButtonContainer:{
        width:'100%',
        marginTop:5,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    notificationButton:{
        alignSelf:'flex-end',
        marginRight:10,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems:'center',
        justifyContent:'center',
        marginRight: 20,
        backgroundColor: 'gray'
    },
    profileButton:{
        alignSelf:'flex-end',
        marginRight:10,
        width:50,
        borderRadius:50,
        height:50
    },
    headingContainer: {
        width: '100%',
        // height:100,
        margin: 15,
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center'
    },
    mainHeading: {
        alignSelf: 'center',
        color: Colors.white,
        fontSize: 40,
        fontFamily: 'Moniker-MediumItalic',
        // marginTop: 30,
    },
    subHeading: {
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'JosefinSans-Bold',
        fontSize: 30,
        marginVertical: 10
    },
    descriptionStyle: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'JosefinSans-SemiBold',
        marginTop: 15,
        // marginBottom: 15
    },
    drinkButtonStyle: {
        backgroundColor: 'transparent',
        borderColor: Colors.white,
        borderWidth: 1,
        margin: 10
    },
    browsingButtonStyle: {
        width: '30%',
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center'
    },
    browsingButtonTextStyle: {
        color: Colors.white,
        fontSize:12,
        textDecorationLine: 'underline',
        fontFamily: 'JosefinSans-Medium',
        // marginTop: 30
    },
    continueButtonStyle: {
        backgroundColor: 'transparent',
        borderColor: Colors.white,
        borderWidth: 1,
        marginTop: 30,
    }
})

export default Style;