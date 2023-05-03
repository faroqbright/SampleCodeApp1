import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput
} from 'react-native';


//Libraries
import { useIsFocused } from '@react-navigation/native';
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

// Api endpoints
import { verifyPhoneApi, verifyPhoneOtp } from '../../api/methods/auth';


const VerificationScreen = ({ navigation, route }) => {

    const isFocused = useIsFocused()
    // const params = route?.params?.userData
    const params = route?.params?.userPhone
    const userPhoneCode = route?.params?.userPhoneCode
    const countryCodeImage = route?.params?.countryCodeImage

    console.log("PARAMS", countryCodeImage);

    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)

    const verifyPhone = async () => {
        console.log("CHECK phone", "+44" + params);
        try {
            setLoading(true)
            const formData = new FormData()
            // formData.append('phone', params.phoneNo)
            formData.append('phone', params)
            const response = await verifyPhoneApi(formData)
            if (response.status == 200) {
                Toast.show(response.data.message)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            Toast.show(error.response.data.error.message)
        }
    }

    const onNextPress = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('phone', params)
            formData.append('otp', code)
            const response = await verifyPhoneOtp(formData)
            if (response.status == 200) {
                Toast.show(response.data.message)
                navigation.navigate('LoginScreen')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            Toast.show(error.response.data.message)
        }
    }

    useEffect(() => {
        verifyPhone()
    }, [isFocused])

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
                            <Text style={Style.mainHeading}>{"Verify Phone\n Number"}</Text>
                            <Text style={Style.description}>{`We have sent you an SMS with a code\n to number ${params}`}</Text>
                            <View></View>
                            <View style={Style.inputContainer}>
                                <View style={Style.codeContainer}>
                                    <View style={Style.countryIconContainer}>
                                        <Image
                                            style={Style.countryIconStyle}
                                            source={{ uri: countryCodeImage }}
                                        />
                                    </View>
                                    {/* <Text style={Style.countryCodeText}>{params?.slice(0, 2)}</Text> */}
                                </View>
                                <TextInput
                                    style={Style.codeInputContainer}
                                    placeholderTextColor={Colors.LightGray}
                                    placeholder={"Verification Code"}
                                    keyboardType='numeric'
                                    value={code}
                                    onChangeText={(text) => setCode(text)}

                                />
                            </View>

                            <CustomButton
                                onPress={() => onNextPress()}
                                mainButtonStyle={[Style.nextButton, {
                                    backgroundColor: code.length > 0 ? Colors.blue : 'transparent',
                                    borderColor: Colors.blue,
                                    borderWidth: 0.5
                                }]}
                                btnTextStyle={[Style.btnTextStyle, {
                                    color: code.length > 0 ? Colors.white : Colors.blue
                                }]}
                                label={"NEXT"}
                            // disabled={}
                            />
                        </View>
                    </View>
                </View>
                <Loader loading={loading} isShowIndicator={true} />
            </ImageBackground>
        </View>
    );
};

export default VerificationScreen;


