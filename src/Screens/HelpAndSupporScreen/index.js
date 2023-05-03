import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Switch,
    FlatList,
    Animated,
    TextInput
} from 'react-native';

// Libraries
import { StackActions, useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import RenderHtml from 'react-native-render-html';
import * as Animatable from 'react-native-animatable';

//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';


//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import Loader from '../../Components/Loader';

// API Endpoints
import { getProfileApi, faqsApi, helpSupport } from '../../api/methods/auth';

// Redux Imports
import { signInResponse } from '../../redux/actions/userSession'
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const HelpAndSupport = ({ navigation }) => {

    const { currentUser } = useSelector(state => state.userSession)
    const isFocused = useIsFocused()

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const getUserProfile = async () => {
        try {
            setLoading(true)
            const response = await getProfileApi(currentUser?.user_id)
            setUserInfo(response.data.data)
            setIsEnabled(response.data.data.marketing_preference)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const onSendPress = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email)
            formData.append('message', message)

            const response = await helpSupport(formData)
            console.log('response ===>>>', response.status);
            console.log('response ===>>>', response.data);
            Toast.show(response.data.message)
            if (response.status==200) {
                navigation.navigate("BottomTabStack")
            }
        } catch (error) {
            console.log('error', error);
            Toast.show('Something went wrong')
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [isFocused])


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
                            headerStyle={Style.headerStyle}
                            leftIcon={Images.leftIcon}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <View style={Style.bottomContainer}>
                        <KeyboardAwareScrollView>
                            <View style={Style.bottomInnerainContainer}>
                                <View style={Style.innerHeadingContainer}>
                                    <Text style={Style.mainHeading}>
                                        {"Help & Support"}
                                    </Text>
                                </View>
                                <View style={Style.optionsContainer}>
                                    <CustomInput
                                        placeholder={"Name"}
                                        value={name}
                                        onChangeText={(text) => setName(text)}
                                    />
                                    <CustomInput
                                        placeholder={"Email"}
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                    <View style={Style.messageInput}>
                                        <TextInput
                                            style={Style.messageContainer}
                                            multiline={true}
                                            placeholder='MESSAGE'
                                            placeholderTextColor={Colors.LightGray}
                                            textAlignVertical='top'
                                            value={message}
                                            onChangeText={(text) => setMessage(text)}
                                        />
                                    </View>
                                    <CustomButton
                                        mainButtonStyle={Style.sendButtonStyle}
                                        label={"SEND"}
                                        onPress={() => onSendPress()}
                                    />
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                </View>
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    );
};

export default HelpAndSupport;

