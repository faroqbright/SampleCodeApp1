import React, { useEffect, useRef, useState } from 'react'
import {
    Image,
    ImageBackground,
    TouchableOpacity,
    View,
    Text,
    FlatList,
    SafeAreaView
} from 'react-native'


//Libraries
import RBSheet from "react-native-raw-bottom-sheet";


//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';

//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';
import BottomSheetComponent from '../../Components/BottomSheetComponent'

const data = [
    {
        id: '1',
        Image: Images.resturantOne,
        locationName: "Prince Albert",
        location: "11 Pembridge Rd,\nLondon W11 3HQ"
    },
    {
        id: '2',
        Image: Images.resturantTwo,
        locationName: "Sun in Splender",
        location: "7 Portobello Rd,\nLondon W11 3DA"
    },
    {
        id: '3',
        Image: Images.resturantThree,
        locationName: "Churchill Arms",
        location: "119 Kensington\nChruch St,\nLondon W8 7LN"
    },
]

const PersonLocation = ({ navigation }) => {

    const refRBSheet = useRef();
    const locationBottomSheet = useRef()

    const [selectedLocation, setSelectedLocation] = useState(false)
    const [selectedId, setSelectedId] = useState('')

    const renderItem = ({ item }) => {
        return (

            <TouchableOpacity style={Style.flatListMainContainer}
                onPress={() => {
                    setSelectedId(item.id)
                    setSelectedLocation(!selectedLocation)
                }
                }
            >
                <View style={Style.flatListInnerContainer}>
                    <View style={Style.flatListImageContainer} >
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={item.Image}
                        />
                    </View>
                    {selectedLocation && selectedId == item.id && <Image
                        style={Style.checkBoxImageStyle}
                        source={Images.checkMark}
                    />}
                    <View style={{ width: '50%' }}>
                        <Text style={Style.flatListLocationName}>{item.locationName}</Text>
                        <Text style={Style.flatListLocation} >{item.location}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    useEffect(() => {
        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])

    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground
                source={Images.Splash}
            >
                <View style={Style.shadowContainer}>
                    <Header
                        source={Images.profileAvatar}
                        onProfilePress={() => { refRBSheet.current.open() }}
                        leftIcon={Images.leftIcon}
                        headerStyle={{ marginTop: 15 }}
                        description={"Where is the person you\nare sending the drink?"}
                        onPress={() => navigation.goBack()}
                    />
                    <View style={Style.innerContainer}>
                        <View style={Style.rowContainer}>
                            <CustomInput
                                placeholder={"Location"}
                            />
                            <TouchableOpacity
                                onPress={() => locationBottomSheet.current.open()}
                            >
                                <Image
                                    style={Style.menuIconStyle}
                                    source={Images.menuIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={Style.venueTextStyle}>{"RECOMMENDED VENUES"}</Text>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <CustomButton
                        onPress={() => navigation.navigate('SelectDrink')}
                        label='Continue'
                        mainButtonStyle={[Style.continueButton, {
                            backgroundColor: selectedLocation && selectedId ? Colors.green : 'transparent'
                        }]}
                        btnTextStyle={{ color: selectedLocation && selectedId ? Colors.white : Colors.LightGray }}
                    />
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
                        onLocationPress={() => locationBottomSheet.current.close()}
                        onVenuePress={() => locationBottomSheet.current.close()}
                        onFacilitiesPress={() => locationBottomSheet.current.close()}
                        onRatingPress={() => locationBottomSheet.current.close()}
                        onSearchPress={() => locationBottomSheet.current.close()}
                    />
                </RBSheet>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default PersonLocation;


