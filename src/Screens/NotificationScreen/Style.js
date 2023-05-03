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
    innerHeadingContainer:{
        width:'90%',
        alignSelf:'center',
        // flexDirection:'row',
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
        marginTop:15,
        // backgroundColor:'red'
    },
    mainHeading: {
        color: Colors.black,
        margin: 5,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: "JosefinSans-Bold",
        fontSize: 20,
        // marginLeft: 75
    },
    notificationContainer:{
        // marginTop:15,
        width:'100%',
        alignSelf:'center',
        backgroundColor:Colors.whiteGray
    },
    rowContainer:{
        width:'100%',
        height:60,
        alignSelf:'center',
        justifyContent:'space-evenly',
        flexDirection:'row',
        borderBottomWidth:0.5,
        borderColor:Colors.LightGray
    },
    greenContainer:{
        width:30,
        height:30,
        alignSelf:'center',
        backgroundColor:Colors.green,
        borderRadius:100
    },
    descriptionContainer:{
        width:220,
        paddingLeft:1,
        alignSelf:'center',
        justifyContent:'center'
    },
    dayContainer:{
        width:45,
        alignSelf:'center',
        justifyContent:'center'
    },
    notiticationText:{
        color:Colors.black,
        fontFamily:'Moniker-Regular'
    },
    notificationDayText:{
        fontSize:10,
        color:Colors.black,
        fontFamily:'Moniker-Regular'
    }
})

export default Style;