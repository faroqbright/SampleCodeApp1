import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    SafeAreaView
} from 'react-native';

// Libraries
import { StackActions, useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';


//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import Loader from '../../Components/Loader';

// API Endpoints
import { deleteAccount } from '../../api/methods/auth';

// Redux Imports
import { logoutUser, signInResponse } from '../../redux/actions/userSession'
import { useDispatch, useSelector } from 'react-redux';

const DeleteAccountScreen = ({ navigation }) => {

    const { currentUser } = useSelector(state => state.userSession)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)


    const onDeletePress = async () => {
        setLoading(true)
        try {
            const response = await deleteAccount(currentUser?.access_token)
            if (response.status == 200) {
                dispatch(logoutUser())
                Toast.show(response.data.message)
            }
        } catch (error) {
            console.log('error==>>>', error.response.data);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground
                // resizeMode="contain"
                source={Images.friendsCheering}
                style={Style.imageBackGround}
            >
                <View style={Style.shadowContainer}>
                    <View style={Style.headingContainer}>
                        <Header
                            leftIcon={Images.leftIcon}
                            onPress={() => navigation.goBack()}
                            headerStyle={Style.headerStyle}
                        />
                    </View>
                    <View style={Style.bottomContainer}>

                        <View style={Style.bottomInnerainContainer}>
                            <Text style={Style.mainHeading}>
                                {"Delete Account"}
                            </Text>
                            <Text style={Style.description}>{"Are you sure you want to delete\nAccount?"}</Text>
                            <CustomButton
                                mainButtonStyle={Style.loginButtonStyle}
                                btnTextStyle={Style.loginButtonTextStyle}
                                label={"DELETE"}
                                onPress={() => onDeletePress()}
                            />
                        </View>


                    </View>
                </View>
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    );
};

export default DeleteAccountScreen;

