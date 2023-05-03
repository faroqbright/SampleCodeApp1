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
    innerHeadingContainer: {
        width: '90%',
        alignSelf: 'center',
        // flexDirection: 'row'
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
    notificationContainer:{
        width:'90%',
        marginTop:15,
        alignSelf:'center',
        alignItems:'center'
    },
    notificationText:{
        fontSize:16,
        color:Colors.LightBlack,
        fontFamily:'JosefinSans-SemiBold'
    },
    messageContainer:{
        marginTop:10,
        width:'90%',
        alignSelf:'center',
        alignItems:'center',
    },
    messageText:{
        color:Colors.mediumGray,
        fontFamily:'JosefinSans-Regular',
    },
    messageDetailContainer:{
        marginTop:10,
        width:'90%',
        height:120,
        paddingTop:10,
        backgroundColor:Colors.inputColor,
        borderRadius:15,
        borderColor:Colors.mediumGray,
        borderWidth:0.5,
        alignSelf:'center',
        alignItems:'center'
    },
    rowContainer:{
        width:'95%',
        height:25,
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        paddingHorizontal:2,
    },
    paymentText:{
        fontFamily:'JosefinSans-SemiBold',
        color:Colors.blue,
        fontSize:16,
        textDecorationLine:'underline'
    },
    leftText:{
        fontFamily:'JosefinSans-SemiBold',
        color:Colors.LightBlack
    },
    rightText:{
        fontFamily:'JosefinSans-SemiBold',
        color:Colors.LightBlack
    }
})

export default Style;