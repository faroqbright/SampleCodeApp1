import React, { useState, useRef, useEffect } from 'react'
import {
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'

//Libraries
import RBSheet from "react-native-raw-bottom-sheet";
import { useIsFocused } from '@react-navigation/native';
import ImageOverlay from "react-native-image-overlay";

//Files
import Style from './Style'
import Images from '../../Assets/Images'
import Colors from '../../Utils/Colors'

//Components
import Header from '../../Components/Header'
import CustomButton from '../../Components/CustomButton'
import UserProfileBSComponent from '../../Components/UserProfileBSComponent';
import Loader from '../../Components/Loader';

// Api endpoints
import { getDrinkCategories } from '../../api/methods/auth';


const SelectDrink = ({ navigation }) => {

    const isFocused = useIsFocused()
    const refRBSheet = useRef();

    const [drinksList, setDrinksList] = useState([])
    const [selectedDrink, setSelectedDrink] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedDrinksList, setSelectedDrinksList] = useState([])

    useEffect(() => {
        setSelectedDrink(false)
        getAllDrinks()
        if (!isFocused)
            refRBSheet.current.close()
    }, [isFocused])

    const getAllDrinks = async () => {
        try {
            setLoading(true)
            const response = await getDrinkCategories()
            setDrinksList(response.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)

            console.log("error==>>", error)
        }
    }

    const renderItem = ({ item, index }) => {
        const isSelected = item.isSelected === true;
        let tempData = [];
        return (

            <TouchableOpacity
                onPress={() => {
                    const drinksListTemp = [...drinksList]
                    drinksListTemp[index].isSelected = !isSelected;

                    setDrinksList(drinksListTemp)
                    setSelectedDrink(drinksListTemp[index].isSelected)
                    // console.log('check my array===>',drinksList);
                    // console.log('check my array===>3333',drinksListTemp);
                    drinksList.map((item, index) => {
                        if (item.isSelected) {
                            tempData.push(item);
                        }
                    })
                    setSelectedDrinksList(tempData)
                }}
                style={[Style.itemImageContainer, { width: '47%', }]} >
                <View style={{ width: "100%", height: '85%', }}>
                    <ImageBackground
                        resizeMode='cover'
                        style={{ width: '100%', height: '100%', }}
                        imageStyle={{ borderRadius: 10}}
                        source={{ uri: item.image }}
                    >
                        <View style={Style.nameContainer}>
                            <Text style={Style.nameText}>{item.name}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ width: '100%', height: "15%", }}>
                    <View style={Style.priceContainer}>
                        <Text style={Style.priceText}>{"£" + item.price}</Text>
                    </View>
                </View>
                {/* <ImageOverlay
                    source={{ uri: item.image }}
                    containerStyle={{ height: '100%', width: '100%', }}
                    overlayColor={Colors.black}
                    rounded={10}
                    blurRadius={0.5}
                    overlayAlpha={1}
                    title={item.name}
                    titleStyle={{ color: "white", fontWeight: 'bold', fontSize: 20 }}
                    contentPosition={'bottom'}
                />
                {isSelected &&
                    <View style={Style.checkImageContainer} >
                        <Image
                            style={Style.checkBoxImageStyle}
                            source={Images.checkMark}
                        />
                    </View>} */}
                {/* <ImageBackground source={{ uri: item.image }}  imageStyle={{ borderRadius: 10}} style={{ width: '100%', height: '100%',overflow: 'hidden' }} resizeMode={'cover'} >
                        <View style={Style.shadowContainer2}> */}
                {
                    isSelected &&
                    <View style={Style.checkImageContainer} >
                        <Image
                            style={Style.checkBoxImageStyle}
                            source={Images.checkMark}
                        />
                    </View>
                }

                {/* </View> */}
                {/* // </ImageBackground> */}
                {/* <View style={Style.priceContainer}>
                    <Text style={Style.priceText}>{"£" + item.price}</Text>
                </View> */}

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
                        description={"Select a drink"}
                        notificationIcon={Images.NotificationIcon}
                        onNotificationPress={() => navigation.navigate('NotificationScreen')}
                        onPress={() => navigation.goBack()}
                    />
                    <FlatList
                        style={{ margin: 5 }}
                        numColumns={2}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={drinksList}
                        renderItem={renderItem}
                        contentContainerStyle={{
                            // flexGrow: 1,
                            // backgroundColor:'pink',
                            alignSelf: 'center',
                            paddingHorizontal: 10,
                            marginTop: 25,
                            paddingVertical: 20,
                            width: '100%',
                            justifyContent: 'space-evenly',
                            paddingBottom: 50
                            // backgroundColor: 'pink'

                        }}
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
                                    }}>{"There are no drinks found"}</Text>
                                )
                            }
                        }}
                    />
                    {selectedDrink && <CustomButton
                        mainButtonStyle={Style.buttonContainer}
                        label={"CONTINUE"}
                        onPress={() => navigation.navigate('SuggestAVenue', { drinkDetails: selectedDrinksList })}
                    />}
                    <View style={{ height: 30, marginBottom: 50 }}></View>
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

export default SelectDrink;


