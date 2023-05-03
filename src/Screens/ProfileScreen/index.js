import React, { useState, useRef, useEffect } from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    Text,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Keyboard
} from 'react-native';



//Libraries
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RBSheet from "react-native-raw-bottom-sheet";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import moment from "moment";
import { useIsFocused } from '@react-navigation/native';
// import { Picker } from '@react-native-picker/picker';
import { Select } from 'native-base'
import Toast from 'react-native-simple-toast'

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

// API Endpoints
import {
    interestListApi,
    updateProfileApi,
    getProfileApi,
    getCountriesApi,
    getStatesByCountry
} from '../../api/methods/auth';


// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, signInResponse, } from '../../redux/actions/userSession';

const options = {
    opacity: 0.3,
    mediaType: 'photo',
    videoQuality: 'low',
    quality: 0.1,

}

const ProfileScreen = ({ navigation }) => {

    const { currentUser } = useSelector(state => state.userSession)
    // console.log('current user==>>',currentUser)

    const dispatch = useDispatch()

    const refRBSheet = useRef();

    const isFocused = useIsFocused()

    const [image, setImage] = useState(null)
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [date, setDate] = useState(new Date())
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [userState, setUserState] = useState('')
    const [country, setCountry] = useState('')
    const [postCode, setPostCode] = useState('')
    const [interestList, setInterestList] = useState([])
    const [interest, setInterest] = useState([])
    const [interestProfile, setInterestProfile] = useState()
    const [open, setOpen] = useState(false)
    const [openPicker, setOpenPicker] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [userInfo, setUserInfo] = useState('')
    const [loading, setLoading] = useState(false)
    const [isImage, setIsImage] = useState(false)
    const [stateShortName, setStateShortName] = useState('')
    const [countryShortName, setCountryShortName] = useState('')
    // const [country, setCountry] = useState([])
    const [countryCode, setCountryCode] = useState(defaultCountry)
    const [defaultCountry, setDefaultCountry] = useState('')
    const [countryModal, setCountryModal] = useState(false)
    const [countryName, setCountryName] = useState('')
    const [countryList, setCountryList] = useState([])
    const [stateModal, setStateModal] = useState(false)
    const [countryStatesList, setCountryStatesList] = useState([])
    const [selectedState, setSelectedState] = useState('')
    const [countryFlag, setCountryFlag] = useState(null)


    useEffect(() => {
        getInterestList()
        getCountires()
        getUserProfile(date)
        // refRBSheet.current.close()
    }, [isFocused])

    const getUserProfile = async (dateParam) => {

        moment(dateParam).format('YYYY-MM--DD')
        try {
            setLoading(true)
            setIsImage(true)
            const response = await getProfileApi(currentUser?.user_id)
            console.log("ProfileData: ", JSON.stringify(response.data.data))
            setEmail(response?.data?.data?.email)
            setImage(response?.data?.data?.profile_picture)
            setFirstName(response?.data?.data?.first_name)
            setLastName(response?.data?.data?.last_name)
            setPhoneNo(response?.data?.data?.phone)
            setAddress1(response?.data?.data?.address_line_1 !== 'Null' ? response?.data?.data?.address_line_1 : '')
            setAddress2(response?.data?.data?.address_line_2 !== 'Null' ? response?.data?.data?.address_line_2 : '')
            setCity(response?.data?.data?.city !== 'Null' ? response?.data?.data?.city : '')
            setUserState(response?.data?.data?.state !== 'Null' ? response?.data?.data?.state : '')
            setCountry(response?.data?.data?.country || '')
            setDate(response?.data?.data?.date_of_birth ? new Date(response?.data?.data?.date_of_birth) : new Date())
            setUserInfo(response?.data?.data)
            // setStateShortName(response?.data?.data?.state_short_code)
            setCountryShortName(response?.data?.data?.country_short_code)
            setPostCode(response?.data?.data?.zip_code !== "Undefined" ? response?.data?.data?.zip_code : '')
            setSelectedState(response?.data?.data?.state || '')
            setCountryFlag(response?.data?.data?.country_flag || '')
            setInterest(response?.data?.data?.interests[0].interest_id)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error?.response?.data?.error?.message == "Token has been expired.") {
                dispatch(logoutUser())
            }
        }
    }

    const getCountires = async () => {
        try {
            const response = await getCountriesApi()
            setCountryList(response.data.data)
            setDefaultCountry(response.data.data[0].image)
            getAllCountryStates(response.data.data[0].id)
        } catch (error) {
            // console.log('countries api error==>>', error)
        }
    }

    const getAllCountryStates = async (countryId) => {
        setLoading(true)
        try {
            const response = await getStatesByCountry(countryId)
            setCountryStatesList(response?.data?.data)
            // setSelectedState(response?.data?.data[0].name)
        } catch (error) {
            console.log('erroor===>>>', error?.response?.data);
        }
        finally {
            setLoading(false)
        }
    }

    const getInterestList = async () => {
        try {
            const response = await interestListApi()
            // console.log("interesttttttt", JSON.stringify(response));
            setInterestList(response.data.data)

        } catch (error) {
        }
    }

    const onChnagePostCode = (text) => {

        if (/^[0-9 a-zA-Z ]*$/.test(text) && country === 'United Kingdom') {
            if (postCode.length == 3 && text.length == 4) {
                if (text.substr(4, 1) != ' ') {
                    text = postCode + ' ' + text.substr(4, text.length - 1);
                }
                setPostCode(text)
            }
            else {
                setPostCode(text)
            }
        }
        else {
            setPostCode(text)
        }
    }

    const checkFields = () => {
        if (firstName === '') {
            Toast.show("Please enter your first name!")
        }
        else if (lastName === '') {
            Toast.show("Please enter your last name!")
        }
        else if (date === '') {
            Toast.show("Please enter your date of birth!")
        }
        else if (address1 === '') {
            Toast.show("Please enter your address!")
        }
        else if (city === '') {
            Toast.show("Please enter your city!")
        }
        else if (selectedState === '') {
            Toast.show("PLease enter your state!")
        }
        else if (country === '' && countryName === '') {
            Toast.show("Please enter your country!")
        }
        else if (postCode === '') {
            Toast.show("Please enter your zip code!")
        }
        else {
            updateProfile()
        }
    }

    const updateProfile = async () => {

        let shortCountryName = country.substring(0, 2)

        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('email', email)
            formData.append('profile_image', image)
            formData.append('first_name', firstName)
            formData.append('last_name', lastName)
            formData.append('date_of_birth', moment(date).format('YYYY-MM-DD'))
            formData.append('address_line_1', address1)
            formData.append('address_line_2', address2)
            formData.append('city', city)
            formData.append('state', selectedState)
            formData.append('country', countryName?.name || country)
            formData.append('zip', postCode)
            // formData.append('interest_id', interest)
            formData.append('interest_id', interest)
            // formData.append('interest_id', 3)
            formData.append('country_short_name', countryName?.code || countryShortName?.toLocaleLowerCase())

            console.log("Form Dataaaa----", formData);
            ``
            const response = await updateProfileApi(formData)
            if (response.status == 200) {
                Toast.show(response.data.message)
                navigation.navigate('BottomTabStack')
            }
            // console.log("Form Dataaaa----", formData);

            setLoading(false)
        } catch (error) {
            Toast.show(error?.response?.data?.error?.message)
            console.log('error===>>', error.response.data);
            setLoading(false)
        }

    }


    const options = {
        opacity: 0.3,
        mediaType: 'mixed',
        videoQuality: 'low',
        quality: 0.1,

    }

    const showCamera = () => {
        launchCamera(options, callback);
        setImage(false)
        // uri = null
    }
    const showLibrary = () => {
        launchImageLibrary(options, callback)
        setImage(false)
        // uri = null
    }

    const callback = async response => {
        if (response.didCancel) {
            console.log("User Cancelled Image Picker")
            // uri = userInfo?.profile_picture
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
            setIsImage(false)
            // uri = null
            setImage(source)
        }
    }

    // let uri = userInfo?.profile_picture
    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground
                style={{ width: '100%', height: '100%' }}
                resizeMode='cover'
                source={Images.Splash}>
                <View style={Style.shadowContainer}>
                    <Header
                        leftIcon={Images.leftIcon}
                        onPress={() => navigation.goBack()}
                        onSettingPress={() => navigation.navigate("AccountSettings")}
                    />
                    <View style={{ flex: 1, }}>
                        <View style={Style.profileImageContainer}>
                            <Image
                                resizeMode='cover'
                                style={{ width: 80, height: 80, borderRadius: 100 }}
                                source={isImage ? { uri: image } : image}
                            />
                            <TouchableOpacity style={Style.cameraIconContainer}
                                onPress={() => setModalVisible(true)}
                            >
                                <Image
                                    style={Style.cameraIconImage}
                                    source={Images.profileImageCameraIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <KeyboardAwareScrollView
                            keyboardShouldPersistTaps={'handled'}
                            contentContainerStyle={{ flexGrow: 1 }}>
                            <CustomInput
                                mainContainer={Style.inputContainer}
                                placeholder={"First Name"}
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                            />
                            <CustomInput
                                mainContainer={Style.inputContainer}
                                placeholder={"Last Name"}
                                value={lastName}
                                onChangeText={(text) => setLastName(text)}
                            />
                            <CustomInput
                                mainContainer={Style.inputContainer}
                                placeholder={"Phone No."}
                                value={phoneNo}
                                // editable={false}
                                onChangeText={(text) => setPhoneNo(text)}
                            />
                            <CustomInput
                                mainContainer={Style.inputContainer}
                                placeholder={"Date of Birth"}
                                value={moment(date).format('DD-MM-YYYY')}
                                source={Images.calendarIcon}
                                editable={false}
                                onPress={() => setOpen(true)}
                            />

                            {/* For Country */}
                            <View style={Style.countryContainer}>
                                <View style={Style.countryImageContainer}>
                                    <Image
                                        resizeMode='contain'
                                        style={{ width: 40, height: 30, marginLeft: 15 }}
                                        source={{ uri: countryName?.image || countryFlag }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setCountryModal(true)}
                                    >
                                        <Image
                                            style={{ width: 25, height: 25, marginRight: 10, marginTop: 5, tintColor: Colors.LightGray }}
                                            source={Images.downArrow}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={Style.countryInput}
                                    placeholder={"Country"}
                                    value={countryName.name || country}
                                // onChangeText={(text) => setCountry(text)}
                                />
                            </View>

                            {/* For State
                            <View style={Style.countryContainer}>
                                <View style={Style.countryImageContainer}>
                                    <TouchableOpacity
                                        onPress={() => setStateModal(true)}
                                    >
                                        <Image
                                            resizeMode='contain'
                                            style={{
                                                width: 25, height: 25, tintColor: Colors.LightGray
                                            }}
                                            source={Images.downArrow}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={Style.countryInput}
                                    placeholder={"State"}
                                    value={selectedState}
                                // onChangeText={(text) => setCountry(text)}
                                />
                            </View> */}


                            <CustomInput
                                mainContainer={Style.inputContainer}
                                placeholder={"City"}
                                value={city}
                                onChangeText={(text) => setCity(text)}
                            />
                            <CustomInput
                                mainContainer={Style.inputContainer}
                                placeholder={"Address 1"}
                                value={address1}
                                onChangeText={(text) => setAddress1(text)}
                            />
                            <CustomInput
                                mainContainer={Style.inputContainer}
                                placeholder={"Address 2"}
                                value={address2}
                                onChangeText={(text) => setAddress2(text)}
                            />
                            <CustomInput
                                mainContainer={Style.inputContainer}
                                placeholder={"Postcode"}
                                value={postCode}
                                onChangeText={(text) => onChnagePostCode(text)}
                            />
                            {/* <CustomInput
                                mainContainer={[Style.inputContainer, { marginBottom: 60 }]}
                                placeholder={"Interests"}
                                value={interest}
                                source={Images.caretDown}
                                onPress={() => setOpenPicker(!openPicker)}
                                onChangeText={(text) => setInterest(text)}
                            /> */}
                            {/* <View style={Style.pickerContainer}> */}

                            <Select
                                dropdownIconColor={Colors.LightGray}
                                width={'90%'}
                                style={{
                                    height: 52,
                                }}
                                alignSelf={'center'}
                                backgroundColor={Colors.white}
                                marginTop={2}
                                color={Colors.textColor}
                                borderRadius={25}
                                paddingLeft={5}
                                fontSize={15}
                                placeholderTextColor={Colors.textColor}
                                selectedValue={interest}
                                defaultValue={interestProfile?.name || "Choose Interest"}
                                // defaultValue={"loko"}
                                bgColor={Colors.white}
                                placeholder={interestProfile?.name || "Choose Interest"}
                                onValueChange={(itemValue, itemIndex) => {
                                    setInterest(itemValue)
                                    console.log("itemValue", itemValue);
                                }}>
                                {
                                    interestList?.map((item) => {
                                        return (
                                            <Select.Item
                                                key={item?.id}
                                                label={item.name}
                                                value={item.id}
                                                color={Colors.textColor}
                                            />
                                        )
                                    })
                                }
                            </Select>

                            <CustomButton
                                mainButtonStyle={Style.saveButton}
                                label={"SAVE"}
                                onPress={() => {
                                    Keyboard.dismiss()
                                    checkFields()
                                }}
                            />
                            {/* </View> */}
                            <View style={{ height: 10, marginBottom: 20 }}></View>
                        </KeyboardAwareScrollView>
                    </View>
                </View>

            </ImageBackground>
            <DatePicker
                // style={{width:'100%'}} 
                modal
                open={open}
                date={date}
                mode='date'
                placeholder="select date"
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }} />
            <CustomModal
                isVisible={modalVisible}
                onAdd={() => showCamera()}
                onContinue={() => showLibrary()}
                onCancel={() => setModalVisible(false)}
                label={"CHOOSE OPTION"}
                firstButtonLabel={"OPEN CAMERA"}
                secondButtonLabel={"OPEN GALLERY"}
                modalLabelStyle={Style.modalLabelStyle}
                modalContainerStyle={Style.modalContainerStyle}
                firstButtonStyle={Style.cameraButton}
                firstButtonTextStyle={Style.cameraButtonText}
            />
            <CountryPicker
                isVisible={countryModal}
                onPress={() => setCountryModal(false)}
                data={countryList}
                placeholder={'Search country'}
                onCountryPress={(itemDetails) => {
                    console.log('itemDetails==>>>', itemDetails);
                    setCountryModal(false)
                    setCountryName(itemDetails)
                    getAllCountryStates(itemDetails?.id)
                    // setCountryShortName(itemDetails?.code)
                    // setCountryName(itemDetails?.name)
                }}
            />
            {/* For Country States List */}
            <CountryPicker
                isStateModal={true}
                placeholder={'Search State'}
                isVisible={stateModal}
                onPress={() => setStateModal(false)}
                data={countryStatesList}
                onCountryPress={(itemDetails) => {
                    console.log('selected state==>>>', itemDetails?.name);
                    setStateModal(false)
                    setSelectedState(itemDetails.name)
                }}
            />
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default ProfileScreen;


