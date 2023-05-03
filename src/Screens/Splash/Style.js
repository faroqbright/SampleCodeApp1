import { Dimensions, StyleSheet } from "react-native"
import Colors from "../../Utils/Colors"

export const Style = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:Colors.black,
    },
    splashBackGround:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        resizeMode:'cover',
    },
    shadowContainer:{
        flex:1,
        backgroundColor:"rgba(10, 10, 10,0.5)",
        // tintColor:('rgba',68, 66, 65,0.6)

    },  
    logoContainer:{
        width:'100%',
        height:154,
        marginTop:'70%',
        // backgroundColor:"red",
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    subHeadingContainer:{
        width:'100%',
        height:154,
        // marginTop:15,
        // backgroundColor:"red",
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    subHeadingString:{
        fontSize:18,
        color:Colors.white,
        textAlign:'center',
        fontFamily:'JosefinSans-SemiBold',
        marginBottom:'auto',
    }
})