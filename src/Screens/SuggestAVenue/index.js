import React, { useState, useRef, useEffect } from 'react'
// import { PermissionsAndroid } from 'react-native';
import {
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    Platform
} from 'react-native'


//Libraries
import RBSheet from "react-native-raw-bottom-sheet";
import StarRating from 'react-native-star-rating';
import { useIsFocused } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { getDistance } from 'geolib';
import _ from 'lodash'
import { TouchableOpacity as TouchableOpacityGesture } from 'react-native-gesture-handler';

//Files
import Style from './Style'
import Images from '../../Assets/Images'
import Colors from '../../Utils/Colors';

//Components
import Header from '../../Components/Header';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';
import BottomSheetComponent from '../../Components/BottomSheetComponent';
import LocationModal from '../../Components/LocationModal';

// Api endpoints
import { getVenues } from '../../api/methods/auth';
import Loader from '../../Components/Loader';

const getReferencePhotoURI = (reference, maxwidth = 150, maxheight = 150) => {
    return `https://maps.googleapis.com/maps/api/place/photo?photoreference=${reference}&maxwidth=${maxwidth}&maxheight=${maxheight}&key=${'AIzaSyAQCT8s6PuV87Rc61HmvLuENGkRCYEtmWU'}`
}

const SuggestAVenue = ({ navigation, route }) => {

    const drinkDetails = route?.params?.drinkDetails
    // console.log('drinkDetails==>>', drinkDetails)

    const refRBSheet = useRef()
    const locationBottomSheet = useRef()
    const isFocused = useIsFocused()

    const [starRating, setStarRating] = useState(3)
    const [venuesList, setVenuesList] = useState([])
    const [isSelected, setIsSelected] = useState(false)
    const [selectedId, setSelectedId] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedVenue, setSelectedVenue] = useState('')
    const [locationModalVisible, setLocationModalVisible] = useState(false)
    const [location, setLocation] = useState('')
    const [venueName, setVenueName] = useState('')
    const [venueDescription, setVenueDescription] = useState()
    const [initialRegion, setInitialRegion] = useState({
        latitude: 51.5072178,
        longitude: -0.1275862,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [allVenuesArray, setAllVenuesArray] = useState([])
    const [isRatingSelected, setIsRatingSelected] = useState(false)
    const [searchedLat, setSearchedLat] = useState('')
    const [searchedLong, setSearchedLong] = useState('')
    const [nextPageToken, setNextPageToken] = useState('')

    const getAllVenues = async (latitude, longitude) => {

        try {
            setLoading(true)
            setIsSelected(false)
            const response = await getVenues(latitude, longitude)
            setVenuesList(response.data.data)

            getAllVenuesFomGoogle(response.data.data, latitude, longitude, null)
        } catch (error) {
            console.log('venues list error==>>', error)
        } finally {
            setLoading(false)
        }
    }

    const getAllVenuesFomGoogle = async (venuesFromBackEnd, lat, long, pageToken = null) => {

        setSearchedLat(lat)
        setSearchedLong(long)
        let endpoint = ""
        if (pageToken !== null) endpoint = `&pagetoken=${pageToken}`

        setLoading(true)
        fetch(`https://maps.googleapis.com/maps/api/place/search/json?location=${lat},${long}&radius=5000&sensor=false&key=AIzaSyAQCT8s6PuV87Rc61HmvLuENGkRCYEtmWU&types=bar${endpoint}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {

                setLoading(false)
                // console.log('responseJson===>>', responseJson)
                if (responseJson.status === 'OK') {
                    setNextPageToken(responseJson?.next_page_token)
                    combineVenueArrays(venuesFromBackEnd, responseJson.results)
                    // getGoogleVenuePhotos(responseJson.results)
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

    const getItemUrl = (item) => {
        if (item.image) return item.image
        else if (item.photos?.length > 0) return getReferencePhotoURI(item.photos[0].photo_reference)
        else return item.icon
    }


    const onRegionChange = ({ region }) => {
        // console.log("region==>>>", region)
        // setLocation(region)
    }

    const sortVenues = async (order, venuesArray) => {
        setLoading(true)
        let tempArray = [...venuesArray]
        if (order === 'ascending') {
            tempArray = tempArray.sort((a, b) => a?.name.localeCompare(b?.name) >= 0)
        }
        else {
            console.log('im here');
            tempArray = tempArray.reverse((b, a) => b?.name.localeCompare(a?.name) >= 0)
        }
        setTimeout(() => {
            setLoading(false)
        }, 3000);
        setAllVenuesArray(tempArray)
    }

    const searchByRating = () => {
        setLoading(true)
        let ratingArray = [...allVenuesArray]
        const newArray = ratingArray.sort(function (a, b) {
            let ratinA = a.rating || 0
            let ratinB = b.rating || 0
            return ratinB - ratinA
        })
        setTimeout(() => {
            setLoading(false)
        }, 3000);
        setAllVenuesArray(newArray)
    }

    const onDistancePress = () => {
        let tempArray = [...allVenuesArray.slice(0, 10)]
        // tempArray.forEach(element => {
        //     console.log('element name===>>>', element?.name);
        //     console.log('element location===>>>', element?.geometry?.location);
        // });
    }

    useEffect(() => {
        getAllVenues(initialRegion?.latitude, initialRegion?.longitude)
        setIsSelected(false)
        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])

    const renderItem = ({ item, index }) => {
        setVenueName(item?.name)
        setVenueDescription(item?.address)

        const isSelected = item.isSelected === true;
        let tempData = [];
        return (
            // <View style={{marginTop:15,}}>
            <TouchableOpacity
                style={Style.flatListMainContainer}
                onPress={() => {
                    setSelectedId(item.id ? item.id : item.place_id)
                    setSelectedVenue(item)

                    const venuesTempArray = [...allVenuesArray]
                    venuesTempArray[index].isSelected = !isSelected;

                    setAllVenuesArray(venuesTempArray)
                    setIsSelected(venuesTempArray[index].isSelected)
                    // console.log('check my array===>',drinksList);
                    // console.log('check my array===>3333',drinksListTemp);
                    allVenuesArray.map((item, index) => {
                        if (item.isSelected) {
                            tempData.push(item);
                        }
                    })
                    // setAllVenuesArray(tempData)
                }
                }
            >
                <View style={Style.flatListInnerContainer}>
                    <View style={Style.flatListImageContainer} >
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: getItemUrl(item) }}
                        />
                        {isSelected && <View style={Style.checkImageContainer} >
                            <Image
                                style={Style.checkBoxImageStyle}
                                source={Images.checkMark}
                            />
                        </View>}
                    </View>
                    <View style={{ width: '50%', paddingBottom: 5, marginTop: 10 }}>
                        <Text style={Style.flatListLocationName}>{item.name}</Text>

                        <View style={{ position: "absolute", bottom: 20 }}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                starSize={15}
                                containerStyle={{
                                    width: 30,
                                }}
                                fullStarColor={Colors.black}
                                rating={item.rating || 0.0}
                            // selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                            <Text style={Style.flatListLocation}>{item.description}</Text>
                            <Text style={Style.flatListLocation} >{item.address || item.vicinity}</Text>
                        </View>
                    </View>
                    {/* <View style={Style.arrowContainer}>
                        <Image
                            style={Style.arrowImage}
                            source={Images.forwardIcon}
                        />
                    </View> */}
                </View>
            </TouchableOpacity>
            // </View>
        )
    }

    return (
        <SafeAreaView style={Style.mainContainer}>
            {/* <ScrollView
                contentContainerStyle={{ width: '100%', height: '100%' }}
            // style={{ marginBottom: 450 }}
            > */}
            <ImageBackground source={Images.Splash} style={{ width: '100%', height: '100%' }}>
                <View style={Style.shadowContainer}>
                    <Header
                        headerStyle={{
                            marginBottom: -10
                        }}
                        source={Images.profileAvatar}
                        notificationIcon={Images.NotificationIcon}
                        onProfilePress={() => refRBSheet.current.open()}
                        description={"Suggest a venue"}
                        leftIcon={Images.leftIcon}
                        onPress={() => navigation.goBack()}
                    />
                    {Platform.OS === 'ios' ? <TouchableOpacityGesture
                        onPress={() => setLocationModalVisible(true)}
                    >
                        <CustomInput
                            mainContainer={{
                                width: '90%',
                                alignSelf: 'center',
                            }}
                            editable={false}
                            value={location}
                            placeholder={"Address / Postcode"}
                        />
                    </TouchableOpacityGesture>
                        :
                        <TouchableOpacity
                            onPress={() => setLocationModalVisible(true)}
                        >
                            <CustomInput
                                mainContainer={{
                                    width: '90%',
                                    alignSelf: 'center',
                                }}
                                editable={false}
                                value={location}
                                placeholder={"Address / Postcode"}
                            />
                        </TouchableOpacity>}
                    <View style={Style.mapImageContainer}>
                        {/* <Image
                                resizeMode='stretch'
                                style={{ width: '100%', height: '100%' }}
                                source={Images.mapImage}
                            /> */}
                        <MapView
                            style={[{ width: '100%', height: '100%', }, Style.map]}
                            // provider={PROVIDER_GOOGLE}
                            showsUserLocation
                            initialRegion={initialRegion}
                            region={initialRegion}
                            onRegionChange={onRegionChange}
                        >
                            <Marker
                                coordinate={{
                                    latitude: initialRegion?.latitude,
                                    longitude: initialRegion?.longitude
                                }}
                                title={venueName}
                                description={venueDescription}
                            />
                        </MapView>
                    </View>
                    <View style={Style.filterRowContainer}>
                        <View style={Style.sortByRowContainer}>
                            <Text style={Style.filterSortTextStyle}>{"Sort by"}</Text>
                            <View style={Style.caretContainer}>
                                <TouchableOpacity
                                    style={{ width: 18, height: 18 }}
                                    onPress={() => sortVenues('ascending', allVenuesArray)}
                                >
                                    <Image
                                        style={{ width: '100%', height: '100%', tintColor: Colors.white }}
                                        source={Images.caretUp}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: 18, height: 18 }}
                                    onPress={() => sortVenues('descedning', allVenuesArray)}
                                >
                                    <Image
                                        style={{ width: '100%', height: '100%', tintColor: Colors.white }}
                                        source={Images.caretDown}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={Style.filterContainer}>
                            <TouchableOpacity style={{ flexDirection: 'row' }}
                                onPress={() => locationBottomSheet.current.open()}>
                                <Text style={Style.filterSortTextStyle}>{"Filter"}</Text>
                                <View style={Style.caretContainer}>
                                    <TouchableOpacity
                                        style={{ width: 18, height: 18 }}
                                    >
                                        <Image
                                            style={{ width: '100%', height: '100%', tintColor: Colors.LightGray }}
                                            source={Images.filterIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Style.flatlistView}>
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
                                if (loading) return null
                                else {
                                    return (

                                        <Text style={{
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            color: Colors.white
                                        }}>Loading......</Text>
                                        // <Text style={{
                                        //     alignSelf: 'center',
                                        //     justifyContent: 'center',
                                        //     textAlign: 'center',
                                        //     color: Colors.white
                                        // }}>{"There are no venues found"}</Text>
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
                    </View>
                    {isSelected && <CustomButton
                        mainButtonStyle={Style.buttonContainer}
                        label={"CONTINUE"}
                        onPress={() => navigation.navigate('SendDrink', {
                            selectedVenue: selectedVenue,
                            drinkDetails: drinkDetails
                        })}
                    />}
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
                                height: '68%',
                                width: '100%'
                            },
                            draggableIcon: {
                                backgroundColor: "black"
                            }
                        }}
                    >
                        <BottomSheetComponent
                            onFacilitiesPress={() => {
                                setIsRatingSelected(false)
                                onDistancePress()
                            }}
                            onRatingPress={() => setIsRatingSelected(true)}
                            onSearchPress={() => {
                                if (isRatingSelected) {
                                    searchByRating()
                                    locationBottomSheet.current.close()
                                }
                                else {
                                    locationBottomSheet.current.close()
                                }
                            }}
                            distanceIconStyle={{
                                tintColor: !isRatingSelected ? Colors.blue : Colors.mediumGray
                            }}
                            distanceTextStyle={{
                                color: !isRatingSelected ? Colors.blue : Colors.mediumGray
                            }}
                            starIconStyle={{
                                tintColor: isRatingSelected ? Colors.blue : Colors.mediumGray
                            }}
                            ratingTextStyle={{
                                color: isRatingSelected ? Colors.blue : Colors.mediumGray
                            }}
                        />
                    </RBSheet>
                </View>
                <Loader loading={loading} isShowIndicator={true} />
            </ImageBackground>
            {/* </ScrollView> */}
            <LocationModal
                isVisible={locationModalVisible}
                // onRequestClose={()=>setLocationModalVisible(false)}
                onClosePress={() => setLocationModalVisible(false)}
                onGooglePlacePress={(data, details = null) => {
                    // alert('hello')
                    // fetchDetails = true
                    let tempLocation = { ...initialRegion };
                    tempLocation.latitude = details?.geometry?.location?.lat;
                    tempLocation.longitude = details?.geometry?.location?.lng;
                    setInitialRegion(tempLocation)
                    // console.log(JSON.stringify(details?.geometry?.location));
                    setLocation(data.description)
                    setLocationModalVisible(false)
                    getAllVenues(details?.geometry?.location?.lat, details?.geometry?.location?.lng)
                }}
            />
            {/* {console.log("initialRegion==>>",initialRegion)} */}
        </SafeAreaView>
    )
}

export default SuggestAVenue;