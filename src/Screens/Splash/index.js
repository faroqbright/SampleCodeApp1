import React, { useEffect, useState, useRef } from 'react'
import { Image, ImageBackground, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'

import { Style } from './Style';
import Images from '../../Assets/Images';

import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux'


const Splash = ({ navigation }) => {
    // const popupRef = useRef(null)

    const isFocused = useIsFocused()
    const dispatch = useDispatch()    

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('AfterSplash')
        }, 3000)
    }, [isFocused])

    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground
                style={Style.splashBackGround}
                source={Images.Splash}
            >
                <View style={Style.shadowContainer}>
                    <View style={Style.logoContainer}>
                        <Image
                            source={Images.Skoll}
                            style={{ width: '70%', height: 375, resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={Style.subHeadingContainer}>
                        <Text style={Style.subHeadingString}>{"This one's on me,\nConnect with friends and family"}</Text>
                    </View>
                </View>

            </ImageBackground>
        </SafeAreaView>
    )
}

export default Splash;


