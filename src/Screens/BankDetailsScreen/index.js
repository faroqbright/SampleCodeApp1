import React, {
    useEffect,
    useRef, useState
} from 'react'
import {
    SafeAreaView,
    View,
    Text,
    ImageBackground,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native'

// Libraries
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from 'react-native-simple-toast'
import { useIsFocused } from '@react-navigation/native';

// Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';

// Components
import Header from '../../Components/Header';
import PaymentBSComponent from '../../Components/PaymentBSComponent'
import Loader from '../../Components/Loader';

// API Endpoints
import { issueCardDetails } from '../../api/methods/auth';

const DATA = [
    {
        id: '1',
        name: 'Account 1',
        type: 'Paypal',
        image: Images.payPalIcon,
        cardNumber: 'xxxxxxxxxxx42',
        expiry: '3/25',
        cvc: '545',
        cardholderName: 'JOHN DOE'
    },
    {
        id: '2',
        name: 'Account 2',
        type: 'Visa',
        image: Images.visaIcon,
        cardNumber: 'xxxxxxxxxxx46',
        expiry: '2/22',
        cvc: '112',
        cardholderName: 'MARK WELBERG'
    },
    {
        id: '3',
        name: 'Account 3',
        type: 'MasterCard',
        image: Images.payPalIcon,
        cardNumber: 'xxxxxxxxxxx12',
        expiry: '3/23',
        cvc: '123',
        cardholderName: 'JOHN SMITH'
    },
]

const BankDetailsScreen = ({ navigation }) => {

    const refRBSheet = useRef();
    const isFocused = useIsFocused()

    const [cardValue, setCardValue] = useState('')
    const [cvcValue, setCvcValue] = useState('')
    const [expiryValue, setExpiryValue] = useState('')
    const [cardHolderValue, setCardHolderValue] = useState('')
    const [saveCard, setSaveCard] = useState(false)
    const [cardInfo, setCardInfo] = useState('')
    const [loading, setLoading] = useState(false)
    const [cardNumber, setCardNumber] = useState('')

    useEffect(() => {
        getCardDetails()
        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])

    const getCardDetails = async () => {
        setLoading(true)
        try {
            const response = await issueCardDetails()
            setCardInfo(response?.data?.data)
            if(response?.data?.data?.number){
                SetCardInput(response?.data?.data?.number)
            }
        } catch (error) {
            console.log('card details api errror===>>', error);
        } finally {
            setLoading(false)
        }
    }

    const checkValues = () => {
        if (cardValue === '') {
            Toast.show('Card Number is required')
        }
        else if (expiryValue === '') {
            Toast.show("Card Expiry is required")
        }
        else if (cvcValue === '') {
            Toast.show("Card Cvc is required ")
        }
        else if (cardHolderValue === '') {
            Toast.show('Cardholder Name is required')
        }
        else {
            refRBSheet.current.close()
            Toast.show("Card information added")
        }
    }

    const SetCardInput = (text) => {
        let newString
        newString = text.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
        setCardNumber(newString)
    };



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
                            description={"Virtual Card Details"}
                            headerStyle={Style.headerStyle}
                            leftIcon={Images.leftIcon}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <View style={Style.bottomContainer}>
                        <View style={Style.headinContainer}>
                            <Text style={Style.headingText}>{"Virtual Card"}</Text>
                        </View>
                        <View style={{ width: '100%', marginTop: 15, alignItems: 'center', justifyContent: 'center', }}>
                            {(cardInfo !== '' && cardNumber !== '') ? <View View style={Style.container}>
                                <View style={Style.cardContainer}>
                                    <Text style={Style.cardNumberHeading}>{"Card Number"}</Text>
                                    <Text style={Style.cardNumber}>{cardNumber}</Text>

                                    <View style={Style.cvcRowContainer}>
                                        <View style={{ width: 90, }}>
                                            <Text style={Style.cardNumberHeading}>{"CVC"}</Text>
                                            <Text style={Style.expiryText}>{cardInfo?.cvc}</Text>
                                        </View>
                                        <View style={{ width: 90, justifyContent: 'center' }}>
                                            <Text style={Style.cardNumberHeading}>{"Expiry"}</Text>
                                            {<Text style={Style.expiryText}>{"0" + cardInfo?.exp_month + "/" + cardInfo?.exp_year}</Text>}
                                        </View>
                                    </View>

                                    <View style={Style.rowContainer}>
                                        <Text style={Style.cardNumberHeading}>{"Available Balance:"}</Text>
                                        <Text style={Style.balanceText}>{cardInfo?.available_balance}</Text>
                                        <View style={Style.imageContainer}>
                                            <Image
                                                style={Style.visaImage}
                                                source={Images.visaIcon}
                                                resizeMode={"contain"}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View> :
                                <Text style={Style.emptyComponentMessageText}>{"You do not have a virtual card yet!"}</Text>
                            }
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
                        <PaymentBSComponent
                            cardInfo={cardInfo}

                            cardValue={cardValue}
                            onCardNumberText={(text) => setCardValue(text)}

                            expiryValue={expiryValue}
                            onExpiryText={(text) => setExpiryValue(text)}

                            cvcValue={cvcValue}
                            onCVCText={(text) => setCvcValue(text)}

                            cardHolderValue={cardHolderValue}
                            onCardHolderText={(text) => setCardHolderValue(text)}

                            tintColors={{ true: Colors.blue, false: Colors.LightGray }}
                            checkBoxValue={saveCard}
                            checkBoxValueChange={(value) => setSaveCard(value)}

                            onPayPress={(newCardDetails) => {
                                console.log("newCardDetails==>>>", { newCardDetails });
                                Toast.show("Card information added!")
                                refRBSheet.current.close()
                            }}
                            payButtonStyling={{ backgroundColor: Colors.blue }}
                            payButtonTextStyling={{ color: Colors.white }}
                        />
                    </RBSheet>
                </View>
                <Loader loading={loading} isShowIndicator={true} />
            </ImageBackground>
        </SafeAreaView >
    )
}

export default BankDetailsScreen

