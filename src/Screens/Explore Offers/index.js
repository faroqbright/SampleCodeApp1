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
import { getAllOffersApi, getDrinkCategories } from '../../api/methods/auth';

const ExploreOffers = ({ navigation }) => {

    const isFocused = useIsFocused()
    const refRBSheet = useRef();


    const [selectedDrink, setSelectedDrink] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedDrinksList, setSelectedDrinksList] = useState([])
    const [allOffers, setAllOffers] = useState('')

    const getAllOffers = async () => {
        try {
            setLoading(true)
            const response = await getAllOffersApi()
            setAllOffers(response.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('errorr==>>', error)
        }
    }

    const renderItem = ({ item, index }) => {
        return (

            <TouchableOpacity
                style={Style.flatListMainContainer}
                onPress={() => navigation.navigate('OffersDetailScreen', { item: item })}
            >
                <View style={Style.imageContainer}>
                    <Image
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 5,
                            alignSelf: 'center',
                        }}
                        resizeMode='contain'
                        source={{ uri: item?.image }}
                    />
                </View>
                <View style={Style.descriptionTextContainer}>
                    <Text style={Style.descriptionText}>{item.title}</Text>
                    <Text style={Style.subDescriptionText}>{item.description}</Text>
                </View>
            </TouchableOpacity >

        )
    }

    useEffect(() => {
        getAllOffers()
        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])

    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground source={Images.Splash}>
                <View style={Style.shadowContainer}>
                    <Header
                        // source={Images.profileAvatar}
                        onProfilePress={() => refRBSheet.current.open()}
                        leftIcon={Images.leftIcon}
                        description={"Explore offers"}
                        notificationIcon={Images.NotificationIcon}
                        onPress={() => navigation.goBack()}
                    />
                    <FlatList
                        style={{ margin: 5 }}
                        data={allOffers}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
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

export default ExploreOffers;


