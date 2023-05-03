import { StyleSheet } from 'react-native';

import Colors from '../../Utils/Colors';

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    imageBackGround: {
        width: '100%',
        height: '100%',
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
    innerHeadingContainer: {
        width: '90%',
        alignSelf: 'center',
        // flexDirection:'row'
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
        alignItems: 'center',
        marginTop: 15,
        // backgroundColor:'red'
    },
    mainHeading: {
        color: Colors.black,
        margin: 5,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: "JosefinSans-Bold",
        fontSize: 20,
        // marginLeft: 100
    },
    optionsContainer: {
        marginTop: 15,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'flex-start'
    },
    borderView: {
        width: '100%',
        height: 60,
        borderBottomWidth: 0.5,
        borderColor: Colors.LightGray,
        marginTop: 10,
        justifyContent: 'center'
    },
    rowContainer: {
        width: '90%',
        flexDirection: 'row',
    },
    answerContainer: {
        width: "90%",
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 5
    },
    answerText: {
        fontSize: 14,
        fontFamily: "JosefinSans-Regular",
        color: Colors.mediumGray
    },
    messageInput: {
        alignSelf: 'center',
        height: 120,
        width: '100%',
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
        borderRadius: 15,
        // backgroundColor: Colors.inputColor,
        // backgroundColor: 'red',
        fontFamily: 'Roboto-Regular',
        paddingLeft: 15,
        color: Colors.textColor
    },
    sendButtonStyle:{
        width:'90%',
        marginTop:20
    }
})

export default Style;