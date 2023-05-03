import React, { useState, useRef, useEffect } from 'react'
import {
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Linking,
    Platform
} from 'react-native'


//Libraries
import RBSheet from "react-native-raw-bottom-sheet";
import StarRating from 'react-native-star-rating';
import { Link, useIsFocused } from '@react-navigation/native';
import { TouchableOpacity as TouchableOpacityGesture } from 'react-native-gesture-handler';


//Files
import Style from './Style'
import Images from '../../Assets/Images'

//Components
import Header from '../../Components/Header'
import CustomButton from '../../Components/CustomButton'
import Colors from '../../Utils/Colors'
import CustomInput from '../../Components/CustomInput';
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';
import BottomSheetComponent from '../../Components/BottomSheetComponent'
import LocationModal from '../../Components/LocationModal';
import Loader from '../../Components/Loader';

// Api endpoints
import { getVenues } from '../../api/methods/auth';


export const getReferencePhotoURI = (reference, maxwidth = 150, maxheight = 150) => {
    return `https://maps.googleapis.com/maps/api/place/photo?photoreference=${reference}&maxwidth=${maxwidth}&maxheight=${maxheight}&key=${'AIzaSyAQCT8s6PuV87Rc61HmvLuENGkRCYEtmWU'}`
}

const VenueScreen = ({ navigation }) => {

    const refRBSheet = useRef()
    const locationBottomSheet = useRef()
    const isFocused = useIsFocused()

    const [locationModalVisible, setLocationModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState('')
    const [venueName, setVenueName] = useState('')
    const [venueDescription, setVenueDescription] = useState()
    const [googleVenues, setGoogleVenues] = useState([])
    const [allVenuesArray, setAllVenuesArray] = useState([])
    const [initialRegion, setInitialRegion] = useState({
        latitude: 51.5072178,
        longitude: -0.1275862,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [searchedLat, setSearchedLat] = useState('')
    const [searchedLong, setSearchedLong] = useState('')
    const [nextPageToken, setNextPageToken] = useState('')

    const getAllVenues = async (latitude, longitude) => {

        try {
            setLoading(true)
            const response = await getVenues(latitude, longitude)
            setLoading(false)
            getAllVenuesFomGoogle(response.data.data, latitude, longitude, null)
        } catch (error) {
            setLoading(false)
        }
    }

    const getAllVenuesFomGoogle = async (venuesFromBackEnd, lat, long, pageToken = null) => {

        setSearchedLat(lat)
        setSearchedLong(long)
        let endpoint = ""
        if (pageToken !== null) endpoint = `&pagetoken=${pageToken}`
        setLoading(true)
        fetch(`https://maps.googleapis.com/maps/api/place/search/json?location=${lat},${long}&radius=5000&sensor=false&key=AIzaSyAQCT8s6PuV87Rc61HmvLuENGkRCYEtmWU&types=bar${endpoint}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false)
                if (responseJson.status === 'OK') {
                    setNextPageToken(responseJson?.next_page_token)
                    combineVenueArrays(venuesFromBackEnd, responseJson.results)
                }
                else {
                    setAllVenuesArray(responseJson.results)
                }
            })
    }

    const combineVenueArrays = (venuesFromBackEnd, googleleVenuesArray) => {
        let BackEndVenues = [...venuesFromBackEnd]
        let tempArray = BackEndVenues.concat(googleleVenuesArray)
        setAllVenuesArray(tempArray)
    }

    useEffect(() => {
        getAllVenues(initialRegion?.latitude, initialRegion?.longitude)
        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])


    const getItemUrl = (item) => {
        if (item.image) return item.image
        else if (item.photos?.length > 0) return getReferencePhotoURI(item.photos[0].photo_reference)
        else return item.icon
    }

    const renderItem = ({ item }) => {
        // console.log("CHECK", item);
        setVenueName(item?.name)
        setVenueDescription(item?.address)
        return (
            // <View style={{marginTop:15,}}>
            <TouchableOpacity style={Style.flatListMainContainer}
                onPress={() => navigation.navigate('VenueDetail', { itemDetails: item })}
            >
                <View style={Style.flatListInnerContainer}>
                    <View style={Style.flatListImageContainer} >
                        <Image
                            resizeMode='cover'
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: getItemUrl(item) }}
                        />
                    </View>
                    <View style={{ width: '50%', paddingBottom: 5, marginTop: 10 }}>
                        <Text style={Style.flatListLocationName}>{item.name}</Text>
                        <View style={{ position: "absolute", bottom: 20 }}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                starSize={15}
                                containerStyle={{
                                    width: 30
                                }}
                                fullStarColor={Colors.black}
                                rating={item.rating}
                            />
                            <Text style={Style.flatListLocation}>{item.description}</Text>
                            <Text style={Style.flatListLocation} >{item.address || item.vicinity}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            // </View>
        )
    }

    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground source={Images.Splash} style={{ width: '100%', height: '100%' }}>
                <View style={Style.shadowContainer}>
                    <Header
                        headerStyle={{
                            marginBottom: -40
                        }}
                        onNotificationPress={() => navigation.navigate('NotificationScreen')}
                        notificationIcon={Images.NotificationIcon}
                        source={Images.profileAvatar}
                        onProfilePress={() => refRBSheet.current.open()}
                        description={"Enter an address or\npostcode to browse local venues"}
                        leftIcon={Images.leftIcon}
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'AfterSplash' }],
                        })}
                    />
                    <View style={Style.innerContainer}>
                        {/* <View style={Style.rowContainer}> */}
                        {Platform.OS === 'ios' ? <TouchableOpacityGesture
                            style={{ width: '90%', marginVertical: 10, }}
                            onPress={() => setLocationModalVisible(true)}
                        >
                            <CustomInput
                                mainContainer={{
                                    width: '100%'
                                }}
                                value={location}
                                editable={false}
                                placeholder={"Address / Postcode"}
                            />
                        </TouchableOpacityGesture>
                            :
                            <TouchableOpacity
                                style={{ width: '90%', marginVertical: 10, }}
                                onPress={() => setLocationModalVisible(true)}
                            >
                                <CustomInput
                                    mainContainer={{
                                        width: '100%'
                                    }}
                                    value={location}
                                    editable={false}
                                    placeholder={"Address / Postcode"}
                                />
                            </TouchableOpacity>}
                        {/* </View> */}
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={allVenuesArray}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={{ height: 10 }} />
                                )
                            }}
                            ListEmptyComponent={() => {
                                if (loading) {
                                    return null
                                }
                                else {
                                    return (
                                        <Text style={{
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            color: Colors.white
                                        }}>{"There are no venues found"}</Text>
                                    )
                                }
                            }}
                            onEndReached={() => {
                                if (nextPageToken == undefined || null || '') {
                                    return null
                                }
                                else {
                                    getAllVenuesFomGoogle(allVenuesArray, searchedLat, searchedLong, nextPageToken)
                                }
                            }}
                        />
                        <View style={{
                            // height:80,
                            marginTop: 30,
                            marginBottom: 30
                        }}>

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
                                height: '70%',
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
                    {/* Location BottomSheet */}
                    <RBSheet
                        ref={locationBottomSheet}
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
                                height: '68%',
                                width: '100%'
                            },
                            draggableIcon: {
                                backgroundColor: "black"
                            }
                        }}
                    >
                        <BottomSheetComponent
                            onLocationPress={() => locationBottomSheet.current.close()}
                            onVenuePress={() => locationBottomSheet.current.close()}
                            onFacilitiesPress={() => locationBottomSheet.current.close()}
                            onRatingPress={() => locationBottomSheet.current.close()}
                            onSearchPress={() => locationBottomSheet.current.close()}
                        />
                    </RBSheet>
                </View>
                <Loader loading={loading} isShowIndicator={true} />
                <LocationModal
                    isVisible={locationModalVisible}
                    onClosePress={() => setLocationModalVisible(false)}
                    onGooglePlacePress={(data, details = null) => {
                        // alert('hello')
                        // fetchDetails = true
                        setLocationModalVisible(false)
                        let tempLocation = { ...initialRegion };
                        tempLocation.latitude = details?.geometry?.location?.lat;
                        tempLocation.longitude = details?.geometry?.location?.lng;
                        setInitialRegion(tempLocation)
                        setLocation(data.description)
                        getAllVenues(details?.geometry?.location?.lat, details?.geometry?.location?.lng)
                    }}
                />
            </ImageBackground>
        </SafeAreaView>
    )
}

export default VenueScreen;