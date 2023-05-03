import React, { useState, useRef, useEffect } from 'react'
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
import StarRating from 'react-native-star-rating';
import MapView from 'react-native-maps';
import { useIsFocused } from '@react-navigation/native';
import { getReferencePhotoURI } from '../VenueScreen';

//Files
import Style from './Style'
import Images from '../../Assets/Images'

//Components
import Header from '../../Components/Header'
import CustomButton from '../../Components/CustomButton'
import Colors from '../../Utils/Colors'
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';


const VenueDetail = ({ navigation, route }) => {

    let city = ''
    let venueState = ''
    let venueCountry = ''

    const refRBSheet = useRef()
    const isFocused = useIsFocused()

    const params = route?.params?.itemDetails

    const [resturantCity, setResurantCity] = useState('')
    const [resturantState, setResurantState] = useState('')
    const [resturantCountry, setResurantCountry] = useState('')

    const getItemUrl = (item) => {
        if (item.image) return item.image
        else if (item.photos?.length > 0) return getReferencePhotoURI(item.photos[0].photo_reference)
        else return item.icon
    }

    getReferencePhotoURI(params?.photos?.photo_reference)

    useEffect(() => {
        if (!isFocused)
            refRBSheet.current.close()
        let venueCity = params?.vicinity
        city = venueCity.split(',')
        setResurantCity(city[city.length - 1])
        if (params?.plus_code?.compound_code.length > 0) {
            let state = params?.plus_code?.compound_code
            venueState = state?.split(',')
            setResurantCountry(venueState[venueState.length - 1])
            setResurantState(venueState[venueState.length - 2])
        }

    }, [isFocused])



    let venueUrl = `https://stage.skoll-app.com/venue/signup?name=${params?.name || ''}&email=${params?.email || ''}&phone=${params?.phone || ''}&address=${params?.address || params?.vicinity || ''}&city=${params?.city || resturantCity || ''}&state=${params?.state || resturantState || ''}&country=${params?.country || resturantCountry || ''}&zip=${params?.zip || ''}&latitude=${params?.latitude || params?.geometry?.location?.lat}&longitude=${params?.longitude || params?.geometry?.location?.lng}&place_id=${params?.place_id || ''}`

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
                                contentContainerStyle={{ flexGrow: 1 }}
                            >
                                <Image
                                    source={{ uri: getItemUrl(params) }}
                                    style={Style.venueImageStyle}
                                />
                                <Text style={Style.venueName}>{params?.name}</Text>
                                <Text numberOfLines={1} style={Style.venueLocation}>{params?.address || params?.vicinity}</Text>
                                {params?.phone ? <Text numberOfLines={1} style={Style.venueLocation}>{"Contact No."}</Text> : <></>}
                                {params?.phone ? <Text numberOfLines={1} style={Style.venueLocation}>{params?.phone || '(+421)-89545653212'}</Text> : <></>}
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={15}
                                    containerStyle={{
                                        width: 30,
                                        marginLeft: '10%',
                                        marginTop: 15
                                    }}
                                    fullStarColor={Colors.blue}
                                    rating={params.rating}
                                />
                                <Text style={Style.venueDescription}>{params?.description}</Text>
                                <CustomButton
                                    mainButtonStyle={Style.clamButton}
                                    btnTextStyle={Style.claimButtonText}
                                    onPress={() => Linking.openURL(venueUrl)}
                                    label={"CLAIM THIS VENUE"}
                                />
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

export default VenueDetail