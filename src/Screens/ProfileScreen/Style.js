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
        flex:1,
        backgroundColor:"rgba(10, 10, 10,0.5)",
        // tintColor:('rgba',68, 66, 65,0.6)

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
        fontFamily: 'Moniker-MediumItalic',
        marginTop: 30,
    },
    subHeading: {
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'JosefinSans-Bold',
        fontSize: 30,
        marginVertical: 10
    },
    profileImageContainer:{
        alignSelf:'center',
        width:100,
        height:80,
        alignItems:'center',
        // backgroundColor:'red',
        borderRadius:25
    },
    cameraIconContainer:{
        width:35,
        height:35,
        position:'absolute',
        left:65,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        borderWidth:0.5,
        borderColor:"rgba(10, 10, 10,0.5)",
        backgroundColor:"rgba(10, 10, 10,0.3)",
    },  
    cameraIconImage:{
        alignSelf:'center',
        width:20,
        height:20,
        tintColor:Colors.white
    },  
    inputContainer:{
        width:'90%',
        alignSelf:'center',
    },
   
    countryContainer:{
        flexDirection:'row',
        backgroundColor:Colors.inputColor,
        width:'90%',
        height:50,
        borderRadius:25,
        marginTop:20,
        alignSelf:'center'
    },
    countryImageContainer:{
        width:'30%',
        flexDirection:'row',
        justifyContent:'space-evenly',
        // backgroundColor:'red',
        alignSelf:'center'
    },
    countryInput:{
        width:'65%',
        height:'100%',
        alignSelf:'center',
        borderRadius:20,
        color:Colors.textColor
    },
    modalContainerStyle:{
        height:250,
    },
    modalLabelStyle:{
        color:Colors.LightGray
    },
    cameraButton:{
        backgroundColor:Colors.green,
        borderColor:Colors.green
    },
    cameraButtonText:{
        color:Colors.white
    },
    dateOfBirthContainer:{
        width:'90%',
        flexDirection:'row',
        backgroundColor:Colors.white,
        alignSelf:'center'
    },
    dateOfBirthInput:{
        width:'70%'
    },
    pickerContainer:{
        width: '90%',
        height:45,
        alignSelf:'center', 
        marginTop:20,
        borderRadius:20,
        // backgroundColor:Colors.white,
        backgroundColor:'red',
        marginBottom:100
    },
    saveButton:{
        backgroundColor:Colors.green,
        width:'90%',
        marginTop:15
    }
})

export default Style;