import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Switch,
    FlatList
} from 'react-native';

// Libraries
import { StackActions, useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';


//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import Loader from '../../Components/Loader';

// API Endpoints
import { updateMarketingPreferenceApi, getProfileApi, notificationStatusApi } from '../../api/methods/auth';

// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { payPalLive } from '../../redux/actions/userSession';


const AccountSettings = ({ navigation }) => {

    const { currentUser, isPayPal } = useSelector(state => state.userSession)
    // console.log('current user====>>>',currentUser)

    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const [isEnabled, setIsEnabled] = useState(false);
    const [userInfo, setUserInfo] = useState('')
    const [loading, setLoading] = useState(false)
    const [isEmailNotification, setIsEmailNotification] = useState(false)
    const [isPushNotification, setIsPushNotification] = useState(false)
    const [isSmsNotifications, setIsSmsNotifications] = useState(false)
    const [isPaayPal, setIsPayPal] = useState(isPayPal)

    const getUserProfile = async () => {
        try {
            setLoading(true)
            const response = await getProfileApi(currentUser?.user_id)
            setUserInfo(response?.data?.data)
            setIsEnabled(response?.data?.data?.marketing_preference)
            setIsEmailNotification(response?.data?.data?.is_email_notification)
            setIsPushNotification(response?.data?.data?.is_push_notification)
            setIsSmsNotifications(response?.data?.data?.is_sms_notification)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [isFocused])

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
        if (isEnabled)
            updateUserMarketingPreference(false)
        else {
            updateUserMarketingPreference(true)
        }
    }

    const updateUserMarketingPreference = async (status) => {

        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('status', status)
            const response = await updateMarketingPreferenceApi(formData)
            setLoading(false)
            Toast.show(response?.data?.message)
        } catch (error) {
            setLoading(false)
            console.log('error==>>', error.response.data)
        }
    }

    const updateNotificationStatus = async (_emailNotification, _pustNotification, _smsNotification) => {
        const formData = new FormData()
        formData.append('is_allow_email', _emailNotification)
        formData.append('is_allow_push', _pustNotification)
        formData.append('is_allow_sms', _smsNotification)
        setLoading(true)
        try {
            const response = await notificationStatusApi(formData)
            Toast.show(response?.data?.message)
        } catch (error) {
            console.log('notification api error===>>', error?.response?.data);
        }
        finally {
            setLoading(false)
        }

    }

    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground
                // resizeMode="contain"
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

                        <View style={Style.bottomInnerainContainer}>
                            <View style={Style.innerHeadingContainer}>
                                <Text style={Style.mainHeading}>
                                    {"Settings"}
                                </Text>
                            </View>
                            <View style={Style.optionsContainer}>
                                <View style={Style.switchContainer}>
                                    <Text style={Style.buttonText}>{'Marketing Preference'}</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: Colors.black }}
                                        thumbColor={isEnabled ? Colors.white : Colors.white}
                                        ios_backgroundColor={Colors.DarkGray}
                                        style={{ alignSelf: 'center' }}
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                </View>
                                <View style={Style.switchContainer}>
                                    <Text style={Style.buttonText}>{'Email Notifications'}</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: Colors.black }}
                                        thumbColor={isEmailNotification ? Colors.white : Colors.white}
                                        ios_backgroundColor={Colors.DarkGray}
                                        style={{ alignSelf: 'center' }}
                                        onValueChange={(value) => {
                                            setIsEmailNotification(!isEmailNotification);
                                            updateNotificationStatus(value, isPushNotification, isSmsNotifications)
                                        }}
                                        value={isEmailNotification}
                                    />
                                </View>
                                <View style={Style.switchContainer}>
                                    <Text style={Style.buttonText}>{'Push Notifications'}</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: Colors.black }}
                                        thumbColor={isPushNotification ? Colors.white : Colors.white}
                                        ios_backgroundColor={Colors.DarkGray}
                                        style={{ alignSelf: 'center' }}
                                        onValueChange={(value) => {
                                            setIsPushNotification(value)
                                            updateNotificationStatus(isEmailNotification, value, isSmsNotifications)
                                        }}
                                        value={isPushNotification}
                                    />
                                </View>
                                <View style={Style.switchContainer}>
                                    <Text style={Style.buttonText}>{'SMS Notifications'}</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: Colors.black }}
                                        thumbColor={isSmsNotifications ? Colors.white : Colors.white}
                                        ios_backgroundColor={Colors.DarkGray}
                                        style={{ alignSelf: 'center' }}
                                        onValueChange={(value) => {
                                            setIsSmsNotifications(value)
                                            updateNotificationStatus(isEmailNotification, isPushNotification, value)
                                        }}
                                        value={isSmsNotifications}
                                    />
                                </View>
                                <View style={Style.switchContainer}>
                                    <Text style={Style.buttonText}>{'Pay Pal Live'}</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: Colors.black }}
                                        thumbColor={isPaayPal ? Colors.white : Colors.white}
                                        ios_backgroundColor={Colors.DarkGray}
                                        style={{ alignSelf: 'center' }}
                                        onValueChange={(value) => {
                                            setIsPayPal(value)
                                            dispatch(payPalLive(value))
                                            // updateNotificationStatus(isEmailNotification, isPushNotification, value)
                                        }}
                                        value={isPaayPal}
                                    />
                                </View>
                                <TouchableOpacity style={Style.buttonContainer}
                                    onPress={() => navigation.navigate('ChangePassword')}
                                >
                                    <Text style={Style.buttonText}>{'Change Password'}</Text>
                                </TouchableOpacity>

                                {/* <TouchableOpacity style={Style.buttonContainer}
                                    onPress={() => navigation.navigate('ChangeEmailScreen')}
                                >
                                    <Text style={Style.buttonText}>{'Change Email'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={Style.buttonContainer}
                                    onPress={() => navigation.navigate('ChangePhoneNo')}
                                >
                                    <Text style={Style.buttonText}>{'Change Phone Number'}</Text>
                                </TouchableOpacity> */}

                                <TouchableOpacity style={Style.buttonContainer}
                                    onPress={() => navigation.navigate('BankDetailsScreen')}
                                >
                                    <Text style={Style.buttonText}>{'Your Virtual Card'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={Style.buttonContainer}
                                    onPress={() => navigation.navigate('DeleteAccountScreen')}
                                >
                                    <Text style={Style.buttonText}>{'Delete my account'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Style.appVersionContainer}>
                                <Text style={Style.appVersionText}>{'Version: 1.0'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    );
};

export default AccountSettings;

