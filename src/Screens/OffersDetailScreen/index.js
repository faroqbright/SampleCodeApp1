import React, {
    useState,
    useRef,
    useEffect
} from 'react'
import {
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Linking
} from 'react-native'


//Libraries
import RBSheet from "react-native-raw-bottom-sheet";
import { useIsFocused } from '@react-navigation/native';

//Files
import Style from './Style'
import Images from '../../Assets/Images'

//Components
import Header from '../../Components/Header'
import CustomButton from '../../Components/CustomButton'
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';


const OffersDetailScreen = ({ navigation, route }) => {

    const { item } = route?.params

    const refRBSheet = useRef()
    const isFocused = useIsFocused()

    return (
        <SafeAreaView style={Style.mainContainer}>

            <ImageBackground
                style={{ flex: 1 }}
                source={Images.Splash}>
                <View style={Style.shadowContainer}>
                    <Header
                        onProfilePress={() => refRBSheet.current.open()}
                        source={Images.profileAvatar}
                        leftIcon={Images.leftIcon}
                        notificationIcon={Images.NotificationIcon}
                        onNotificationPress={() => navigation.navigate('NotificationScreen')}
                        onPress={() => navigation.goBack()}
                    />
                    <View style={Style.bottomContainer}>
                        <View style={Style.bottomInnerContainer}>
                            <ScrollView
                                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 15. }}
                            >
                                <Image
                                    source={{ uri: item?.image } || Images.venuePlaceholder}
                                    style={Style.venueImageStyle}
                                />
                                <Text style={Style.venueName}>{item?.title}</Text>
                                <Text style={Style.venueLocation}>{item?.description}</Text>
                                <Text numberOfLines={1} style={Style.venueName}>{"Price"}</Text>
                                <Text numberOfLines={1} style={Style.venueLocation}>{item?.price}</Text>
                                <Text numberOfLines={1} style={Style.venueName}>{"Start Date"}</Text>
                                <Text numberOfLines={1} style={Style.venueLocation}>{item?.start_date}</Text>
                                <Text numberOfLines={1} style={Style.venueName}>{"End Date"}</Text>
                                <Text numberOfLines={1} style={Style.venueLocation}>{item?.end_date}</Text>
                                
                                <View style={{
                                    width: '100%',
                                    height: 100,
                                }}></View>
                            </ScrollView>
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
        </SafeAreaView >
    )
}

export default OffersDetailScreen;