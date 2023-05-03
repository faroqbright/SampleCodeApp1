import React, {
    useState,
    useRef,
    useEffect
} from 'react';


import {
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    ScrollView
} from 'react-native';

// Libraries
import RBSheet from "react-native-raw-bottom-sheet";
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast'

//Files
import Style from './Style';
import Colors from '../../Utils/Colors';
import Images from '../../Assets/Images';

// Components
import Header from '../../Components/Header';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';
import Loader from '../../Components/Loader';
import CardModal from '../../Components/CardModal';

// Api endpoints
import { redeemGift, getProfileApi, logoutAPI, issueCardDetails } from '../../api/methods/auth';
import { useSelector } from 'react-redux';


const RecieveScreen = ({ navigation, route }) => {


    const refRBSheet = useRef();

    const isFocused = useIsFocused()

    const { selectedDrinkId, drinkInfo, newPhoneNumber } = route?.params

    const { currentUser } = useSelector(state => state.userSession)

    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [cardInfo, setCardInfo] = useState('')

    useEffect(() => {
        getUserProfile()
        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])

    const onFinishPress = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('order_id', selectedDrinkId[0]?.id)
            formData.append('phone', newPhoneNumber)
            console.log("Receive drink form data", formData);
            const response = await redeemGift(formData)
            console.log("Redeem___Gift", response);
            setLoading(false)
            // Toast.show(response.data.message)
            console.log("response-----", JSON.stringify(response));
            if (response.status == 200 && drinkInfo.venue !== null) {
                // IssueCard()
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }]
                })
            }
        } catch (error) {
            setLoading(false)
            if (error?.response?.data?.error_type) {
                //Toast.show(error?.response?.data?.message)
                console.log("Errorif-----", error)
                navigation.navigate('ProfileScreen')
            }
            else {
                // Toast.show(error?.response?.data?.error?.message)
                console.log("Errorelse-----", error)

            }
            console.log('redeem gift error==>>', error?.response?.data);
        }
    }

    const IssueCard = async () => {
        try {
            setLoading(true)
            const response = await issueCardDetails(currentUser?.access_token)
            setCardInfo(response.data.data)
            setIsVisible(true)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('error-==>>', error);
        }
    }

    const getUserProfile = async () => {
        try {
            const response = await getProfileApi(currentUser?.user_id)
            setUserInfo(response.data.data)
        } catch (error) {
            if (error.response.data.error.message == "Token has been expired.") {
                logoutUserSession()
            }
        }
    }

    const logoutUserSession = async () => {
        try {
            const response = await logoutAPI()
            if (response.status == 200) {
                dispatch(logoutUser())
                // Toast.show(response?.data?.message)
                console.log("Error__res-----", response)

            }
        } catch (error) {
            Toast.show('Something went wrong!')
        }
    }



    return (
        <SafeAreaView style={Style.mainContainer}>
            <ScrollView
            >
                <ImageBackground source={Images.friendsCheering}>
                    <View style={Style.shadowContainer}>
                        <Header
                            headerStyle={{ marginTop: 5 }}
                            source={userInfo ? { uri: userInfo.profile_picture } : Images.profileAvatar}
                            onProfilePress={() => refRBSheet.current.open()}
                            // description={}
                            onPress={() => navigation.goBack()}
                            leftIcon={Images.leftIcon}
                        />
                        <View style={Style.descriptionContainer}>
                            <Text style={[Style.messageText, { textAlign: 'center' }]}>
                                {`You have received a gift of ${selectedDrinkId[0]?.drinks.length > 0 ? selectedDrinkId[0]?.drinks[0]?.drink_name : "drink"} from `}
                                <Text style={[Style.messageText, { textAlign: 'center', textDecorationLine: 'underline' }]}>{`${selectedDrinkId[0]?.from_user?.first_name + ' ' + selectedDrinkId[0]?.from_user?.last_name},`}</Text>
                                <Text style={[Style.messageText, { textAlign: 'center' }]}>
                                    {` ${selectedDrinkId[0]?.venue?.name == null && selectedDrinkId[0]?.venue?.city == null ? "who suggests you redeem it " : "who suggests you redeem it at"} ${selectedDrinkId[0]?.venue?.name == null ? ' ' : selectedDrinkId[0]?.venue?.name}${selectedDrinkId[0]?.venue?.name == null ? " " : ","} ${selectedDrinkId[0]?.venue?.city == null ? ' ' : selectedDrinkId[0]?.venue?.city}${selectedDrinkId[0]?.venue?.city == null ? "" : ","} ${selectedDrinkId[0]?.venue?.country == null ? ' ' : selectedDrinkId[0]?.venue?.country}`}</Text>
                            </Text>
                        </View>
                        <View style={Style.rowContainer}>
                            <Text style={Style.messageText}>{selectedDrinkId[0]?.message}</Text>
                        </View>
                        <View style={Style.QRCodeContainer}>
                            <Image
                                resizeMode='contain'
                                source={selectedDrinkId[0]?.image !== null ? { uri: selectedDrinkId[0]?.image } : Images.drinksPlaceHolder}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View>
                        <View style={Style.priceContainer}>
                            <Text style={Style.priceText}>{"Gift Value" + " " + selectedDrinkId[0]?.net_price_receiving}</Text>
                        </View>
                        <CustomButton
                            label={"REDEEM DRINK"}
                            mainButtonStyle={Style.finishButtonStyle}
                            onPress={() =>
                                onFinishPress()}

                        />
                        <RBSheet
                            ref={refRBSheet}
                            closeOnDragDown={true}
                            closeOnPressMask={false}
                            height={550}
                            customStyles={{
                                wrapper: {
                                    backgroundColor: "transparent",
                                    height: '80%',
                                    width: '100%',
                                    alignSelf: 'center'
                                },
                                container: {
                                    alignSelf: 'center',
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    height: '70%',
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
                    </View>
                    <CardModal
                        isVisible={isVisible}
                        label={"Card Information"}
                        cardInfo={cardInfo}
                        onPress={() => {
                            setIsVisible(false)
                            navigation.navigate('MessageSent', {
                                selectedDrinkId: selectedDrinkId
                            })
                            // navigation.navigate('ClaimADrink', { orderId: selectedDrinkId[0]?.drinks[0]?.order_id })
                        }}
                    />
                    <Loader loading={loading} isShowIndicator={true} />
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RecieveScreen;

