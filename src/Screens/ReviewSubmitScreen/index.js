import React, { useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native'

//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';

//Components
import Header from '../../Components/Header';
import CustomButton from '../../Components/CustomButton';


const ReviewSubmitScreen = ({ navigation, route }) => {

    const rating = route?.params?.rating

    console.log('rating===>>',rating);

    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground
                source={Images.friendsCheering}
            >
                <View style={Style.shadowContainer}>
                    <View style={Style.headerContainer}>
                        <TouchableOpacity
                            style={Style.homeIconContainer}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                    tintColor: Colors.white,
                                    alignSelf: 'flex-start'
                                }}
                                source={Images.bottomHomeIcon}
                            />
                        </TouchableOpacity>
                        <Image
                            style={{
                                width: 250,
                                height: 120,
                                alignSelf: 'center',
                                resizeMode: 'contain'
                            }}
                            source={Images.Skoll}
                        />
                    </View>
                    <View style={Style.innerContainer}>
                        <View style={Style.checkImageContainer}>
                            <Image
                                source={Images.checkMark}
                                style={Style.checkMarkStyle}
                            />
                        </View>
                        <View style={Style.successTextContainer}>
                            <Text style={Style.successTextStyle}>{"Your reviw has been submitted"}</Text>
                        </View>
                    </View>
                    <View style={Style.starButtonContainer}>
                        <Text style={Style.labelText}>{rating}</Text>
                        <Image
                            // resizeMode='contain'
                            style={Style.iconContainer}
                            source={Images.starIcon}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default ReviewSubmitScreen;