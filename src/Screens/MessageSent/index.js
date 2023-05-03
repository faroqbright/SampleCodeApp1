import React, { useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image
} from 'react-native'

//Files
import Style from './Style';
import Images from '../../Assets/Images';

//Components
import Header from '../../Components/Header';
import CustomButton from '../../Components/CustomButton';

const MessageSent = ({ navigation, route }) => {

    const selectedDrinkId = route?.params?.selectedDrinkId

    return (
        <View style={Style.mainContainer}>
            <ImageBackground
                source={Images.friendsCheering}
            >
                <View style={Style.shadowContainer}>
                    <Header
                        leftIcon={Images.leftIcon}
                        headerStyle={{ marginTop: 15 }}
                        onPress={() => navigation.goBack()}
                    />
                    <View style={Style.innerContainer}>
                        <View style={Style.checkImageContainer}>
                            <Image
                                source={Images.checkMark}
                                style={Style.checkMarkStyle}
                            />
                        </View>
                        <View style={Style.successTextContainer}>
                            <Text style={Style.successTextStyle}>{"Your drink gift amount has been\ntransferred to your bank account"}</Text>
                            {/* <Text style={Style.successTextStyle}>{"You have sent a bottle\nof beer Joe Bloggs"}</Text> */}
                        </View>
                    </View>
                    <CustomButton
                        mainButtonStyle={Style.buttonContainer}
                        label={"SAY THANK YOU"}
                        onPress={() => navigation.navigate('ThankyouMessageScreen', { selectedDrinkId: selectedDrinkId })}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

export default MessageSent;