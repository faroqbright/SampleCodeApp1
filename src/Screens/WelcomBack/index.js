import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    SafeAreaView,
} from 'react-native'

// Libraries
import { useIsFocused } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from 'react-native-simple-toast'

// Files
import Style from './Style'
import Images from '../../Assets/Images'
import Colors from '../../Utils/Colors'

// Components
import CustomButton from '../../Components/CustomButton'
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';

// Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { ScreenName, logoutUser } from '../../redux/actions/userSession'

// API Endpoints
import { getProfileApi, logoutAPI } from '../../api/methods/auth';

const WelecomeBack = ({ navigation }) => {

    const { currentUser, fcmToken } = useSelector(state => state.userSession)

    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const refRBSheet = useRef();

    const [selectedButton, setSelectedButton] = useState('')
    const [userInfo, setUserInfo] = useState('')
    const [loading, setLoading] = useState(false)

    const getUserProfile = async () => {
        try {
            setLoading(true)
            const response = await getProfileApi(currentUser?.user_id)
            setUserInfo(response.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error?.response?.data?.error?.message == "Token has been expired.") {
                Toast.show(error?.response?.data?.error?.message)
                logoutUserSession()
            }
        }
    }

    const logoutUserSession = async () => {
        try {
            const response = await logoutAPI()
            if (response.status == 200) {
                dispatch(logoutUser())
                Toast.show(response?.data?.message)
            }
        } catch (error) {
            Toast.show("Session Expired")
            dispatch(logoutUser())
        }
    }

    useEffect(() => {
        getUserProfile()
        dispatch(ScreenName(''))
        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])

    return (
        <SafeAreaView style={Style.mainContainer}>
            <ScrollView contentContainerStyle={{
                flex: 1
            }}>
                <ImageBackground
                    style={{ width: '100%', height: '100%' }}
                    source={Images.Splash}
                >
                    <View style={Style.shadowContainer}>
                        <View style={Style.profileButtonContainer}>
                            <TouchableOpacity style={Style.notificationButton}
                                onPress={() => navigation.navigate('NotificationScreen')}
                            >
                                <Image
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: Colors.white
                                    }}
                                    source={Images.NotificationIcon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={Style.profileButton}
                                onPress={() => refRBSheet.current.open()}
                            >
                                <Image
                                    resizeMode='cover'
                                    style={{ width: 50, height: 50, borderRadius: 100 }}
                                    source={userInfo ? { uri: userInfo.profile_picture } : Images.profileAvatar}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.headingContainer}>
                            <Text style={Style.mainHeading}>{"Skoll!"}</Text>
                            <Text style={Style.subHeading}>{"Welcome back"}</Text>
                        </View>
                        <Text style={Style.descriptionStyle}>{"What would you like to do?"}</Text>
                        <CustomButton
                            onPress={() => {
                                setSelectedButton('SEND A DRINK')
                            }}
                            mainButtonStyle={
                                [Style.drinkButtonStyle,
                                {
                                    backgroundColor: selectedButton == 'SEND A DRINK' ? Colors.blue : 'transparent',
                                    borderColor: selectedButton == 'SEND A DRINK' ? Colors.blue : Colors.white
                                }]
                            }
                            label={"SEND A GIFT"}
                        />
                        <CustomButton
                            onPress={() => {
                                setSelectedButton('CLAIM A DRINK')
                            }}
                            mainButtonStyle={
                                [Style.drinkButtonStyle,
                                {
                                    backgroundColor: selectedButton == 'CLAIM A DRINK' ? Colors.blue : 'transparent',
                                    borderColor: selectedButton == 'CLAIM A DRINK' ? Colors.blue : Colors.white
                                }]
                            }
                            label={"CLAIM A GIFT"}
                        />
                        <CustomButton
                            onPress={() => {
                                setSelectedButton('EXPLORE VENUES')
                            }}
                            mainButtonStyle={
                                [Style.drinkButtonStyle,
                                {
                                    backgroundColor: selectedButton == 'EXPLORE VENUES' ? Colors.blue : 'transparent',
                                    borderColor: selectedButton == 'EXPLORE VENUES' ? Colors.blue : Colors.white
                                }]
                            }
                            label={"EXPLORE VENUES"}
                        />
                        {/* <CustomButton
                            onPress={() => {
                                setSelectedButton('EXPLORE OFFERS')
                            }}
                            mainButtonStyle={
                                [Style.drinkButtonStyle,
                                {
                                    backgroundColor: selectedButton == 'EXPLORE OFFERS' ? Colors.blue : 'transparent',
                                    borderColor: selectedButton == 'EXPLORE OFFERS' ? Colors.blue : Colors.white
                                }]
                            }
                            label={"EXPLORE OFFERS"}
                        /> */}
                        <CustomButton
                            onPress={() => {
                                setSelectedButton('SEARCH OFFERS')
                            }}
                            mainButtonStyle={
                                [Style.drinkButtonStyle,
                                {
                                    backgroundColor: selectedButton == 'SEARCH OFFERS' ? Colors.blue : 'transparent',
                                    borderColor: selectedButton == 'SEARCH OFFERS' ? Colors.blue : Colors.white
                                }]
                            }
                            label={"SEARCH OFFERS"}
                        />

                        <CustomButton
                            onPress={() => {
                                if (selectedButton === 'SEND A DRINK') {
                                    navigation.navigate('Send', { name: false })
                                }
                                else if (selectedButton === 'CLAIM A DRINK') {
                                    navigation.navigate('Redeem')
                                }
                                else if (selectedButton === 'EXPLORE VENUES') {
                                    navigation.navigate('Venues')
                                }
                                else if (selectedButton === 'EXPLORE OFFERS') {
                                    navigation.navigate('Send', { name: true })
                                }
                                else if (selectedButton === 'SEARCH OFFERS') {
                                    navigation.navigate('Send', { searchOffers: true, name: false })
                                }
                            }}
                            mainButtonStyle={
                                [Style.continueButtonStyle, {
                                    backgroundColor: selectedButton == 'SEND A DRINK' || selectedButton == 'CLAIM A DRINK' || selectedButton == 'EXPLORE OFFERS' || selectedButton == 'EXPLORE VENUES' || selectedButton == 'SEARCH OFFERS' ? Colors.green : 'transparent',
                                    borderColor: selectedButton == 'SEND A DRINK' || selectedButton == 'CLAIM A DRINK' || selectedButton == 'EXPLORE OFFERS' || selectedButton == 'EXPLORE VENUES' || selectedButton == 'SEARCH OFFERS' ? Colors.green : Colors.white
                                }]
                            }
                            label={"CONTINUE"}
                        />
                    </View>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        height={550}
                        customStyles={{
                            wrapper: {
                                backgroundColor: "transparent",
                                height: '80%',
                                borderRadius: 25,
                                width: '100%',
                                alignSelf: 'center'
                            },
                            container: {
                                alignSelf: 'center',
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                height: '80%',
                                width: '100%'
                            },
                            draggableIcon: {
                                backgroundColor: "black"
                            }
                        }}
                    >
                        <UserProfileBSComponent
                            navigation={navigation}
                        />

                    </RBSheet>
                </ImageBackground>
                <Loader loading={loading} isShowIndicator={true} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default WelecomeBack;


