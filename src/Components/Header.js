import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//Files 
import Images from '../Assets/Images';
import Colors from '../Utils/Colors';

// Libraries
import { useIsFocused } from '@react-navigation/native';

//Redux imports 
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/userSession';

// API Endpoints
import { getProfileApi } from '../api/methods/auth';

const Header = (props) => {

    const { currentUser, isSignedIn } = useSelector(state => state.userSession)

    const dispatch = useDispatch()

    const isFocused = useIsFocused()

    const [userInfo, setUserInfo] = useState('')

    const getUserProfile = async () => {
        try {
            const response = await getProfileApi(currentUser?.user_id)
            setUserInfo(response.data.data)
        } catch (error) {
            if (error?.response?.data?.error?.message == "Token has been expired.") {
                dispatch(logoutUser())
            }
        }
    }

    useEffect(() => {
        if (isSignedIn) {
            getUserProfile()
        }
    }, [isFocused])

    return (
        <View style={[styles.headerContainer, props.headerStyle]}>
            <View style={styles.upperRowContainer}>
                {props.notificationIcon && <TouchableOpacity
                    style={[styles.notificationContainer, {
                        backgroundColor: props.notificationIcon ? 'gray' : ' transparent',

                    }]}
                    onPress={props.onNotificationPress}>
                    <Image
                        resizeMode='contain'
                        style={styles.notificationIconStyle}
                        source={props.notificationIcon}
                    />
                </TouchableOpacity>}
                {isSignedIn && <TouchableOpacity
                    style={styles.profileIconView}
                    onPress={props.onProfilePress}>
                    <Image
                        resizeMode='cover'
                        style={styles.avatarIconStyle}
                        source={userInfo ? { uri: userInfo.profile_picture } : Images.profileAvatar}
                    />
                </TouchableOpacity>}
            </View>
            <View style={styles.innerContainer}>
                <TouchableOpacity
                    style={styles.backButtonContainer}
                    onPress={props.onPress}>
                    <Image
                        source={props.leftIcon}
                        style={{ width: 25, height: 25, tintColor: Colors.white, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
                <Image
                    style={{
                        width: 150,
                        height: 80,
                        resizeMode: 'contain',
                    }}
                    source={Images.Skoll}
                />
                {props.onSettingPress && <TouchableOpacity
                    style={styles.settingButtonContainer}
                    onPress={props.onSettingPress}>
                    <Image
                        source={Images.settingIcon}
                        style={{ width: 30, height: 30, tintColor: Colors.white, }}
                    />
                </TouchableOpacity>}
                {!props.onSettingPress && <View style={styles.backButtonContainer} />}
            </View>
            <View style={{ width: '100%', }}>
                <Text style={styles.subHeading}>{props.description}</Text>
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        paddingTop:5,
        paddingRight: 5,
    },
    upperRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    innerContainer: {
        width: '100%',
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backButtonContainer: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingButtonContainer: {
        width: 50,
        height: 50,
        marginBottom: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainHeading: {
        alignSelf: 'center',
        color: Colors.white,
        fontSize: 80,
        fontFamily: 'Roboto-BoldItalic',
    },
    subHeading: {
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        letterSpacing: 0.5
    },
    notificationContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 20,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileIconView: {
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'flex-end',
    },
    notificationIconStyle: {
        width: 25,
        height: 25,
        tintColor: Colors.white
    },
    avatarIconStyle: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
})
