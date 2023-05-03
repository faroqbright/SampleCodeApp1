import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput
} from 'react-native';

// Libraries
import Toast from 'react-native-simple-toast';

//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors'


//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import Loader from '../../Components/Loader';

//APi endpoints
import { resendVerificationEmailAPI } from '../../api/methods/auth';

const VerifyEmail = ({ navigation, route }) => {

    const userEmail = route?.params?.email
  
    const [loading, setLoading]= useState(false)

    const onResendPress = async () =>{
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("email",userEmail)
            const response = await resendVerificationEmailAPI(formData)
            if(response.status==200){
                Toast.show(response.data.message)
            }
            setLoading(false)
        } catch (error) {
            Toast.show("Something went wrong Please Try Again!")
            setLoading(false)
        }
    }

    return (
        <View style={Style.mainContainer}>
            <ImageBackground
                // resizeMode="contain"
                source={Images.friendsCheering}
                style={Style.imageBackGround}
            >
                <View style={Style.shadowContainer}>
                    <View style={Style.headingContainer}>
                        <Header
                            headerStyle={Style.headerStyle}
                        />
                    </View>
                    <View style={Style.bottomContainer}>
                        <View style={Style.bottomInnerainContainer}>
                            <Text style={Style.mainHeading}>{"Verify Email"}</Text>
                            <Text style={Style.description}>{
                                "Please check your email for\nconfirmation mail, click link it email to\nverification your account"
                            }
                            </Text>
                            <Text
                                style={[Style.description,{marginTop:'25%'}]}
                            >
                                {"Didn't get email confirmation?"}
                            </Text>
                            <CustomButton
                                onPress={() => { onResendPress() }
                                }
                                mainButtonStyle={[Style.nextButton, {
                                    backgroundColor: 'transparent',
                                    borderColor: Colors.blue,
                                    borderWidth: 0.5
                                }]}
                                btnTextStyle={[Style.btnTextStyle, {
                                    color: Colors.blue
                                }]}
                                label={"RESEND"}
                            // disabled={}
                            />
                            <CustomButton
                                onPress={()=>{
                                    navigation.navigate("LoginScreen")
                                }}
                                mainButtonStyle={Style.gotTheEmailButtonStyle}
                                btnTextStyle={[Style.btnTextStyle, {
                                    color: Colors.white
                                }]}
                                label={"GOT THE EMAIL"}
                            // disabled={}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </View>
    )
}

export default VerifyEmail;

