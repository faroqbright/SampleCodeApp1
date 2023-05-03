import { StyleSheet } from "react-native";

import Colors from "../../Utils/Colors";

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // padding: 10,
        backgroundColor: Colors.black,
    },
    shadowContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(10, 10, 10,0.5)",
        // backgroundColor:"red"
    },
    bottomContainer: {
        width: '100%',
        height: '75%',
        marginTop: 'auto',
        backgroundColor: Colors.white,
        // borderTopRightRadius: 20,
        // borderTopLeftRadius: 20
    },
    bottomInnerContainer:{
        width:'100%',
        height:'100%',
        alignSelf:'center',
        // backgroundColor:'red',
        // alignItems:'center'
    },
    venueImageStyle:{
        width:'80%', 
        height:250,
        marginTop:15,
        alignSelf:'center',
        borderRadius:5
    },
    venueName:{
        fontSize:20,
        marginLeft:'10%',
        marginTop:10,
        color:Colors.DarkGray,
        fontFamily:'Moniker-Bold'
    },
    venueLocation:{
        marginTop:10,
        marginLeft:'10%',
        fontFamily:'Roboto-Regular',
        fontSize:15,        
        color:Colors.mediumGray
    },
    venueDescription:{
        marginTop:10,
        marginLeft:'10%',
        fontSize:15,
        fontFamily:'Roboto-Regular',
        lineHeight: 20,
    }
})

export default Style;