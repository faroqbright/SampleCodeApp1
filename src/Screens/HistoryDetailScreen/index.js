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
import { historyDetailsApi } from '../../api/methods/auth';

// Redux Imports
import { signInResponse } from '../../redux/actions/userSession'
import { useDispatch, useSelector } from 'react-redux';

const HistoryDetailScreen = ({ navigation, route }) => {

    const { itemId } = route?.params
    const isFocused = useIsFocused()

    const refRBSheet = useRef()

    const [historyDetail, seHistoryDetail] = useState('')
    const [loading, setLoading] = useState(false)

    const getHistoryDetails = async () => {
        try {
            setLoading(true)
            const response = await historyDetailsApi(itemId)
            seHistoryDetail(response.data.data)
        } catch (error) {
            console.log('error===>>', error);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getHistoryDetails()
    }, [isFocused])

    let historyDate = moment(historyDetail?.created_at).format('YYYY/MM/DD')
    let historyTime = moment(historyDetail?.created_at).format('HH:MM')

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
                            <View style={Style.notificationContainer}>
                                <Text style={Style.notificationText}>{historyDetail?.event_message}</Text>
                            </View>
                            <View style={Style.messageContainer}>
                                <Text style={Style.messageText}>{"Message"}</Text>
                                <View style={Style.messageDetailContainer}>
                                    <Text style={Style.messageText}>{historyDetail?.message}</Text>
                                </View>
                                <View style={Style.rowContainer}>
                                    <Text style={Style.leftText}>{"Payment method"}</Text>
                                    <Text style={Style.paymentText}>{historyDetail?.transaction_details?.payment_method}</Text>
                                </View>
                                <View style={Style.rowContainer}>
                                    <Text style={Style.leftText}>{"Amount"}</Text>
                                    <Text style={Style.rightText}>{historyDetail?.transaction_details?.amount}</Text>
                                </View>
                                <View style={Style.rowContainer}>
                                    <Text style={Style.leftText}>{"Date"}</Text>
                                    <Text style={Style.rightText}>{historyDate}</Text>
                                </View>
                                <View style={Style.rowContainer}>
                                    <Text style={Style.leftText}>{"Time"}</Text>
                                    <Text style={Style.rightText}>{historyTime}</Text>
                                </View>
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

export default HistoryDetailScreen;

