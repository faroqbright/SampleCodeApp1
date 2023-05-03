import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Keyboard,
    Alert
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';

//Libraries
import CheckBox from '@react-native-community/checkbox';
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';

//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';
import Loader from '../../Components/Loader';

// Api Endpoints
import { useSelector } from 'react-redux';
import { sendDrinkApi } from '../../api/methods/auth';


const PaymentScreen = ({ navigation, route }) => {

    const { drinkDetails, totalPrice, selectedVenue, messageInfo, paymentGateway, gPay } = route?.params

    const { currentUser } = useSelector(state => state.userSession)

    const refRBSheet = useRef();

    const isFocused = useIsFocused()

    const [visaPress, setVisaPress] = useState(false)
    const [payPalPress, setPayPalPress] = useState(false)
    const [cardNumber, setCardNumber] = useState('')
    const [cardExpiry, setCardExpiry] = useState('')
    const [cardCvc, setCardCvc] = useState('')
    const [cardHolderName, setCardHolderName] = useState('')
    const [saveCard, setSaveCard] = useState(false)
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

    const keyboardDidShow = () => setIsKeyboardOpen(true)
    const keyboardDidHide = () => setIsKeyboardOpen(false)

    useEffect(() => {
        setVisaPress(true)
        keyboardListner()
        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])


    const keyboardListner = () => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        };
    }

    const checkFields = () => {
        if (cardNumber === '') {
            Toast.show("Please enter your card number!")
        }
        else if (cardExpiry === '') {
            Toast.show("Please enter card expiry date!")
        }
        else if (cardCvc === '') {
            Toast.show("Please enter card cvc number!")
        }
        else if (cardHolderName === '') {
            Toast.show("Please enter your name")
        }
        else {
            SendDrink()
        }
    }

    const SendDrink = async () => {
        // To remove white spaces
        let formatedPhoneNo = ''
        let phoneNo = messageInfo?.senderPhone
        formatedPhoneNo = phoneNo.replace(/\s+/g, '')
        formatedPhoneNo = formatedPhoneNo.replace(formatedPhoneNo.charAt(0), "+")
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('user_id', currentUser?.user_id)
            formData.append('phone', formatedPhoneNo.replace(/-/g, ""))
            formData.append('message', messageInfo?.senderMessage)
            formData.append('name', messageInfo?.senderName)
            formData.append('total_price', totalPrice);
            drinkDetails?.map((item, index) => {
                formData.append(`drink_array[${index}]`, `[{"drink_id": ${item?.id},"quantity": "1"}]`)
            })
            formData.append('image', messageInfo?.messagePhoto)
            formData.append('payment_gateway', 'stripe')
            formData.append('card_number', cardNumber)
            formData.append('expire_date', cardExpiry)
            formData.append('cvv', cardCvc)
            if (selectedVenue?.id) {
                formData.append('venue', selectedVenue?.id)
            }
            else {

                let city = selectedVenue.vicinity;
                city = city.split(',');

                let countryName = selectedVenue?.plus_code?.compound_code
                countryName = countryName.split(',')

                formData.append('venue_name', selectedVenue?.name)
                formData.append('address', selectedVenue?.vicinity)
                formData.append('address_line_2', selectedVenue?.vicinity)
                formData.append('city', city[1])
                formData.append('state', city[1])
                formData.append('country', countryName[1])
                formData.append('latitude', selectedVenue?.geometry?.location?.lat)
                formData.append('longitude', selectedVenue?.geometry?.location?.lng)
                formData.append('place_id', selectedVenue?.place_id)
            }
            // return false
            const response = await sendDrinkApi(formData)
            if (response.status == 200) {
                navigation.navigate('SuccessScreen', {
                    messageInfo: messageInfo?.senderName,
                    drinkDetails: drinkDetails
                })
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            Toast.show(error?.response?.data?.error?.message)
        }
    }

    // const cardExpiryValue = (text) => {
    //     console.log(text);
    //     if (text.length == 2) {
    //         console.log('if');
    //         let a = '/'
    //         let b = text
    //         let result = b.concat(a)
    //         console.log(result);
    //         setCardExpiry(result)
    //     } else if(text.length<=2) {
    //         setCardExpiry(text)
    //     }
    // }


    const setCardInput = (text) => {
        if (/^[0-9 ]*$/.test(text)) {
            if (cardNumber.length == 4 && text.length == 5) {
                if (text.substr(4, 1) != ' ') {
                    text = cardNumber + ' ' + text.substr(4, text.length - 1);
                }
                setCardNumber(text)
            }
            if (cardNumber.length == 9 && text.length == 10) {
                if (text.substr(9, 1) != ' ') {
                    text = cardNumber + ' ' + text.substr(9, text.length - 1);
                }
                setCardNumber(text)
            }
            if (cardNumber.length == 14 && text.length == 15) {
                if (text.substr(14, 1) != ' ') {
                    text = cardNumber + ' ' + text.substr(14, text.length - 1);
                }
                setCardNumber(text)
            }
            if (cardNumber.length == 19 && text.length == 20) {
                if (text.substr(19, 1) != ' ') {
                    text = cardNumber + ' ' + text.substr(19, text.length - 1);
                }
                setCardNumber(text)
            }
            else {
                setCardNumber(text)
            }
        }
    };

    const setExpiryInput = (text) => {
        if (/^[0-9/]*$/.test(text)) {
            if (cardExpiry.length == 2 && text.length == 3) {
                if (text.substr(2, 1) != '/') {
                    text = cardExpiry + '/' + text.substr(2, text.length - 1);
                }
                setCardExpiry(text)
            }
            else {
                setCardExpiry(text)
            }
        }
    };


    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground
                resizeMode='cover'
                style={{ width: '100%', height: '100%' }}
                source={Images.friendsCheering}>
                <View style={Style.shadowContainer}>
                    <Header
                        onProfilePress={() => refRBSheet.current.open()}
                        source={Images.profileAvatar}
                        leftIcon={Images.leftIcon}
                        onNotificationPress={() => navigation.navigate("NotificationScreen")}
                        notificationIcon={Images.NotificationIcon}
                        onPress={() => navigation.goBack()}
                        description={`Total - ${'£'} ${totalPrice}`}
                    />
                    <View style={Style.bottomContainer}>
                        <KeyboardAwareScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                        >
                            <View style={Style.bottomInnerainContainer}>
                                <View style={Style.IconContainer}>

                                    {/* Visa Button */}
                                    {!gPay ? <View style={Style.imageContainer}
                                    >
                                        <Image
                                            style={{
                                                width: 40, height: 40,
                                            }}
                                            source={Images.visaIcon}
                                            resizeMode="contain"
                                        />
                                        <Text style={Style.backSlashText}>{"/"}</Text>
                                        <Image
                                            style={{
                                                width: 40, height: 40,
                                            }}
                                            source={Images.masterCardIcon}
                                            resizeMode="contain"
                                        />
                                    </View>
                                        :
                                        <View style={Style.imageContainer}
                                        >
                                            <Image
                                                style={{
                                                    marginRight: 'auto',
                                                    width: 80, height: 50,
                                                }}
                                                source={Images.gPayIcon}
                                                resizeMode="contain"
                                            />
                                        </View>
                                        // :

                                        // <View style={Style.imageContainer}
                                        // >
                                        //     <Image
                                        //         style={{
                                        //             marginRight: 'auto',
                                        //             width: 80, height: 50,
                                        //         }}
                                        //         source={Images.payPalIcon}
                                        //         resizeMode="contain"
                                        //     />
                                        // </View>
                                    }
                                </View>
                                <View style={Style.inputHeadingContainer}>
                                    <Text style={Style.inputHeading}>{"CARD NUMBER"}</Text>
                                </View>
                                <CustomInput
                                    mainContainer={{ width: '90%' }}
                                    placeholder={'---- ---- ---- ----'}
                                    value={cardNumber}
                                    onChangeText={(text) =>
                                        setCardNumber(text)
                                        // setCardInput(text)
                                    }
                                    maxLength={16}
                                    keyboardType={'numeric'}
                                />

                                <View style={Style.rowContainer}>
                                    <View style={Style.expiryInputContainer}>
                                        <View style={Style.inputHeadingContainer}>
                                            <Text style={Style.expiryInputHeading}>{"EXPIRY"}</Text>
                                            <CustomInput
                                                placeholder={"--/--"}
                                                value={cardExpiry}
                                                onChangeText={(text) => {
                                                    // setCardExpiry(text)
                                                    setExpiryInput(text)
                                                }}
                                                maxLength={5}
                                                keyboardType={'numeric'}
                                                mainContainer={Style.expiryInputField}
                                            />
                                        </View>
                                    </View>
                                    <View style={Style.cvcInputContainer}>
                                        <Text style={Style.expiryInputHeading}>{"CVC"}</Text>
                                        <CustomInput
                                            placeholder={"---"}
                                            value={cardCvc}
                                            onChangeText={(text) => setCardCvc(text)}
                                            maxLength={3}
                                            keyboardType={'numeric'}
                                            mainContainer={Style.expiryInputField}
                                        />
                                    </View>
                                </View>

                                <View style={Style.inputHeadingContainer}>
                                    <Text style={Style.expiryInputHeading}>{"CARDHOLDER NAME"}</Text>
                                </View>
                                <CustomInput
                                    mainContainer={{ width: '90%' }}
                                    placeholder={'Name'}
                                    value={cardHolderName}
                                    onChangeText={(text) => setCardHolderName(text)}
                                />
                                {/* <View style={Style.checkBoxContainer}>
                                    <CheckBox
                                        tintColors={{ true: Colors.blue, false: Colors.LightGray }}
                                        style={Style.checkBoxStyle}
                                        value={saveCard}
                                        onValueChange={(value) => setSaveCard(value)}
                                    />
                                    <Text style={Style.cardText}>{'SAVE CARD'}</Text>
                                </View> */}
                                <CustomButton
                                    onPress={() => {
                                        // gPay ? payWithGoogle() :
                                        checkFields()
                                    }}
                                    disabled={
                                        visaPress ? cardNumber.length > 0 && cardExpiry.length > 0 && cardCvc.length > 0 && cardHolderName && false :
                                            payPalPress ? email.length > 0 && password.length > 0 && false : true
                                    }
                                    mainButtonStyle={
                                        [
                                            Style.payButtonStyle, {
                                                marginTop: isKeyboardOpen ? 20 : 60,
                                                backgroundColor: cardNumber.length > 0 && cardExpiry.length > 0 && cardCvc.length > 0 && cardHolderName ? Colors.blue : 'transparent'
                                            }]}
                                    btnTextStyle={[Style.payButtonTextStyle, {
                                        color: cardNumber.length > 0 && cardExpiry.length > 0 && cardCvc.length > 0 && cardHolderName ? Colors.white : Colors.blue
                                    }]}
                                    label={"PAY NOW"} />
                            </View>
                        </KeyboardAwareScrollView>
                    </View>

                </View>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    height={550}
                    // openDuration={3000}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent",
                            // backgroundColor:'red',
                            height: '80%',
                            // marginTop:80,
                            // marginBottom:80,
                            // minClosingHeight:100,
                            borderRadius: 25,
                            // borderColor:'transparent',
                            // borderWidth: 1,
                            // borderColor: 'red',
                            width: '100%',
                            alignSelf: 'center'
                        },
                        container: {
                            alignSelf: 'center',
                            // backgroundColor:"red",
                            // borderRadius: 20,
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
            </ImageBackground >
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView >
    );
};

export default PaymentScreen;


