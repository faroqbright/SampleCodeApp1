import { StyleSheet } from 'react-native';

import Colors from '../../Utils/Colors';

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
        marginBottom: 'auto'
    },
    bottomContainer: {
        width: '100%',
        height: '70%',
        marginTop: 'auto',
        backgroundColor: Colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    bottomInnerainContainer: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        // alignItems: 'center',
        marginTop: 15,
        // backgroundColor:'red'
    },
    mainHeading: {
        color: Colors.black,
        margin: 5,
        fontFamily: "JosefinSans-Bold",
        fontSize: 28,
        marginLeft:20
    },
    loginButtonStyle: {
        backgroundColor: Colors.white,
        borderColor: Colors.blueBorder,
        borderWidth: 0.5,
        margin: 20,
        marginTop: 'auto',
        marginBottom:50,
        width: '90%'
    },
    loginButtonTextStyle: {
        color: Colors.blue,
        fontFamily: 'Roboto-Medium'
    },
    description: {
        fontSize: 16,
        color: Colors.mediumGray,
        marginLeft:20,
        marginTop:10
    }
})

export default Style;