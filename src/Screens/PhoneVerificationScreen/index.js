import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput
} from 'react-native';

// Libraries
import { StackActions, useIsFocused } from "@react-navigation/native";
import Toast from 'react-native-simple-toast'


//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors'


//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import OTPInput from '../../Components/OTPInput';
import Loader from '../../Components/Loader';

// API endpoints
import {
    resendEmailOTP,
    resendUserVerificationMail,
    verifyEmailOTP,
    verifyUserAccount
} from '../../api/methods/auth';

const PhoneVerificationScreen = ({ navigation, route }) => {


    const isFocused = useIsFocused()

    const { email, phoneNo, newUser, countryCodeImage, unverifiedUser } = route?.params || {}

    const [loading, setLoading] = useState(false)
    const [otp, setOTP] = useState('')

    const [timerCount, setTimer] = useState(60)
    const [checkZeroCount, setCheckZeroCount] = useState(null)

    useEffect(() => {
        timerFunc()
    }, [])

    const timerFunc = () => {
        setTimer(60);
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval);
                setCheckZeroCount(lastTimerCount - 1)
                return lastTimerCount - 1;
            });
        }, 1000);

        return () => {
            clearInterval(interval)
        }
    }
    const onNextPress = async () => {
        try {
            if (otp === '') {
                Toast.show("OTP is required")
            }
            else {
                setLoading(true)
                const formData = new FormData()
                formData.append('email', email)
                formData.append('otp_number', otp)
                const response = await verifyEmailOTP(formData)
                if (response.status == 200) {
                    Toast.show(response.data.message)
                    navigation.navigate('ResetPassword', {
                        userData: {
                            email: email,
                            otp: otp,
                        }
                    })
                }
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log('error==here=>>', error?.response?.data)
            Toast.show(error?.response?.data?.message)
        }
    }

    const verifyUser = async () => {
        try {
            if (otp === '') {
                Toast.show("OTP is required")
            }
            else {
                setLoading(true)
                const formData = new FormData()
                formData.append('email', email)
                formData.append('otp_number', otp)
                const response = await verifyUserAccount(formData)
                if (response.status == 200) {

                    Toast.show(response.data.message)
                    // navigation.navigate('VerificationScreen', {
                    //     userData: {
                    //         email: email,
                    //         phoneNo: phoneNo,
                    //         countryCodeImage:countryCodeImage
                    //     }
                    // })
                    navigation.navigate('LoginScreen')
                }
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            Toast.show(error?.response?.data?.message)
        }
    }


    const resendOTP = async () => {
        console.log(' im in resend otp');
        try {
            setLoading(true)
            timerFunc()
            const formData = new FormData()
            formData.append('email', email)
            const response = await resendEmailOTP(formData)
            setLoading(false)
            if (response.status == 200) {
                Toast.show(response.data.message)
            }
        } catch (error) {
            setLoading(false)
            Toast.show(error?.response?.data?.error?.message)
        }
    }

    const rsendUserVerificationEmail = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('email', email)
            const response = await resendUserVerificationMail(formData)
            if (response.status == 200) {
                Toast.show(response.data.message)
                // console.log('respone message==>>',response.data.message)
            }
        } catch (error) {
            Toast.show(error.response.data.error.message)
            console.log("erroor==>>>", error.response.data.error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // setOTP("")
        if (unverifiedUser === true) {
            rsendUserVerificationEmail()
        }
    }, [isFocused])

    return (
        <View style={Style.mainContainer}>
            <ImageBackground
                // resizeMode="cover"
                source={Images.friendsCheering}
                style={Style.imageBackGround}
            >
                <View style={Style.shadowContainer}>
                    <View style={Style.headingContainer}>
                        <Header
                            headerStyle={Style.headerStyle}
                            leftIcon={Images.leftIcon}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <View style={Style.bottomContainer}>
                        <View style={Style.bottomInnerContainer}>
                            <Text style={Style.mainHeading}>{"Email Verification"}</Text>
                            {/* <Text style={Style.description}>{"Enter your 4-digit OTP code to continue"}</Text> */}
                            <Text style={Style.description}>{"Please check your email for verification code and enter here."}</Text>
                            <View></View>
                            <View style={Style.inputContainer}>
                                <OTPInput
                                    onComplete={(code) => {
                                        setOTP(code)
                                    }}
                                />
                                <View style={{ flexDirection: 'row', width: "95%" }}>

                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-start' }}
                                        onPress={() => {
                                            // if (newUser || unverifiedUser) {
                                            //     rsendUserVerificationEmail()
                                            // }
                                            // else {
                                            //     resendOTP()
                                            // }
                                            resendOTP()
                                        }}
                                        disabled={checkZeroCount > 0 ? true : false}
                                    >
                                        {/* <Text style={Style.description}>{"I didn't receive any code"}</Text> */}
                                        <Text style={[Style.description, { opacity: checkZeroCount > 0 ? 0.4 : 1 }]}>{"Resend Code in :"}</Text>
                                    </TouchableOpacity>
                                    <Text style={[Style.description]}>{timerCount + "s"}</Text>
                                </View>
                            </View>

                            <CustomButton
                                onPress={() => {
                                    // if (otp.length > 0) {
                                    //     navigation.dispatch(StackActions.replace('AppStack', { screenName: 'ThankYou' }))
                                    // }
                                    if (newUser || unverifiedUser) {
                                        verifyUser()
                                    }
                                    else {
                                        onNextPress()
                                    }
                                }}
                                mainButtonStyle={[Style.nextButton, {
                                    backgroundColor: otp.length > 0 ? Colors.blue : 'transparent',
                                    borderColor: Colors.blue,
                                    borderWidth: 0.5,
                                }]}
                                btnTextStyle={[Style.btnTextStyle, {
                                    color: otp.length > 0 ? Colors.white : Colors.blue
                                }]}
                                label={"NEXT"}
                            // disabled={otp.length > 0 ? false : true}
                            />
                        </View>
                    </View>
                </View>
                <Loader loading={loading} isShowIndicator={true} />
            </ImageBackground>
        </View>
    );
};

export default PhoneVerificationScreen;

