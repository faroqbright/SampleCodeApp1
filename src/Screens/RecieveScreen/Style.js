import { StyleSheet } from "react-native";

import Colors from "../../Utils/Colors";

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.black,
        paddingBottom:50
    },

    shadowContainer: {
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: "rgba(10, 10, 10,0.5)",
        // backgroundColor:"red"

    },
    descriptionContainer:{
        width:"90%",
        alignSelf:'center',
        alignItems:'center',
        marginTop:5,
    },
    rowContainer:{
        width:"90%",
        alignSelf:'center',
        alignItems:'center',
        marginTop:15,
    },
    messageText:{
        fontSize:20,
        color:Colors.white,
        fontFamily:'JosefinSans-Italic',
        lineHeight:35
    },
    QRCodeContainer:{
        // backgroundColor:Colors.white,
        // backgroundColor:'red',
        marginTop:15,
        alignSelf:'center',
        alignItems:'center',
        // borderRadius:15,
        width:'90%',
        height:150,
        justifyContent:'space-evenly'
    },
    redeemText:{
        textAlign:'center',
        // marginLeft:'5%',
        color:Colors.black,
        fontSize:15,
        fontFamily:'JosefinSans-Regular'
    },
    finishButtonStyle:{
        marginTop:15,
        backgroundColor:Colors.green,
        borderWidth:1,
        borderColor:Colors.green
    },
    SendButtonStyle:{
        marginTop:15,
        backgroundColor:Colors.green
    },
    priceContainer:{
        width:'90%',
        alignSelf:'center',
        marginTop:15
    },
    priceText:{
        color:Colors.blue,
        fontSize:16,
        fontFamily:'JosefinSans-Medium'
    }
})

export default Style;