import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Style from './Style'
import Images from '../../Assets/Images'
import CustomButton from '../../Components/CustomButton'
import Colors from '../../Utils/Colors'

const ThankYou = ({navigation}) => {

    const [sendDrink, setSendDrink] = useState(false)
    const [claimDrink, setClaimDrink] = useState(false)

    return (
        <View style={Style.mainContainer}>
            <ImageBackground
                style={{ width: '100%', height: '100%' }}
                source={Images.Splash}
            >
                <View style={Style.shadowContainer}>
                    <View style={Style.headingContainer}>
                        <Text style={Style.mainHeading}>{"Skoll!"}</Text>
                        <Text style={Style.subHeading}>{"Thank you\nfor registering!"}</Text>
                    </View>
                    <Text style={Style.descriptionStyle}>{"What would you like to do?"}</Text>
                    <CustomButton
                        onPress={() => {
                            if (claimDrink) {
                                setClaimDrink(!claimDrink)
                                setSendDrink(!sendDrink)
                            }
                            else {
                                setSendDrink(!sendDrink)
                            }
                        }}
                        mainButtonStyle={
                            [Style.drinkButtonStyle,
                            {
                                backgroundColor: sendDrink ? Colors.blue : 'transparent',
                                borderColor: sendDrink ? Colors.blue : Colors.white
                            }]
                        }
                        label={"SEND A DRINK"}
                    />
                    <CustomButton
                        onPress={() => {
                            if (sendDrink) {
                                setSendDrink(!setSendDrink)
                                setClaimDrink(!claimDrink)
                            }
                            else {
                                setClaimDrink(!claimDrink)
                            }
                        }}
                        mainButtonStyle={
                            [Style.drinkButtonStyle,
                            {
                                backgroundColor: claimDrink ? Colors.blue : 'transparent',
                                borderColor: claimDrink ? Colors.blue : Colors.white
                            }]
                        }
                        label={"CLAIM A DRINK"}
                    />
                    <TouchableOpacity
                        style={Style.browsingButtonStyle}
                        onPress={() => ''}
                    >
                        <Text style={Style.browsingButtonTextStyle}>{"JUST BROWSING!"}</Text>
                    </TouchableOpacity>

                    <CustomButton
                        onPress={() => {
                            if (sendDrink) {
                                navigation.navigate('SendDrink')
                            }
                            else {
                                navigation.navigate('ClaimADrink')
                            }
                        }}
                        mainButtonStyle={
                            [Style.continueButtonStyle, {
                                backgroundColor: sendDrink || claimDrink ? Colors.green : 'transparent',
                                borderColor: sendDrink || claimDrink ? Colors.green : Colors.white
                            }]
                        }
                        label={"CONTINUE"}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

export default ThankYou;


