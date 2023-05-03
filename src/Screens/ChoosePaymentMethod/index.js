import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    Alert,
    Platform,
    Modal,
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';

//Libraries
import CheckBox from '@react-native-community/checkbox';
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from 'react-native-simple-toast';
import { useGooglePay } from '@stripe/stripe-react-native';
// import WebView from 'react-native-webview';
import { WebView } from 'react-native-webview';
import queryString from 'query-string';


//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';
import base64 from 'base-64'

//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';
import Loader from '../../Components/Loader';
// import PayPal from '../../Components/PayPal';

// API Endpoints
import { getCommission } from '../../api/methods/auth';
import { sendDrinkApi } from '../../api/methods/auth';
import { Row } from 'native-base';
import { useSelector } from 'react-redux';


const ChoosePaymentMethod = ({ navigation, route }) => {
    const { drinkDetails, totalPrice, selectedVenue, messageInfo } = route?.params
    const { isPayPal } = useSelector(state => state.userSession)

    const {
        isGooglePaySupported,
        initGooglePay,
        presentGooglePay,
        createGooglePayPaymentMethod
    } = useGooglePay();

    const refRBSheet = useRef();

    const isFocused = useIsFocused()

    const allowedCardNetworks = ['VISA', 'MASTERCARD'];
    const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

    const [visaPress, setVisaPress] = useState(false)
    const [stripe, setStripe] = useState(false)
    const [googlePay, setGooglePay] = useState(true)
    const [loading, setLoading] = useState(false)
    const [totalAmount, setTotalAmount] = useState('')
    const [transactionFee, setTransactionFee] = useState('')
    const [tansFee, setTransFee] = useState(null)
    const [payPalUri, setpayPalUri] = useState("")
    const [accessToken, setAccessToken] = useState(null)
    const [payPalResponse, setPayPalResponse] = useState('')


    useEffect(() => {
        if (!isFocused)
            refRBSheet.current.close()
        getAdminComission()
        if (isFocused && Platform.OS !== 'ios') {
            googlePaySupportCheck()
        }
    }, [isFocused])

    //paypal Methods

    let baseUrl = "https://api-m.sandbox.paypal.com"

    // Old Keys
    // let ClientId = "AcPuXt_QvN1kp36SNTn4JeQtYrpzfwKIHvLJu5ckhqKfbL7rgSzBRfeRMgr-Pbxd5K_f36kKPCX825tS"
    // let secretkey = "EKKh5xNHUnI_kKaF4MocGwN2Xh3vFPADhird_VM_vPKJFdoaCSjbO79NfsgYL5vL7lWNOspexal1NE2Q"

    // New Keys
    let ClientId = isPayPal ? "AR5XPR25X8R9xpXqydc-7kE2f97-h_1tUiHvIhd1j1-FmUEdWjVjYRk53M0ZMDnDeVrXNWUMPnHdhn1b"
        : "AcPuXt_QvN1kp36SNTn4JeQtYrpzfwKIHvLJu5ckhqKfbL7rgSzBRfeRMgr-Pbxd5K_f36kKPCX825tS"

    let secretkey = isPayPal ? "EFVEmUkS2MuqSjiDej6XQmUArmWEA6yWChLuVBWbm6UNvpNh7Mczwbe3_1RKFR_0J4ab0y3uUK7czS_i"
        : "EKKh5xNHUnI_kKaF4MocGwN2Xh3vFPADhird_VM_vPKJFdoaCSjbO79NfsgYL5vL7lWNOspexal1NE2Q"

    let orderDetail = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "items": [
                    {
                        "name": "Drink",
                        "description": "Green XL",
                        "quantity": "1",
                        "unit_amount": {
                            "currency_code": "GBP",
                            "value": totalAmount
                        }
                    }
                ],
                "amount": {
                    "currency_code": "GBP",
                    "value": totalAmount,
                    "breakdown": {
                        "item_total": {
                            "currency_code": "GBP",
                            "value": totalAmount
                        }
                    }
                }
            }
        ],
        "application_context": {
            "return_url": "https://example.com/return",
            "cancel_url": "https://example.com/cancel"
        }
    }

    const generateToken = () => {
        var headers = new Headers()
        headers.append("Content-Type", "application/x-www-form-urlencoded")
        headers.append("Authorization", "Basic " + base64.encode(`${ClientId}:${secretkey}`));

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: "grant_type=client_credentials",

        };

        return new Promise((resolve, reject) => {
            fetch(baseUrl + '/v1/oauth2/token', requestOptions).then(response => response.text()).then(result => {

                console.log("result print", result)

                const { access_token } = JSON.parse(result)
                resolve(access_token)
            })

                .catch(error => {
                    console.log("error raised ", error)
                    reject(error)
                })
        })

    }

    const createOrder = (token = "", props) => {

        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify(orderDetail),

        };

        return new Promise((resolve, reject) => {
            fetch(baseUrl + '/v2/checkout/orders', requestOptions).then(response => response.text()).then(result => {
                console.log("result print", result)

                const res = JSON.parse(result)
                resolve(res)
            })

                .catch(error => {
                    console.log("error raised ", error)
                    reject(error)
                })
        })
    }



    const capturePayment = (id, token = "") => {

        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },


        };

        return new Promise((resolve, reject) => {
            fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions).then(response => response.text()).then(result => {
                console.log("result print", result)
                const res = JSON.parse(result)
                resolve(res)
                setPayPalResponse(res)
                console.log("neww res=-=-=-", res);

                SendDrink(res)
            })

                .catch(error => {
                    console.log("error raised ", error)
                    reject(error)
                })
        })
    }



    const googlePaySupportCheck = async () => {
        if (!(await isGooglePaySupported({ testEnv: true }))) {
            Alert.alert('Google Pay is not supported.');
            return;
        }

        const { error } = await initGooglePay({
            testEnv: true,
            merchantName: 'Google',
            countryCode: 'US',
            billingAddressConfig: {
                format: 'FULL',
                isPhoneNumberRequired: false,
                isRequired: false,
            },
            existingPaymentMethodRequired: false,
            isEmailRequired: false,
        });

        if (error) {
            Alert.alert(error.code, error.message);
            return;
        }
    }

    const getAdminComission = async () => {
        let amountWithAdminComission = 0
        setLoading(true)
        try {
            const response = await getCommission()
            amountWithAdminComission = response?.data?.data
            setTransactionFee(response?.data?.data)
            amountWithAdminComission = (parseFloat((totalPrice / response?.data?.data))) + (parseFloat(totalPrice))
            setTotalAmount(amountWithAdminComission)

        } catch (error) {
            console.log('error==>>', error);
        }
        finally {
            setLoading(false)
        }
    }

    const SendDrink = async (res) => {
        console.log("CHECKhasvdhav");
        // return
        // To remove white spaces
        // let formatedPhoneNo = ''
        // let phoneNo = messageInfo?.senderPhone
        // formatedPhoneNo = phoneNo.replace(/\s+/g, '')
        // formatedPhoneNo = formatedPhoneNo.replace(formatedPhoneNo.charAt(0), "+")
        try {
            setLoading(true)
            const formData = new FormData()
            //formData.append('user_id', currentUser?.user_id)
            // formData.append('total_price', totalPrice);
            formData.append('place_id', 1);
            formData.append('longitude', 1);
            formData.append('latitude', 1);
            formData.append('country', 1);
            formData.append('address', "Address");
            formData.append('venue', 1);
            formData.append('payment_gateway', "paypal");
            formData.append('total_price', totalAmount);
            formData.append('phone', (messageInfo?.senderPhone).replace(/\s/g, ''));//formatedPhoneNo.replace(/-/g, ""));
            formData.append('phone_code', messageInfo?.countryCode);
            formData.append('message', messageInfo?.senderMessage);
            formData.append('name', messageInfo?.senderName);
            formData.append('drink_array[0][drink_id]:', 1);
            formData.append('drink_array[0][quantity]:', 1);
            formData.append('amount', totalAmount);
            formData.append('transition_id', res?.id);
            formData.append('paypal_fees', 5);
            formData.append('commission', 1);
            // formData.append('phone_code', 44);
            // drinkDetails?.map((item, index) => {
            //     formData.append(`drink_array[${index}]`, `[{"drink_id": ${item?.id},"quantity": "1"}]`)
            // })
            // formData.append('image', messageInfo?.messagePhoto)
            // formData.append('payment_gateway', 'Paypal')
            // formData.append('card_number', cardNumber)
            // formData.append('expire_date', cardExpiry)
            // formData.append('cvv', cardCvc)
            // if (selectedVenue?.id) {
            //     formData.append('venue', selectedVenue?.id)
            // }
            // else {

            //     let city = selectedVenue.vicinity;
            //     city = city.split(',');

            //     let countryName = selectedVenue?.plus_code?.compound_code
            //     countryName = countryName.split(',')

            //     formData.append('venue_name', selectedVenue?.name)
            //     formData.append('address', selectedVenue?.vicinity)
            //     formData.append('address_line_2', selectedVenue?.vicinity)
            //     formData.append('city', city[1])
            //     formData.append('state', city[1])
            //     formData.append('country', countryName[1])
            //     formData.append('latitude', selectedVenue?.geometry?.location?.lat)
            //     formData.append('longitude', selectedVenue?.geometry?.location?.lng)
            //     formData.append('place_id', selectedVenue?.place_id)
            // }
            // return false
            console.log("FORMDATA CONSOLE", JSON.stringify(formData));

            const response = await sendDrinkApi(formData)
            console.log("CHECK RESPO", response?.data);
            if (response.status == 200) {
                navigation.navigate('SuccessScreen', {
                    messageInfo: messageInfo?.senderName,
                    drinkDetails: drinkDetails
                })
                alert("Thank You!! Your Order is on its way")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)

            Toast.show(error?.response?.data?.error?.message)
            console.log("Console Error", error);
        }
    }



    const onPayPress = async () => {
        setLoading(true)
        try {
            const token = await generateToken()
            const res = await createOrder(token,)
            setAccessToken(token)
            console.log("Response=====", res);

            if (!!res?.links) {

                const findUrl = res.links.find(data => data?.rel == "approve")
                console.log("findUrl?.href --- ====>====>", findUrl);
                setpayPalUri(findUrl?.href);
                // console.log("Ppppp", payPalUri);
            }
        }
        catch (error) {
            console.log('error', error)
        }
        finally {
            setLoading(false)
        }

        // if (!stripe && !googlePay) {
        //     Toast.show("Please select payment method!")
        // }
        // else if (stripe) {
        //     navigation.navigate("PaymentScreen", {
        //         drinkDetails: drinkDetails,
        //         totalPrice: totalAmount,
        //         selectedVenue: selectedVenue,
        //         messageInfo: messageInfo,
        //         paymentGateway: visaPress ? 'visa' : 'paypal',
        //         gPay: false
        //     })
        // }
        // else {
        //     payWithGoogle()
        // }
    }
    // console.log("payPalUri=====", payPalUri);
    const payWithGoogle = async () => {
        if (Platform.OS === 'android') {
            const { error, paymentMethod } = await createGooglePayPaymentMethod({
                amount: totalPrice,
                currencyCode: 'USD',
            });

            if (error) {
                Alert.alert(error.code, error.message);
                return;
            } else if (paymentMethod) {
                Alert.alert(
                    'Success',
                    `The payment method was created successfully. paymentMethodId: ${paymentMethod.id}`
                );
                navigation.navigate('Home')
            }
        }
        else {
            Toast.show("Google pay is not supported")
        }
    };
    const onUrlChange = (webViewState) => {
        // console.log("webViewState===", webViewState);
        if (webViewState.url.includes('https://example.com/cancel')) {
            clearPaypalState()
            alert("Payment Cancelled")
            return;
        }
        if (webViewState.url.includes('https://example.com/return')) {
            const uriValues = queryString.parseUrl(webViewState.url)
            console.log("uriValues===>>>", uriValues);
            const { token } = uriValues.query
            if (!!token) {
                paymentSuccess(token)
            }
        }
    }

    const paymentSuccess = async (id) => {
        try {
            const res = capturePayment(id, accessToken)
            console.log("REs===========>", JSON.stringify(res.id))
            alert("Payment Success")
            // SendDrink(payPalResponse)
            clearPaypalState()

        } catch (error) {
            console.log("Error raised in payment capture");
        }
    }


    const clearPaypalState = () => {
        setpayPalUri(null)
        setAccessToken(null)
        // alert("Payment Cancelled")
    }
    // console.log("payPalUri++++" , payPalUri);

    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground
                style={{ width: '100%', height: '100%' }}
                source={Images.friendsCheering}>
                <View style={Style.shadowContainer}>
                    <Header
                        onProfilePress={() => refRBSheet.current.open()}
                        source={Images.profileAvatar}
                        notificationIcon={Images.NotificationIcon}
                        onNotificationPress={() => navigation.navigate("NotificationScreen")}
                        leftIcon={Images.leftIcon}
                        onPress={() => navigation.goBack()}
                    // description={`Total -${'$'}${totalAmount}`}
                    />
                    <View style={Style.pricContainer}>
                        <Text style={Style.priceText}>{`Transaction Details`}</Text>
                        <ScrollView style={{ width: '100%', height: "100%", paddingVertical: 20 }}>

                            {drinkDetails.map((item) => {
                                return (
                                    <View style={Style.priceRowContainer}>
                                        <Text style={Style.priceDetailText}>{item?.name}</Text>
                                        <Text style={Style.priceDetailText}>{`£ ${item?.price}`}</Text>
                                    </View>
                                )
                            })}
                            <View style={{ height: 30, marginVertical: 20 }}></View>
                        </ScrollView>
                        <View style={[Style.priceRowContainer, { marginTop: 20, borderTopWidth: 1, borderColor: Colors.LightGray, paddingTop: 10 }]}>
                            <Text style={Style.priceDetailText}>{"Sub Total:"}</Text>
                            <Text style={Style.priceDetailText}>{`£ ${totalPrice}`}</Text>
                        </View>
                        <View style={Style.priceRowContainer}>
                            <Text style={Style.priceDetailText}>{"Transaction Fee:"}</Text>
                            <Text style={Style.priceDetailText}>{`% ${transactionFee}`}</Text>
                        </View>
                        <View style={[Style.priceRowContainer, { paddingBottom: 10 }]}>
                            <Text style={Style.priceDetailText}>{"Total:"}</Text>
                            <Text style={Style.priceDetailText}>{`£ ${totalAmount}`}</Text>
                        </View>
                    </View>
                    <View style={Style.bottomContainer}>
                        <View style={Style.bottomInnerainContainer}>
                            {/* <View style={Style.visaContainer}>
                                <View style={Style.visaCardImageContainer}>
                                    <Image
                                        resizeMode='contain'
                                        style={Style.visaImage}
                                        source={Images.visaIcon}
                                    />
                                    <Text style={Style.backSlashText}>{"/"}</Text>
                                    <Image
                                        resizeMode='contain'
                                        style={Style.visaImage}
                                        source={Images.masterCardIcon}
                                    />
                                </View>
                                <CheckBox

                                    tintColors={{ true: Colors.blue, false: Colors.LightGray }}
                                    style={Style.checkBoxStyle}
                                    value={stripe}
                                    onValueChange={(value) => {
                                        if (googlePay) {
                                            setGooglePay(false)
                                            setStripe(value)
                                        }
                                        else {
                                            setStripe(value)
                                        }
                                    }}
                                />
                            </View>
                                
                            <View style={Style.visaContainer}>
                                <View style={Style.visaCardImageContainer}>
                                    <Image
                                        resizeMode='contain'
                                        style={Style.gPayImage}
                                        source={Images.gPayIcon}
                                    />
                                </View>
                                <CheckBox

                                    tintColors={{ true: Colors.blue, false: Colors.LightGray }}
                                    style={[Style.checkBoxStyle, { marginTop: 18 }]}
                                    value={googlePay}
                                    onValueChange={(value) => {
                                        if (stripe) {
                                            setStripe(false)
                                            setGooglePay(value)
                                        }
                                        else {
                                            setGooglePay(value)
                                        }
                                    }}
                                />
                            </View> */}
                            <View style={Style.payPalContainer}>
                                <View style={Style.payPalImageContainer}>
                                    <Image
                                        resizeMode='contain'
                                        style={Style.payPalImage}
                                        source={Images.payPalIcon}
                                    />
                                </View>
                                <CheckBox
                                    disabled={true}
                                    tintColors={{ true: Colors.blue, false: Colors.LightGray }}
                                    style={[Style.checkBoxStyle, { marginTop: 18 }]}
                                    value={googlePay}
                                    onValueChange={(value) => {
                                        if (stripe) {
                                            setStripe(false)
                                            setGooglePay(value)
                                        }
                                        else {
                                            setGooglePay(value)
                                        }
                                    }}
                                />
                            </View>
                            <CustomButton
                                onPress={() => {
                                    onPayPress()
                                    // SendDrink()
                                }}
                                mainButtonStyle={[Style.payButtonStyle, { backgroundColor: Colors.blue }]}
                                btnTextStyle={[Style.payButtonTextStyle, { color: Colors.white }]}
                                label={"PAY NOW WITH PAYPAL"}

                            />

                            <Modal
                                visible={!!payPalUri}
                            >
                                <TouchableOpacity
                                    style={{ margin: 20, flexDirection: 'row' }}
                                    onPress={clearPaypalState}
                                >
                                    <Image
                                        source={Images.crossIcon}
                                        style={{ tintColor: Colors.DarkBlue, width: 25, height: 25 }}
                                        resizemode='contain'
                                    />
                                    {/* <Text style={{color:'black'}} >Close</Text> */}

                                </TouchableOpacity>
                                <View style={{ flex: 1, backgroundColor: 'red' }}>

                                    <WebView
                                        source={{ uri: payPalUri }}
                                        onNavigationStateChange={onUrlChange}
                                    />


                                    {/* <Text style={{ fontSize: 12, color: "black", alignSelf: "center", marginTop: '20%' }}>{payPalUri}</Text> */}
                                </View>
                            </Modal>
                        </View>
                    </View>
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
        </SafeAreaView>
    );
};

export default ChoosePaymentMethod;


