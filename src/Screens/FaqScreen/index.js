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
    Animated
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
import { getProfileApi, faqsApi } from '../../api/methods/auth';

// Redux Imports
import { signInResponse } from '../../redux/actions/userSession'
import { useDispatch, useSelector } from 'react-redux';


const FaqScreen = ({ navigation }) => {

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const { currentUser } = useSelector(state => state.userSession)

    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const [isEnabled, setIsEnabled] = useState(undefined);
    const [notificationsData, setNotificationsData] = useState('')
    const [userInfo, setUserInfo] = useState('')
    const [loading, setLoading] = useState(false)
    const [allFaqs, setAllFaqs] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState(false)

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

    const getAllFaqs = async () => {
        try {
            setLoading(true)
            const response = await faqsApi()
            setAllFaqs(response.data.data)
        } catch (error) {
            console.log('error==>>', error);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserProfile()
        getAllFaqs()
    }, [isFocused])


    const renderItem = ({ item, index }) => {

        const isSelected = item.isSelected === true;
        const source = {
            html: item?.answer
        }

        return (
            <>
                <CustomInput
                    source={Images.downArrow}
                    placeholder={item?.question}
                    editable={false}
                    onPress={() => {
                        const selectedAnswer = [...allFaqs]
                        selectedAnswer[index].isSelected = !isSelected;
                        setAllFaqs(selectedAnswer)
                        setSelectedAnswer(selectedAnswer[index].isSelected)
                    }}
                    arrowIcon={{ transform: [{ rotate: isSelected ? '180deg' : '0deg' }] }}
                />
                {isSelected &&
                    <Animatable.View
                        animation={'fadeIn'}
                        style={Style.answerContainer}>
                        <RenderHtml
                            source={source}
                        />
                    </Animatable.View>}
            </>
        )
    }


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

                        <View style={Style.bottomInnerainContainer}>
                            <View style={Style.innerHeadingContainer}>
                                <Text style={Style.mainHeading}>
                                    {"FAQ"}
                                </Text>
                            </View>
                            <View style={Style.optionsContainer}>
                                <FlatList
                                    data={allFaqs}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    );
};

export default FaqScreen;

