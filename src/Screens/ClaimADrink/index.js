import React, { useState, useRef, useEffect } from 'react';
import {
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';


//Libraries
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
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';
import Loader from '../../Components/Loader';
import CustomModalInput from '../../Components/CustomModalInput';

// Redux imports
import { useSelector } from 'react-redux';

// Api endpoints
import {
    giftsList,
    getCountriesApi,
    getOriderLists,
    getDrinkCategories
} from '../../api/methods/auth';
import CustomModal from '../../Components/CustomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryPicker from '../../Components/CountryPicker';


const ClaimADrink = ({ navigation, route }) => {
    // const { drinkDetails, selectedVenue } = route?.params

    const { currentUser } = useSelector(state => state.userSession)
    // console.log("current user==>>",currentUser?.user_id)

    const refRBSheet = useRef();

    const isFocused = useIsFocused()

    const [recepNumber, setRecepNumber] = useState('')
    const [selectedDrink, setSelectedDrink] = useState(false)
    const [selectedId, setSelectedId] = useState(false)
    const [loading, setLoading] = useState(false)
    const [giftsList, setGiftsList] = useState('')
    const [selectedDrinksList, setSelectedDrinksList] = useState([])
    const [drinksList, setDrinksList] = useState([])
    const [drinkInfo, setDrinkInfo] = useState('')
    const [drinkModal, setDrinkModal] = useState(false)
    const [numberChange, setNumberChange] = useState(false)

    const [isSelectDrinkModalVisible, setIsSelectDrinkModalVisible] = useState(false)
    const [recepOldNum, setRecepOldNum] = useState('')

    const [countryModal, setCountryModal] = useState(false)
    const [country, setCountry] = useState([])
    const [countryName, setCountryName] = useState(null)
    const [fone_code, setFone_code] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    // const params = route?.params?.sent

    // const DrinkId = route?.params?.orderId

    useEffect(() => {
        getAllDrinks()
        getGits()
        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])

    useEffect(() => {
        getCountires()
    }, [])

    const getAllCountryStates = async (countryId) => {
        setLoading(true)
        try {
            const response = await getStatesByCountry(countryId)
            setCountryStatesList(response?.data?.data)
            setSelectedState(response?.data?.data[0])
        } catch (error) {
            console.log('erroor===>>>', error?.response?.data);
        }
        finally {
            setLoading(false)
        }
    }

    const getCountires = async () => {
        try {
            const response = await getCountriesApi()
            setCountry(response.data.data)
        } catch (error) {
            console.log('countries api error==>>', error)
        }
    }
    // _retrieveData = async () => {
    //     try {
    //       await AsyncStorage.getItem(
    //         recepNumber
    //         // '@MySuperStore:key',
    //         // 'I like to save it.',
    //       );
    //     } catch (error) {
    //       // Error saving data
    //     }
    //   };



    const getAllDrinks = async () => {
        try {
            setLoading(true)
            const response = await getDrinkCategories()
            let drinksListTemp = []
            const apiData = response.data.data || []
            for (const iterator of apiData) {
                let isNotFound = true
                for (const item of drinkDetails) {
                    if (item.id == iterator.id) {
                        isNotFound = false
                        drinksListTemp.push(item)
                        break;
                    }
                }
                if (isNotFound) drinksListTemp.push(iterator)
            }
            setDrinksList(drinksListTemp)
            setLoading(false)
        } catch (error) {
            setLoading(false)

            console.log("error==>>", error)
        }
    }
    const getGits = async () => {
        try {
            setLoading(true)
            const response = await getOriderLists('received', currentUser?.user_id)
            setGiftsList(response.data.data)
            console.log("getOriderLists-------->", response.data.data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    const onContinuePress = () => {
        console.log('continue press==>>');
        setDrinkModal(true)
        SettingSenderInfo()

    }
    const getDrinkPrices = () => {
        let totalAmount = 0
        if (selectedDrinksList.length > 0) {
            selectedDrinksList.forEach(element => {
                totalAmount = totalAmount + (parseInt(element.price))
            });
        } else {
            drinkDetails.forEach(element => {
                totalAmount = totalAmount + (parseInt(element.price))
            });
        }

        navigation.navigate('ChoosePaymentMethod', {
            drinkDetails: selectedDrinksList.length > 0 ? selectedDrinksList : drinkDetails,
            totalPrice: totalAmount,
            selectedVenue: selectedVenue,
            messageInfo: {
                senderPhone: recepNumber,
            }
        })
    }
    const contactsRenderItem = ({ item, index }) => {

        return (
            <TouchableOpacity
                onPress={() => {
                    SettingSenderInfo(item)
                    setModalShow(false)
                }}
            >
                <View style={{
                    width: '90%',
                    borderBottomWidth: 1,
                    borderColor: Colors.LightGray,
                    height: 60,
                    alignSelf: 'center',
                    // flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: Colors.black,
                        marginLeft: 15,
                        // alignSelf: 'center',
                    }}>{item?.displayName || item?.givenName || item?.familyName || "Phone Contact"}</Text>
                    <Text style={{
                        color: Colors.black,
                        marginLeft: 15,
                        alignSelf: 'flex-end'
                    }}>{item?.phoneNumbers[0]?.number || ''}</Text>
                </View>
            </TouchableOpacity>
        )
    }



    const SettingSenderInfo = async () => {

        try {
            const value = await AsyncStorage.getItem('RecepNumber');
            if (value !== null) {
                // We have data!!
                // console.log();
                console.log("New valuee----------", value);
            }
            setRecepNumber(value)
            console.log('setRecepNumber', recepNumber);
        } catch (error) {
            // Error retrieving data
            console.log("Error----------", error);

        }

        // if ((item?.displayName || item?.givenName) && item?.phoneNumbers.length > 0) {
        // setRecepNumber(item?.phoneNumbers[0]?.number.substr(3, 11))
        // console.log('setRecepNumber', recepNumber);
        // console.log(`First two digits of ${setRecepNumber}'s phone number: ${setRecepNumber}`);
        // console.log("Phone number");
        //}
    }
    // const onContinuePress = () => {
    //     if (recepNumber === '') {
    //         Toast.show("Please enter recipient number!")
    //     }
    //     else if (setRecepName === '') {
    //         Toast.show("Please enter recipient name!")
    //     }
    //     else if (recepMessage === '') {
    //         Toast.show("Please enter message for recipient!")
    //     }
    //     else {
    //         setDrinkModal(true)
    //     }
    // }
    const renderView = ({ item, index }) => {
        const isSelected = item.isSelected === true;
        let tempData = [];
        let drinkName
        return (
            <View style={Style.renderContainer}>
                <TouchableOpacity style={Style.rowContainer}
                    onPress={() => {
                        const drinksListTemp = [...giftsList]
                        drinksListTemp[index].isSelected = !isSelected;
                        setDrinksList(drinksListTemp)
                        setSelectedDrink(drinksListTemp[index].isSelected)

                        setRecepOldNum(drinksListTemp[index].phone)
                        giftsList.map((item, index) => {
                            if (item.isSelected) {
                                tempData.push(item);
                            }
                        })
                        setSelectedDrinksList(tempData)
                        setDrinkInfo(item)
                    }}

                >
                    <View style={Style.imageContainer}>
                        <Image
                            source={item.image !== null ? { uri: item?.image } : Images.drinksPlaceHolder}
                            style={{ width: '100%', height: '100%' }}
                        />
                        {isSelected && <Image
                            style={Style.checkBoxImageStyle}
                            source={Images.checkMark}
                        />}
                    </View>
                    <View style={Style.textContainer}>
                        {item.drinks.forEach((element, index) => {
                            drinkName = element.drink_name
                        })}
                        <Text style={Style.itemNameText} > {drinkName}</Text>
                        <Text style={Style.itemFromText}>{item?.from_user?.first_name + ' ' + item?.from_user?.last_name}</Text>
                        <Text style={Style.itemMessageText}>{item?.message}</Text>
                    </View>
                </TouchableOpacity >
            </View >
        )
    }

    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground
                source={Images.Splash}
            >
                <View style={Style.shadowContainer}>
                    <Header
                        source={Images.profileAvatar}
                        notificationIcon={Images.NotificationIcon}
                        onNotificationPress={() => navigation.navigate('NotificationScreen')}
                        onProfilePress={() => refRBSheet.current.open()}
                        leftIcon={Images.leftIcon}
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'AfterSplash' }],
                        })}
                        description={"You have drinks to redeem"}
                    />
                    <FlatList
                        data={giftsList}
                        renderItem={renderView}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ flexGrow: 1 }}
                        ListEmptyComponent={() => {
                            if (loading) {
                                return null
                            }
                            else {
                                return (
                                    <View style={Style.messageContainer}><Text style={Style.messageText}>{"There are no drinks/gift to redeem!"}</Text></View>
                                )
                            }
                        }}
                    />
                    <View style={{ height: 100, marginBottom: 30 }}></View>
                    {!isSelectDrinkModalVisible && <CustomButton

                        onPress={() => {
                            Toast.show("Please select a Drink")
                            // onContinuePress()
                            // SettingSenderInfo(item)
                            // contactsRenderItem()
                        }
                        }
                        mainButtonStyle={[Style.redeemButtonStyle, {
                            backgroundColor: selectedDrink ? Colors.green : 'transparent'
                        }]}
                        // disabled={recpName==='' || recepNumber==='' || recepMessage===''?true:false}
                        btnTextStyle={{ color: selectedDrink ? Colors.white : Colors.textColor }}
                        label={"REDEEM"}
                    />}

                    {selectedDrink && <CustomButton

                        mainButtonStyle={[Style.redeemButtonStyle, {
                            backgroundColor: selectedDrink ? Colors.green : 'transparent'
                        }]}
                        btnTextStyle={{ color: selectedDrink ? Colors.white : Colors.textColor }}
                        label={"REDEEM"}
                        onPress={() => {
                            onContinuePress()
                            // navigation.navigate('RecieveScreen', {
                            //     selectedDrinkId: selectedDrinksList,
                            //     drinkInfo: drinkInfo
                            // }
                            // )
                        }}
                    />}
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
                <CustomModal
                    onAdd={() => {
                        setDrinkModal(false)
                        setTimeout(() => {
                            setNumberChange(true)
                        }, 1000);
                        // setIsSelectDrinkModalVisible(true)
                    }}
                    onContinue={() => {
                        setDrinkModal(false)
                        navigation.navigate('RecieveScreen', {
                            selectedDrinkId: selectedDrinksList,
                            drinkInfo: drinkInfo,
                            newPhoneNumber: newPhoneNumber
                        })
                        // getDrinkPrices()
                    }}
                    onCancel={() => setDrinkModal(false)}
                    isVisible={drinkModal}
                    // label={`Are You Sure to redeem to this nunmber \n\t ${recepNumber} `}
                    label={`Are You Sure to redeem to this nunmber ${recepOldNum} `}
                    firstButtonLabel={"Edit Phone Number"}
                    secondButtonLabel={"CONTINUE"}
                    modalContainerStyle={Style.modalContainerStyle}
                />


                <CustomModalInput
                    onContinue={() => {
                        setNumberChange(false)
                        navigation.navigate('RecieveScreen', {
                            selectedDrinkId: selectedDrinksList,
                            drinkInfo: drinkInfo,
                            newPhoneNumber: newPhoneNumber
                        })
                        // getDrinkPrices()
                    }}
                    onCountryPickerPress={() => {
                        setNumberChange(false)
                        setTimeout(() => {
                            setCountryModal(true)
                        }, 1000);
                    }}
                    onCancel={() => setNumberChange(false)}
                    isVisible={numberChange}
                    label={`Enter the number on which you \n want to redeem`}
                    // firstButtonLabel={"Edit Phone Number"}
                    secondButtonLabel={"CONTINUE"}
                    modalContainerStyle={Style.modalContainerStyle}
                    fone_code={fone_code}
                    value={newPhoneNumber}
                    onChangeText={(text) => setNewPhoneNumber(text)}
                />
                <CountryPicker
                    isVisible={countryModal}
                    onPress={() => setCountryModal(false)}
                    data={country}
                    placeholder={'Search country'}
                    onCountryPress={(itemDetails) => {
                        setCountryModal(false)
                        setTimeout(() => {
                            setNumberChange(true)
                        }, 100);
                        setCountryName(itemDetails)
                        getAllCountryStates(itemDetails?.id)
                        setFone_code(itemDetails?.phone_code)
                        // console.log("itemDetails?.code1=-=-=-=>>", itemDetails.phone_code);

                        console.log("itemDetails?.code2=-=-=-=>>", fone_code);
                    }}
                />
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default ClaimADrink;


