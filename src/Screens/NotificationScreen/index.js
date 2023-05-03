import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    SafeAreaView,
    FlatList
} from 'react-native';

// Libraries
import { StackActions, useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import RBSheet from "react-native-raw-bottom-sheet";

//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';


//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import Loader from '../../Components/Loader';
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';

// API Endpoints
import { getNotificationsList } from '../../api/methods/auth';

// Redux Imports
import { signInResponse } from '../../redux/actions/userSession'
import { useDispatch } from 'react-redux';


const NotificationScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const refRBSheet = useRef()

    const [notificationsData, setNotificationsData] = useState('')
    const [loading, setLoading] = useState(false)

    const getNotification = async () => {
        try {
            setLoading(true)
            const response = await getNotificationsList()
            setNotificationsData(response.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('Error==>>>', error.response.data)
        }
    }

    useEffect(() => {
        getNotification()
        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])

    const renderItem = ({ item }) => {
        return (
            <View style={Style.notificationContainer}>
                <View style={[Style.rowContainer, {
                    // backgroundColor:item?.id==2 || item?.id==3?Colors.white:Colors.whiteGray
                }]}>
                    <View style={[Style.greenContainer, {
                        // width:item?.id==2 || item?.id==3?20:30,
                        // height:item?.id==2 || item?.id==3?20:30,
                        // backgroundColor:item?.id==2 || item?.id==3?Colors.LightGray:Colors.green
                    }]}></View>
                    <View style={Style.descriptionContainer}>
                        <Text style={[Style.notiticationText, {
                            // color:item?.id==2 || item?.id==3?Colors.LightGray:Colors.black
                        }]}>{item.message}</Text>
                    </View>
                    <View style={Style.dayContainer}>
                        <Text style={[Style.notificationDayText, {
                            // color:item?.id==2 || item?.id==3?Colors.LightGray:Colors.black
                        }]}>{item.notificationDay}</Text>
                    </View>
                </View>
            </View>
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
                            onProfilePress={() => refRBSheet.current.open()}
                            headerStyle={Style.headerStyle}
                            leftIcon={Images.leftIcon}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <View style={Style.bottomContainer}>

                        <View style={Style.bottomInnerainContainer}>
                            <View style={Style.innerHeadingContainer}>
                                {/* <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
                                    <Image
                                        style={{
                                            width: 15,
                                            height: 15,
                                            marginLeft: 10,
                                            marginTop: 12,
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                        }}
                                        source={Images.leftArrowIcon}
                                    />
                                </TouchableOpacity> */}
                                <Text style={Style.mainHeading}>
                                    {"Notifications"}
                                </Text>
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <FlatList
                                    data={notificationsData}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                    ListEmptyComponent={() => {
                                        if (loading) return null
                                        return (
                                            <View style={{
                                                width: '90%',
                                                height: 100,
                                                alignSelf: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <Text style={{
                                                    alignSelf: 'center',
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                    color: Colors.black
                                                }}>{'There are no new notifications!'}</Text>
                                            </View>
                                        )
                                    }}
                                />
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
                </View>
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    );
};

export default NotificationScreen;

