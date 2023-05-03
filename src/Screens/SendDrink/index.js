import React, { useState, useRef, useEffect } from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    Text,
    FlatList,
    SafeAreaView,
    StatusBar,
    PermissionsAndroid,
    Modal,
    ScrollView,
    ActivityIndicator,
    Alert,
    Platform,
    Keyboard
} from 'react-native';


//Libraries
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RBSheet from "react-native-raw-bottom-sheet";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Contacts from 'react-native-contacts';
import Toast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import ImageOverlay from "react-native-image-overlay";
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { selectContactPhone } from 'react-native-select-contact';
// import { PermissionsAndroid, Platform } from 'react-native';

// Files
import Style from './Style';
import Colors from '../../Utils/Colors';

//Components
import Header from '../../Components/Header';
import Images from '../../Assets/Images';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';
import CustomModal from '../../Components/CustomModal';
import CountryPicker from '../../Components/CountryPicker';
import Loader from '../../Components/Loader';

// Api endpoints
import { getCountriesApi, getDrinkCategories, } from '../../api/methods/auth'
import CountryCodePicker from '../../Components/CountryCodePicker';

const options = {
    opacity: 0.3,
    mediaType: 'mixed',
    videoQuality: 'low',
    quality: 0.1,
}

const SendDrink = ({ navigation, route }) => {


    const { drinkDetails, selectedVenue } = route?.params

    const refRBSheet = useRef();

    const isFocused = useIsFocused()

    let systemVersion = ''


    const [recpName, setRecepName] = useState('')
    const [recepNumber, setRecepNumber] = useState('')
    const [recepMessage, setRecepMessage] = useState('')
    const [imageVideo, setImageVideo] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [drinkModal, setDrinkModal] = useState(false)
    const [contacts, setContacts] = useState([]);
    const [contactName, setContactName] = useState('')
    const [contactNumber, setContactNumber] = useState([])
    const [openContacts, setOpenContacts] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [show, setShow] = useState(false)
    const [country, setCountry] = useState([])
    const [countryCode, setCountryCode] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [selectedContact, setSelectedContact] = useState('')
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [total, setTotal] = useState([])
    const [startingIndex, setStartingIndex] = useState(0)
    const [endingIndex, setEndingIndex] = useState(20)
    const [isSelectDrinkModalVisible, setIsSelectDrinkModalVisible] = useState(false)
    const [drinksList, setDrinksList] = useState([])
    const [selectedDrink, setSelectedDrink] = useState(false)
    const [selectedDrinksList, setSelectedDrinksList] = useState([])
    const [filteredList, setFilteredList] = useState(contacts)
    const [searchContactText, setSearchContactText] = useState('')
    const [emptyContactsList, setEmptyContactsList] = useState(false)
    const [androidVersion, setAndroidVersion] = useState('')
    const [drinkNamesList, setDrinkNamesList] = useState('')
    const [uploadedVideo, setUploadedVideo] = useState(null)
    const [contact, setContact] = useState(null);
    const [countryModal, setCountryModal] = useState(false)
    const [countryName, setCountryName] = useState(null)
    const [fone_code, setFone_code] = useState('')





    useEffect(() => {
        getContacts()
        getCountires()
        getAllDrinks()
        getDrinkNames()
        // getPhoneNumber()

        getDeviceInformation()

        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])

    // const getPhoneNumber = async () => {
    //     // on android we need to explicitly request for contacts permission and make sure it's granted
    //     // before calling API methods
    //     console.log("in get fone fnc");
    //     if (Platform.OS === 'android') {
    //       const request = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    //       );

    //       // denied permission
    //       if (request === PermissionsAndroid.RESULTS.DENIED) throw Error("Permission Denied");

    //       // user chose 'deny, don't ask again'
    //       else if (request === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) throw Error("Permission Denied");
    //     }

    //     // Here we are sure permission is granted for android or that platform is not android
    //     const selection = await selectContactPhone();
    //     if (!selection) {
    //         return null;
    //     }

    //     let { contact, selectedPhone } = selection;
    //     console.log(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
    //     return selectedPhone.number;
    // }

    const _storeData = async () => {
        try {
            await AsyncStorage.setItem(
                recepNumber
                // '@MySuperStore:key',
                // 'I like to save it.',
            );
        } catch (error) {
            // Error saving data
        }
    };

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

    // const inputcheck = async () => {
    //     if (firstName === "") {
    //         Toast.show("First Name is required");
    //     }
    //     else if (lastName === "") {
    //         Toast.show("Last Name is required");
    //     }
    //     else if (phoneNo === "") {
    //         Toast.show("Phone No is required");
    //     }
    //     // else if (email === "") {
    //     //     Toast.show("Email is required");
    //     // }
    //     // else if (email === undefined ||
    //     //     email === '' ||
    //     //     email.length <= 0 ||
    //     //     !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    //     //     Toast.show("Please enter valid email")
    //     // }
    //     else if (password === "") {
    //         Toast.show("Enter Password");
    //     }
    //     else if (password.length < 8) {
    //         Toast.show("Password must be atleast 6 characters")
    //     }
    //     else if (selectedYear < 18) {
    //         Toast.show("You must be above 18 to use this app!")
    //     }
    //     else if (city === '') {
    //         Toast.show("Please enter city")
    //     }
    //     else if (agreeTerms == false) {
    //         Toast.show("Please accept terms & conditions")
    //     }
    //     else if (agreeMarket == false) {
    //         Toast.show("Please accept marketing communication")
    //     }
    //     else {
    //         signUpFunction()
    //     }
    // };



    const signUpFunction = async () => {

        const formData = new FormData()
        formData.append('role', 'customer')
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('date_of_birth', moment(date).format('DD-MM-YYYY'))
        formData.append('email', email)
        formData.append('phone', `${"+"}${defaultCountry?.phone_code + phoneNo || countryCode.phone_code + phoneNo}`)
        formData.append('phone_code', phone_code)
        formData.append('password', password)
        formData.append('is_allow_push', pushNotifcation)
        formData.append('is_allow_sms', smsSwitch)
        formData.append('address_line_1', addressLine1)
        formData.append('address_line_2', addressLine2)
        formData.append('city', city)
        formData.append('country', countryName?.name || defaultCountry?.name)
        formData.append('state', selectedState?.name)
        formData.append('zip', zip)
        formData.append('country_short_name', countryName?.code || defaultCountry?.code)

        try {
            setLoading(true)
            const response = await signUpAPI(formData)
            if (response.status == 200) {
                Toast.show(response.data.message)
                // navigation.navigate('VerificationScreen', {
                //     userPhone: phoneNo
                // })
                navigation.navigate('PhoneVerificationScreen', {
                    email: email,
                    phoneNo: (countryCode?.phone_code || defaultCountry?.phone_code) + phoneNo,
                    countryCodeImage: countryCode?.image || defaultCountry?.image,
                    newUser: true
                })
            }
            setLoading(false)
        } catch (error) {
            console.log('eroor-->>', error)
            console.log('eroor-->>', error?.response?.data)
            Toast.show(error.response.data.error.message)
            setLoading(false)
        }
    }


    const openContactPicker = async () => {
        try {
            const selectedContact = await SelectContact.pickContact();
            setContact(selectedContact);
        } catch (error) {
            console.log(error);
        }
    };

    const getDeviceInformation = () => {
        systemVersion = DeviceInfo.getSystemVersion()
        setAndroidVersion(systemVersion)
    }

    const getDrinkNames = () => {
        let tempString = ''
        drinkDetails.forEach((element, index) => {
            if (index == drinkDetails.length - 1 && drinkDetails.length > 1) {
                tempString = tempString.concat(`and ${element?.name}`)
            }
            else if (index < drinkDetails.length - 1) {
                tempString = tempString.concat(`${element?.name}, `)
            }
            else {
                tempString = tempString.concat(`${element?.name} `)
            }
            setDrinkNamesList(tempString)
        });
    }

    const showCamera = () => {
        launchCamera(options, callback);

    }
    const showLibrary = () => {
        launchImageLibrary(options, callback)
    }

    const callback = async response => {
        if (response.didCancel) {
            console.log("User Cancelled Image Picker")
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else {
            setModalVisible(false)
            const source = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
            };
            if (source?.type === 'image/jpeg' || source?.type === 'image/jpg') {
                setUploadedVideo(null)
                setImageVideo(source)
            }
            else {
                setImageVideo(null)
                setUploadedVideo(source)
            }
        }
    }

    const onBuffer = (data) => {
        console.log("Error =>>>>>>>>>>>>>>>>", data)
    }
    const VideoError = (data) => {
        console.log("Error =>>>>>>>>>>>>>>>>>", data)
    }

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

    const getContacts = () => {
        try {
            if (Platform.OS === "android") {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                    title: "Contacts",
                    message: "This app would like to view your contacts."
                }).then((response) => {
                    loadContacts();
                });
            }
            else {
                console.log('in else');
                loadContacts();
            }
        } catch (error) {
            console.log('contacts function error===>>>', error);
        }
    }

    const getCountires = async () => {
        try {
            const response = await getCountriesApi()
            setCountry(response.data.data)
        } catch (error) {
            // console.log('countries api error==>>', error)
        }
    }

    const loadContacts = async () => {
        let sortedArray = []
        try {
            setLoading(true)
            if (Contacts) {
                const response = await Contacts?.getAll()
                setLoading(false)
                setTotal(response)
                let info = response
                if (Platform.OS === 'android' && systemVersion === '12') {
                    setContacts(info)
                    setFilteredList(info)
                }
                else if (Platform.OS === 'ios') {
                    sortedArray = info?.sort((a, b) => a?.displayName || a?.givenName?.localeCompare(a?.displayName || b?.givenName) >= 0)
                    setContacts(info)
                    setFilteredList(info)
                }
                else {
                    sortedArray = info?.sort((a, b) => a?.displayName.localeCompare(b?.displayName) >= 0)
                    setContacts(sortedArray)
                    setFilteredList(sortedArray)
                }
            }
        } catch (error) {
            setLoading(false)
            console.log('contacts error==>>>', error?.response)
            // Alert.alert("error===>>", JSON.stringify(error))
        }
        finally {
            setLoading(false)
        }
    }

    const onContinuePress = () => {
        if (recepNumber === '') {
            Toast.show("Please enter recipient number!")
        }
        else if (setRecepName === '') {
            Toast.show("Please enter recipient name!")
        }
        else if (recepMessage === '') {
            Toast.show("Please enter message for recipient!")
        }
        else {
            setDrinkModal(true)
        }
    }


    const SettingSenderInfo = async (item) => {
        if ((item?.displayName || item?.givenName) && item?.phoneNumbers.length > 0) {
            setRecepName(item?.displayName || item?.givenName || "Contact")
            setRecepNumber(item?.phoneNumbers[0]?.number) //.substr(2, 11)
            try {
                await AsyncStorage.setItem(
                    'RecepNumber',
                    item?.phoneNumbers[0]?.number.substr(3, 11),
                );
            } catch (error) {
                console.log("Errrrrr----");
                // Error saving data
            }
            // console.log(`First two digits of ${setRecepNumber}'s phone number: ${setRecepNumber}`);
            // console.log("Phone number");
        }
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
                senderName: recpName,
                senderPhone: recepNumber,
                countryCode: fone_code,
                senderMessage: recepMessage,
                messagePhoto: imageVideo || uploadedVideo
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

    const DrinksRenderItem = ({ item, index }) => {
        const isSelected = item.isSelected === true;
        let tempData = [...drinksList];
        let selectedArray = []

        return (

            <TouchableOpacity
                onPress={() => {
                    const drinksListTemp = [...drinksList]
                    drinksListTemp[index].isSelected = !isSelected;

                    setDrinksList(drinksListTemp)
                    setSelectedDrink(drinksListTemp[index].isSelected)
                    drinksList.map((item, index) => {
                        if (item.isSelected) {
                            // tempData.push(item);
                            selectedArray.push(item)
                        }
                    })
                    setSelectedDrinksList(selectedArray)
                }}
                style={[Style.itemImageContainer, { width: '47%' }]} >
                <Image
                    resizeMode='cover'
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                    source={{ uri: item.image }}
                />
                {
                    isSelected &&
                    <View style={Style.checkImageContainer} >
                        <Image
                            style={Style.checkBoxImageStyle}
                            source={Images.checkMark}
                        />
                    </View>
                }
                <View style={Style.nameContainer}>
                    <Text style={Style.nameText}>{item.name}</Text>
                </View>
                <View style={Style.priceContainer}>
                    <Text style={Style.priceText}>{item.price}</Text>
                </View>

            </TouchableOpacity >

        )
    }


    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground
                resizeMode='cover'
                style={{ width: '100%', height: '100%' }}
                source={Images.Splash}>
                <View style={Style.shadowContainer}>
                    <KeyboardAwareScrollView
                        keyboardShouldPersistTaps={"handled"}>
                        <Header
                            source={Images.profileAvatar}
                            notificationIcon={Images.NotificationIcon}
                            onProfilePress={() => refRBSheet.current.open()}
                            onNotificationPress={() => navigation.navigate('NotificationScreen')}
                            leftIcon={Images.leftIcon}
                            onPress={() => navigation.goBack()}
                            description={"Add the details of your gift"}
                        />
                        <View >

                            <CustomInput
                                mainContainer={Style.inputContainer}
                                placeholder={"RECIPIENT NAME*"}
                                source={Images.caretDown}
                                editable={false}
                                onPress={() => setModalShow(true)}
                                value={recpName}
                                onChangeText={(text) => setRecepName(text)}
                            />

                            <View style={Style.phoneContainer}>
                                <TouchableOpacity
                                    onPress={() => setCountryModal(true)}
                                    style={Style.countryImageContainer}>
                                    <View>
                                        <Image
                                            style={{ width: 20, height: 20, tintColor: Colors.LightGray, }}
                                            source={Images.caretDown}
                                        />
                                    </View>
                                    <Text style={{
                                        fontFamily: 'Roboto-Regular',
                                        color: Colors.textColor,
                                    }}>{fone_code || "44"}</Text>
                                </TouchableOpacity>
                                <TextInput
                                    placeholderTextColor={Colors.LightGray}
                                    style={Style.phoneInputContainer}
                                    placeholder={"RECIPIENT PHONE NUMBER*"}
                                    value={recepNumber}
                                    onChangeText={(text) => setRecepNumber(text)}
                                />
                            </View>

                            <View style={Style.messageInput}>

                                <TextInput
                                    style={Style.messageContainer}
                                    multiline={true}
                                    placeholder='MESSAGE'
                                    placeholderTextColor={Colors.LightGray}
                                    textAlignVertical='top'
                                    value={recepMessage}
                                    onChangeText={(text) => setRecepMessage(text)}
                                />
                                <View style={Style.messageImageContainer}>
                                    {imageVideo ? <Image
                                        style={{ width: '100%', height: '100%' }}
                                        source={imageVideo}
                                    /> :
                                        <Video
                                            source={uploadedVideo}
                                            resizeMode={"cover"}
                                            style={{ height: 120, width: '100%', alignSelf: 'center', marginTop: 15 }}
                                        />}
                                </View>
                                <View style={Style.imagePickerContainer}>
                                    <TouchableOpacity style={Style.imageButton}
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <Image
                                            resizeMode='contain'
                                            style={{ width: '100%', height: '100%' }}
                                            source={Images.cameraIcon}
                                        />
                                    </TouchableOpacity>
                                    <Text style={Style.uploadText}>{"Upload Photo/Video"}</Text>
                                </View>
                            </View>
                            {!isSelectDrinkModalVisible && <CustomButton
                                onPress={() => {
                                    Keyboard.dismiss()
                                    onContinuePress()
                                }}
                                mainButtonStyle={{
                                    marginTop: 20,
                                    backgroundColor: Colors.green,
                                    borderColor: Colors.green,
                                    borderWidth: 0.5
                                }}
                                // disabled={recpName==='' || recepNumber==='' || recepMessage===''?true:false}
                                btnTextStyle={{
                                    color: Colors.white
                                }}
                                label={"CONTINUE"}
                            />}
                        </View>

                    </KeyboardAwareScrollView>
                    <Modal
                        transparent={true}
                        visible={modalShow}
                    >
                        <View style={{
                            width: '80%',
                            borderRadius: 20,
                            height: '60%',
                            alignSelf: 'center',
                            marginTop: '50%',
                            backgroundColor: Colors.inputColor,
                        }}>
                            <View style={{
                                width: '90%',
                                height: 60,
                                flexDirection: 'row',
                                alignSelf: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 0.5,
                                paddingBottom: 10,
                                borderColor: Colors.LightGray
                            }}>

                                {/* displayName */}
                                <CustomInput
                                    mainContainer={[Style.inputContainer, {
                                        height: 35
                                    }]}
                                    source={Images.crossIcon}
                                    onPress={() => {
                                        setSearchContactText('')
                                        setFilteredList(contacts)
                                    }}
                                    placeholder={"Search by name"}
                                    value={searchContactText}
                                    onChangeText={(text) => {
                                        let newlist = [...contacts]
                                        if (text?.length > 0) {
                                            setEmptyContactsList(false)
                                            newlist = newlist?.filter((item) => {
                                                return item?.displayName?.toLowerCase()?.indexOf(text.toLowerCase()) == 0
                                                    || item?.givenName?.toLowerCase()?.indexOf(text.toLowerCase()) == 0
                                            })
                                        }
                                        if (newlist?.length === 0) {
                                            setEmptyContactsList(true)
                                        }
                                        setFilteredList(newlist)
                                        setSearchContactText(text)
                                    }}
                                />
                                <TouchableOpacity
                                    style={{
                                        width: 80,
                                        height: 40,
                                        marginTop: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'flex-end',
                                    }}
                                    onPress={() => setModalShow(false)}
                                >
                                    <Image
                                        style={{
                                            width: 30,
                                            height: 30,
                                            alignSelf: 'flex-end',
                                            // marginTop: 15,
                                            marginRight: 20
                                        }}
                                        source={Images.crossIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            {/* </View> */}
                            <FlatList
                                renderItem={contactsRenderItem}
                                data={filteredList}
                                keyExtractor={item => item.id}
                                ListEmptyComponent={() => {
                                    if (emptyContactsList) {
                                        return (
                                            <Text style={{
                                                alignSelf: 'center',
                                                textAlign: 'center',
                                                color: Colors.textColor,
                                                fontSize: 12
                                            }}>{"Contact not found!"}</Text>
                                        )
                                    }
                                    else {
                                        return null
                                    }
                                }}
                            />
                        </View>
                    </Modal>
                    <CountryPicker
                        isVisible={countryModal}
                        onPress={() => setCountryModal(false)}
                        data={country}
                        placeholder={'Search country'}
                        onCountryPress={(itemDetails) => {
                            setCountryModal(false)
                            setCountryName(itemDetails)
                            getAllCountryStates(itemDetails?.id)
                            setFone_code(itemDetails?.phone_code)
                            // console.log("itemDetails?.code1=-=-=-=>>", itemDetails.phone_code);

                            console.log("itemDetails?.code2=-=-=-=>>", fone_code);
                        }}
                    />

                    {/* Select Drink Modal */}
                    <Modal
                        transparent={true}
                        visible={isSelectDrinkModalVisible}
                    >
                        <View style={{
                            width: '90%',
                            borderRadius: 20,
                            height: '80%',
                            alignSelf: 'center',
                            marginTop: 20,
                            backgroundColor: "rgba(10, 10, 10,0.8)"
                        }}>
                            <View style={{
                                width: '100%',
                                height: 50,
                                alignSelf: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: "rgba(10, 10, 10,0.5)",
                                borderRadius: 20
                            }}>
                                <Text
                                    style={{
                                        color: Colors.white,
                                        marginLeft: 10,
                                        fontSize: 16,
                                        fontFamily: 'Roboto-bold'
                                    }}
                                >{"Select Drink"}</Text>
                                <TouchableOpacity
                                    style={{
                                        width: 40,
                                        height: 20,
                                        // marginTop: 15,
                                        marginBottom: 25,
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'flex-end',
                                    }}
                                    // onPress={() => setModalShow(false)}
                                    onPress={() => setIsSelectDrinkModalVisible(false)}
                                >
                                    <Image
                                        style={{
                                            width: 30,
                                            height: 30,
                                            alignSelf: 'flex-end',
                                            // marginTop: 15,
                                            marginRight: 15,
                                            tintColor: Colors.white
                                        }}
                                        source={Images.crossIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={drinksList}
                                keyExtractor={item => item.id}
                                renderItem={DrinksRenderItem}
                                // style={{ margin: 5 }}
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    // flexGrow: 1,
                                    // backgroundColor:'pink',
                                    alignSelf: 'center',
                                    paddingHorizontal: 10,
                                    // marginTop: 25,
                                    paddingVertical: 20,
                                    width: '100%',
                                    justifyContent: 'space-evenly',
                                    paddingBottom: 50,
                                    // backgroundColor: "rgba(10, 10, 10,0.5)",
                                }}
                            />
                            {<CustomButton
                                label={"CONTINUE"}
                                onPress={() => {
                                    setIsSelectDrinkModalVisible(false)
                                    getDrinkPrices()
                                }}
                                mainButtonStyle={{
                                    backgroundColor: Colors.green
                                }}
                            />}
                        </View>
                    </Modal>
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
                                // borderRadius: 25,
                                // borderWidth: 1,
                                // borderColor: 'red',
                                width: '100%',
                                alignSelf: 'center'
                            },
                            container: {
                                alignSelf: 'center',
                                // backgroundColor:"red",
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
                </View>
                <CustomModal
                    onAdd={() => showCamera()}
                    onContinue={() => showLibrary()}
                    onCancel={() => setModalVisible(false)}
                    isVisible={modalVisible}
                    label={"CHOOSE OPTION"}
                    firstButtonLabel={"OPEN CAMERA"}
                    secondButtonLabel={"OPEN GALLERY"}
                    modalLabelStyle={Style.modalLabelStyle}
                    modalContainerStyle={Style.modalContainerStyle}
                    firstButtonStyle={Style.cameraButton}
                    firstButtonTextStyle={Style.cameraButtonText}
                />
                <CustomModal
                    onAdd={() => {
                        setDrinkModal(false)
                        setIsSelectDrinkModalVisible(true)
                    }}
                    onContinue={() => {
                        setDrinkModal(false)
                        getDrinkPrices()
                    }}
                    onCancel={() => setDrinkModal(false)}
                    isVisible={drinkModal}
                    label={`You are sending ${drinkNamesList}to ${recpName}`}
                    firstButtonLabel={"ADD MORE DRINKS"}
                    secondButtonLabel={"CONTINUE"}
                    modalContainerStyle={Style.modalContainerStyle}
                    modalLabelStyle={[Style.modalLabelStyle, { width: "80%" }]}
                />
                <CountryPicker
                    isVisible={show}
                    onPress={() => setShow(false)}
                    data={country}
                    onCountryPress={(itemDetails) => {
                        setShow(false)
                        console.log("Country CodeSelected: ", JSON.stringify(itemDetails))
                        setCountryCode(itemDetails)
                    }}
                />
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default SendDrink;


