import React, { useState, useRef, useEffect } from 'react';
import {
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView
} from 'react-native';

// Libraries
import RBSheet from "react-native-raw-bottom-sheet";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';
import Video from 'react-native-video';

//Files
import Style from './Style';
import Colors from '../../Utils/Colors';
import Images from '../../Assets/Images';

// Components
import Header from '../../Components/Header';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';
import CustomModal from '../../Components/CustomModal';
import Loader from '../../Components/Loader';

// API endpoints
import { sendThankyouMessage, getProfileApi, logoutAPI } from '../../api/methods/auth';


const ThankyouMessageScreen = ({ navigation, route }) => {

    const selectedDrinkId = route?.params?.selectedDrinkId

    const refRBSheet = useRef();

    const isFocused = useIsFocused()

    const options = {
        opacity: 0.3,
        mediaType: 'mixed',
        videoQuality: 'low',
        quality: 0.1,

    }

    const [message, setMessage] = useState('')
    const [imageVideo, setImageVideo] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState('')
    const [uploadedVideo, setUploadedVideo] = useState(null)


    const onContinuePress = async () => {
        try {
            if (message === '') {
                Toast.show("Please enter message!")
            }
            else {
                setLoading(true)
                const formData = new FormData()
                formData.append('order_id', selectedDrinkId[0]?.drinks[0]?.order_id)
                formData.append('message', message)
                formData.append('file', imageVideo)
                const response = await sendThankyouMessage(formData)
                setLoading(false)
                if (response.status == 200) {
                    Toast.show(response?.data?.message)
                    navigation.navigate('MessageConfirmScreen', { selectedDrinkId: selectedDrinkId })
                }
            }
        } catch (error) {
            setLoading(false)
            Toast.show(error?.response?.data?.error?.message)
            console.log("error===>>", error.response.data)
        }
    }

    const getUserProfile = async () => {
        try {
            const response = await getProfileApi(currentUser?.user_id)
            setUserInfo(response.data.data)
        } catch (error) {
            if (error.response.data.error.message == "Token has been expired.") {
                // dispatch(logoutUser())
                Toast.show("Session Expired!")
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
            Toast.show('Something went wrong!')
        }
    }

    const showCamera = () => {
        launchCamera(options, callback);

    }
    const showLibrary = () => {
        launchImageLibrary(options, callback)
    }

    const callback = async response => {
        if (response.didCancel) {
        }
        else if (response.error) {
        }
        else {
            setModalVisible(false)
            const source = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
            };
            if (source?.type == 'image/jpeg') {
                setUploadedVideo(null)
                setImageVideo(source)
            }
            else {
                setImageVideo(null)
                setUploadedVideo(source)
            }
        }
    }

    useEffect(() => {
        getUserProfile()
        // if (!isFocused)
        //     refRBSheet.current.close()
    }, [isFocused])

    return (
        <SafeAreaView style={Style.mainContainer}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <ImageBackground source={Images.Splash}>
                    <View style={Style.shadowContainer}>
                        <Header
                            headerStyle={{ marginTop: 5 }}
                            source={userInfo ? { uri: userInfo.profile_picture } : Images.profileAvatar}
                            // onProfilePress={() => refRBSheet.current.open()}
                            description={"Send a thank you message!"}
                            onPress={() => navigation.goBack()}
                            leftIcon={Images.leftIcon}
                        />
                        <View style={Style.messageContainer}>
                            <TextInput
                                textAlignVertical='top'
                                multiline={true}
                                style={Style.messageInputStyle}
                                placeholder={"MESSAGE"}
                                value={message}
                                placeholderTextColor={Colors.textColor}
                                onChangeText={(text) => setMessage(text)}
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
                            <View style={Style.cameraIconContainer}>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(true)}
                                >
                                    <Image
                                        source={Images.cameraIcon}
                                        style={Style.cameraIcon}
                                    />
                                </TouchableOpacity>
                                <Text style={Style.uploadText}>{'Upload Photo/Video'}</Text>
                            </View>
                        </View>
                        <CustomButton
                            mainButtonStyle={[Style.continueButtonStyle, {
                                backgroundColor: message.length > 0 ? Colors.green : 'transparent',
                                borderColor: message.length > 0 ? Colors.green : Colors.white
                            }]}
                            btnTextStyle={[Style.continueButtonTextStyle, {
                                color: message.length > 0 ? Colors.white : Colors.LightGray
                            }]}
                            label={"CONTINUE"}
                            onPress={() => onContinuePress()}
                        />
                    </View>
                </ImageBackground>
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
            </KeyboardAwareScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView >
    )
}

export default ThankyouMessageScreen;