import { StyleSheet } from "react-native";
import Colors from '../../Utils/Colors'

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.black
    },
    headingContainer: {
        width: '100%',
        height: '35%',
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    mainHeading: {
        alignSelf: 'center',
        color: Colors.white,
        fontSize: 40,
        fontFamily: 'Roboto-BoldItalic',
        // fontWeight:'bold',
        // marginTop:20,
    },
    shadowContainer: {
        // flex:1,
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(10, 10, 10,0.5)",
        // tintColor:('rgba',68, 66, 65,0.6)

    },
    subHeading: {
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        marginVertical: 10
    },
    subHeadingString: {
        fontSize: 18,
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'JosefinSans-SemiBold',
        marginBottom: 'auto',
    },
    buttonContainer: {
        width: '100%',
        height: '70%',
        // backgroundColor:'blue',
        alignSelf: 'center',
        alignItems: 'center',
        // justifyContent:'center'
    },
    orText: {
        fontSize: 15,
        color: Colors.white,
        margin: 20,
        fontFamily: 'Roboto-Bold'
    },
    registerButtonStyle: {
        backgroundColor: Colors.green
    },
    venueButtonStyle: {
        backgroundColor: Colors.black,
        borderColor: Colors.white,
        borderWidth: 1,
        marginTop: 80,
    },
    bsMainContainerStyle: {
        alignItems: 'flex-start'
    },
    mainLabelStyle: {
        fontSize: 40,
        textAlign: 'left'
    },
    imageBackGround: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop:'50%'
    }
})

export default Style;