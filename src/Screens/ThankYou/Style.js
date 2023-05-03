import { StyleSheet } from "react-native";
import Colors from "../../Utils/Colors";


const Style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.black,
        // alignSelf:'center',
        // alignItems:'center'
    },
    shadowContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:"rgba(10, 10, 10,0.5)",
        // backgroundColor:"red"

    },
    headingContainer: {
        width: '100%',
        // height:100,
        margin: 40,
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center'
    },
    mainHeading: {
        alignSelf: 'center',
        color: Colors.white,
        fontSize: 40,
        fontFamily: 'Roboto-BoldItalic',
        marginTop: 30,
    },
    subHeading: {
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
        fontSize: 30,
        marginVertical: 10
    },
    descriptionStyle: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        marginTop: 40,
        marginBottom: 15
    },
    drinkButtonStyle: {
        backgroundColor: 'transparent',
        borderColor: Colors.white,
        borderWidth: 1,
        margin: 15
    },
    browsingButtonStyle: {
        width: '25%',
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center'
    },
    browsingButtonTextStyle: {
        color: Colors.white,
        fontSize:10,
        textDecorationLine: 'underline',
        fontFamily: 'Roboto-Bold',
        marginTop: 60
    },
    continueButtonStyle: {
        backgroundColor: 'transparent',
        borderColor: Colors.white,
        borderWidth: 1,
        marginTop: 30,
    }
})

export default Style;