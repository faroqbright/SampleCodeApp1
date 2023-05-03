import { StyleSheet } from "react-native";

import Colors from "../../Utils/Colors";

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    imageBackGround: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop:'50%'
    },
    shadowContainer: {
        // flex:1,
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(10, 10, 10,0.5)",
        // tintColor:('rgba',68, 66, 65,0.6)

    },
    headingContainer: {
        width: '100%',
        height: '35%',
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop:5
    },
    headerStyle: {
        marginBottom: 'auto',
        marginTop:50
    },
    bottomContainer: {
        width: '100%',
        height: '70%',
        marginTop: 'auto',
        backgroundColor: Colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    bottomInnerContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        padding: 15
    },
    mainHeading: {
        color: Colors.black,
        margin: 5,
        // textAlign: 'center',
        fontFamily: "JosefinSans-Bold",
        fontSize: 45
    },
    description: {
        marginLeft: 15,
        fontSize: 18,
        marginTop: 10,
        fontFamily: 'Roboto-Regular',
        color:Colors.black
    },
    nextButton: {
        alignSelf: 'center',
        marginTop: 20,
        width: '90%',
        // marginLeft: 15,
    },
    inputContainer: {
        width: '100%',
        alignItems:'center'
    },
    codeContainer: {
        width: '25%',
        height: '100%',
        borderRightWidth: 0.5,
        borderColor: Colors.LightGray,
        // borderRadius:25,
        flexDirection: 'row',
        // marginLeft:10,
        // backgroundColor:'red'
    },
    countryIconContainer: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        marginLeft: 15,
        borderRadius: 50,
        backgroundColor: 'red'
    },
    countryIconStyle: {
        width: '100%',
        height: '100%'
    },
    countryCodeText: {
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 10,
        fontSize: 15
    },
    codeInputContainer: {
        width: '75%',
        height: '100%',
        // backgroundColor:'red',
        // borderRadius:50,
        paddingLeft: 10,
        color: 'gray',
        fontSize: 15

    }
})

export default Style;