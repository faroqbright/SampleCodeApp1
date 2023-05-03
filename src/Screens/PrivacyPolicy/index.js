import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, useWindowDimensions, ScrollView } from 'react-native'

// Files
import Style from './Style'
import Images from '../../Assets/Images'

// Components
import Loader from '../../Components/Loader'

// Libraries
import RenderHtml from 'react-native-render-html';
import { useIsFocused } from '@react-navigation/native'

// API Endpoints
import { getPrivacyPolicyApi } from '../../api/methods/auth'

const PrivacyPolicy = ({ navigation }) => {

    const isFocused = useIsFocused()

    const [loading, setLoading] = useState(false)
    const [privacyPolicy, setPrivacyPolicy] = useState('')

    useEffect(() => {
        getPrivacyPolicy()
    }, [isFocused])


    const getPrivacyPolicy = async () => {
        setLoading(true)
        try {
            const response = await getPrivacyPolicyApi()
            setPrivacyPolicy(response?.data?.data?.description)
        } catch (error) {
            console.log('error====>>', error?.response?.data);
        }
        finally {
            setLoading(false)
        }
    }

    const source = {
        html: privacyPolicy
    }

    return (
        <View style={Style.mainContainer}>
            <View style={Style.upperContainer}>
                <TouchableOpacity style={{ width: '8%' }} onPress={()=>navigation.goBack()}>
                    <Image
                        style={{ width: 20, height: 20 }}
                        source={Images.leftArrowIcon}
                    />
                </TouchableOpacity>
                <View style={Style.titleContainer}>
                    <Text style={Style.title}>{"Privacy Policy"}</Text>
                </View>
            </View>
            <ScrollView style={{height:'100%', paddingHorizontal:10}}>
                <RenderHtml
                    contentWidth={useWindowDimensions}
                    source={source}
                />
            </ScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </View>
    )
}

export default PrivacyPolicy;