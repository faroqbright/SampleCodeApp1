import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native'

// Libraries
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';

//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';

//Components
import Header from '../../Components/Header';
import CustomButton from '../../Components/CustomButton';
import CustomModal from '../../Components/CustomModal';
import RatingButton from '../../Components/RatingButton';
import Loader from '../../Components/Loader';
import { rateVenue } from '../../api/methods/auth';


const RateTheVenueScreen = ({ navigation, route }) => {

    const selectedDrinkId = route?.params?.selectedDrinkId

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
    const [rating, setRating] = useState(0)

    const [rating1, setRating1] = useState(false)
    const [rating2, setRating2] = useState(false)
    const [rating3, setRating3] = useState(false)
    const [rating4, setRating4] = useState(false)
    const [rating5, setRating5] = useState(false)


    const onSubmitPress = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('venue_id', selectedDrinkId[0]?.venue?.id)
            formData.append('message', message)
            formData.append('rating', rating)
            formData.append('file', imageVideo)
            console.log('form Data====>>>', formData);
            const response = await rateVenue(formData)
            setLoading(false)
            if (response.status == 200) {
                Toast.show(response.data.message)
                navigation.navigate('ReviewSubmitScreen', { rating: rating })
            }
        } catch (error) {
            setLoading(false)
            Toast.show(error?.response?.data?.error?.message)
            console.log('error===>>>>', error)
        }
    }

    const showCamera = () => {
        launchCamera(options, callback);

    }
    const showLibrary = () => {
        launchImageLibrary(options, callback)
    }

    const callback = async response => {
        // console.log('my response=====>', response)
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
            setImageVideo(source)
        }
    }


    return (
        <View style={Style.mainContainer}>
            <ImageBackground
                source={Images.friendsCheering}
            >
                <View style={Style.shadowContainer}>
                    <Header
                        onNotificationPress={() => ''}
                        notificationIcon={Images.NotificationIcon}
                        leftIcon={Images.leftIcon}
                        headerStyle={{ marginTop: 15 }}
                        onPress={() => navigation.goBack()}
                    />
                    <KeyboardAwareScrollView>
                        <View style={Style.descriptionContainer}>
                            <Text style={Style.venuName}>{selectedDrinkId[0]?.venue?.name}</Text>
                            <Text style={Style.venuAddress}>{selectedDrinkId[0]?.venue?.city + ',' + ' ' + selectedDrinkId[0]?.venue?.country}</Text>
                        </View>
                        <View style={Style.rowContainer}>
                            <RatingButton
                                mainContainer={{ backgroundColor: rating == 1 ? Colors.blue : Colors.DarkGray }}
                                label={'1'}
                                onPress={() => {
                                    setRating(1),
                                        setRating1(true)
                                    setRating2(false)
                                    setRating3(false)
                                    setRating4(false)
                                    setRating5(false)
                                }}
                            />
                            <RatingButton
                                mainContainer={{ backgroundColor: rating == 2 ? Colors.blue : Colors.DarkGray }}
                                label={'2'}
                                onPress={() => {
                                    setRating(2)
                                    setRating1(false)
                                    setRating2(true)
                                    setRating3(false)
                                    setRating4(false)
                                    setRating5(false)
                                }}
                            />
                            <RatingButton
                                mainContainer={{ backgroundColor: rating == 3 ? Colors.blue : Colors.DarkGray }}
                                label={'3'}
                                onPress={() => {
                                    setRating(3)
                                    setRating1(false)
                                    setRating2(false)
                                    setRating3(true)
                                    setRating4(false)
                                    setRating5(false)
                                }}
                            />
                            <RatingButton
                                mainContainer={{ backgroundColor: rating == 4 ? Colors.blue : Colors.DarkGray }}
                                label={'4'}
                                onPress={() => {
                                    setRating(4)
                                    setRating1(false)
                                    setRating2(false)
                                    setRating3(false)
                                    setRating4(true)
                                    setRating5(false)
                                }}
                            />
                            <RatingButton
                                mainContainer={{ backgroundColor: rating == 5 ? Colors.blue : Colors.DarkGray }}
                                label={'5'}
                                onPress={() => {
                                    setRating(5)
                                    setRating1(false)
                                    setRating2(false)
                                    setRating3(false)
                                    setRating4(false)
                                    setRating5(true)
                                }}
                            />
                        </View>
                        <View style={Style.messageContainer}>
                            <TextInput
                                textAlignVertical='top'
                                multiline={true}
                                style={Style.messageInputStyle}
                                placeholder={"Write a review"}
                                value={message}
                                placeholderTextColor={Colors.white}
                                onChangeText={(text) => setMessage(text)}
                            />
                            <View style={Style.messageImageContainer}>
                                <Image
                                    style={{ width: '100%', height: '100%' }}
                                    source={imageVideo}
                                />
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
                            </View>
                        </View>
                        <CustomButton
                            mainButtonStyle={[Style.buttonContainer, {
                                backgroundColor: message.length > 0 || rating1 || rating2 || rating3 || rating4 || rating5 ? Colors.green : 'transparent',
                                borderColor: message.length > 0 || rating1 || rating2 || rating3 || rating4 || rating5 ? Colors.green : Colors.white
                            }]}
                            label={"SUBMIT"}
                            onPress={() =>
                                // navigation.navigate('ReviewSubmitScreen')
                                onSubmitPress()
                            }
                        />
                    </KeyboardAwareScrollView>
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
            <Loader loading={loading} isShowIndicator={true} />
        </View>
    )
}

export default RateTheVenueScreen;