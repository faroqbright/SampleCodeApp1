import React, { useState, useRef, useEffect } from 'react'
import {
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native'


//Libraries
import RBSheet from "react-native-raw-bottom-sheet";
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

//Files
import Style from './Style'
import Images from '../../Assets/Images'

//Components
import Header from '../../Components/Header'
import CustomButton from '../../Components/CustomButton'
import Colors from '../../Utils/Colors'
import CustomModal from '../../Components/CustomModal'
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';
import Loader from '../../Components/Loader';

// Api endpoints
import { getAllOffersApi, getDrinkCategories, getOffersBySearch } from '../../api/methods/auth';
import CustomInput from '../../Components/CustomInput';

const data = [
    {
        id: '1',
        image: Images.resturantOne,
        title: "This is offer",
        description: "This is static description",
        resturantName: 'Resturant 1',
        resutrantAddress: "309 Aerro Lane, London"
    }
]

const SearchOffers = ({ navigation }) => {

    const isFocused = useIsFocused()
    const refRBSheet = useRef();
    const timeoutRef = useRef(null)

    const [selectedDrink, setSelectedDrink] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedDrinksList, setSelectedDrinksList] = useState([])
    const [allOffers, setAllOffers] = useState('')
    const [searchOffers, setSearchOffers] = useState('')

    useEffect(() => {
        searchOffersApi()
        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])


    const searchOffersApi = async (searchText) => {
        setLoading(true)
        try {
            const response = await getOffersBySearch(searchText)
            setAllOffers(response?.data?.data)
        } catch (error) {
            console.log("search api error===>>", error?.response?.data);
        } finally {
            setLoading(false)
        }
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={Style.flatListMainContainer}
                onPress={() => navigation.navigate('SearchOffersDetail', { item: item })}
            >
                <View style={Style.imageContainer}>
                    <Image
                        style={{
                            width: '100%',
                            height: '100%',
                            // borderRadius: 5,
                            alignSelf: 'center',
                        }}
                        resizeMode='cover'
                        source={{ uri: item?.image }}
                    />
                </View>
                <View style={Style.descriptionTextContainer}>
                    <Text style={Style.descriptionText}>{item?.title}</Text>
                    <Text style={Style.subDescriptionText}>{item?.description}</Text>
                    <Text style={Style.descriptionText}>{"Venue Name"}</Text>
                    <Text style={Style.subDescriptionText}>{item?.venue?.name}</Text>
                    <Text style={Style.descriptionText}>{item?.price}</Text>
                </View>
            </TouchableOpacity >

        )
    }

    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground source={Images.Splash}>
                <View style={Style.shadowContainer}>
                    <Header
                        // source={Images.profileAvatar}
                        onProfilePress={() => refRBSheet.current.open()}
                        leftIcon={Images.leftIcon}
                        description={"Search offers"}
                        notificationIcon={Images.NotificationIcon}
                        onPress={() => navigation.goBack()}
                    />
                    <CustomInput
                        mainContainer={Style.inputContainer}
                        placeholder={"Search Offers"}
                        value={searchOffers}
                        onChangeText={
                            (text) => {
                                clearTimeout(timeoutRef.current)
                                setSearchOffers(text)
                                timeoutRef.current = setTimeout(() => {
                                    searchOffersApi(text)
                                }, 500)
                            }}
                    />
                    <FlatList
                        style={{ margin: 5 }}
                        data={allOffers}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
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
                                    }}>{"There are no offers found"}</Text>
                                )
                            }
                        }}
                    />

                    {selectedDrink && <CustomButton
                        mainButtonStyle={Style.buttonContainer}
                        label={"CONTINUE"}
                        onPress={() => navigation.navigate('SuggestAVenue', { drinkDetails: selectedDrinksList })}
                    />}
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
                            borderRadius: 25,
                            // borderColor:'transparent',
                            // borderWidth: 1,
                            // borderColor: 'red',
                            width: '100%',
                            alignSelf: 'center'
                        },
                        container: {
                            alignSelf: 'center',
                            // backgroundColor:"red",
                            // borderRadius: 20,
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
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default SearchOffers;


