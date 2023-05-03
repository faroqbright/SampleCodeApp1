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
import moment from 'moment';

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
import { getNotificationsList, getOriderLists, historyListing } from '../../api/methods/auth';

// Redux Imports
import { signInResponse } from '../../redux/actions/userSession'
import { useDispatch, useSelector } from 'react-redux';


const HistoryScreen = ({ navigation }) => {

    const { currentUser } = useSelector(state => state.userSession)

    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const refRBSheet = useRef()

    const [historyData, setHistoryData] = useState('')
    const [loading, setLoading] = useState(false)

    const getHistoryList = async () => {
        try {
            setLoading(true)
            const response = await historyListing()
            setHistoryData(response.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('Error==>>>', error.response.data)
        }
    }

    useEffect(() => {
        getHistoryList()
        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])

    const renderItem = ({ item }) => {

        let notificationDate = moment(item?.created_at).format('YYYY-MM-DD')

        return (
            <View style={Style.notificationContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('HistoryDetailScreen',{itemId:item?.id})}
                >
                    <View style={Style.rowContainer}>
                        <View style={Style.greenContainer}></View>
                        <View style={Style.descriptionContainer}>
                            <Text style={[Style.notiticationText, {
                                // color:item?.id==2 || item?.id==3?Colors.LightGray:Colors.black
                            }]}>{item?.message}</Text>
                        </View>
                        <View style={Style.dayContainer}>
                            <Text style={Style.notificationDayText}>{notificationDate}</Text>
                        </View>
                    </View>
                    <Text style={Style.priceText}>{"Drink Amount: " + item?.total_price}</Text>
                </TouchableOpacity>
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
                                    {"History"}
                                </Text>
                            </View>
                                <FlatList
                                    data={historyData}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                    contentContainerStyle={{flexGrow:1}}
                                    ListEmptyComponent={() => {
                                        if(loading) return null
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
                                                }}>{'There is no history data found!'}</Text>
                                            </View>
                                        )
                                    }}
                                />
                                <View style={{
                                    height:18,
                                    // marginBottom:30
                                }}>
                            </View>
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
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    );
};

export default HistoryScreen;

