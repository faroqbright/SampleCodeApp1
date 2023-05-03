import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Alert,
    Image,
    ImageBackground,
    SafeAreaView,
    Linking
} from "react-native";

// Libraries
import * as Animatable from 'react-native-animatable';


// Custom Files
import Style from "./Style"
import Images from "../../Assets/Images"

// Custom Components
import CustomButton from "../../Components/CustomButton";


const LandingScreen = ({ navigation }) => {

    let duration = 700

    const [animationEnd, setAnimationEnd] = useState(false)

    const onAnimationEnd = () => {
        return (
            setAnimationEnd(true)
        )
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
                        <Animatable.Image
                            animation={'fadeInUpBig'}
                            duration={700}
                            delay={500}
                            source={Images.Skoll}
                            onAnimationEnd={onAnimationEnd}
                            style={{ width: 190, height: 150, resizeMode: 'contain' }}
                        />
                        {/* <Animatable.Image
                            animation={'fadeInUpBig'}
                            duration={700}
                            delay={500}
                            source={Images.SubHeading}
                            onAnimationEnd={onAnimationEnd}
                            style={{ width: '60%', height: 45, resizeMode: 'contain', marginBottom: 'auto' }}
                        /> */}
                        <Animatable.Text style={Style.subHeadingString}
                            animation={'fadeInUpBig'}
                            duration={700}
                            delay={500}
                            onAnimationEnd={onAnimationEnd}
                        >
                            {"This one's on me,\nConnect with friends and family"}
                        </Animatable.Text>

                    </View>
                    {animationEnd && <View style={Style.buttonContainer}>
                        <CustomButton
                            mainButtonStyle={{ marginTop: 50 }}
                            onPress={() => navigation.navigate('LoginScreen')}
                            label={"LOGIN"}
                        />
                        <Text style={Style.orText}>{"- or -"}</Text>
                        <CustomButton
                            mainButtonStyle={Style.registerButtonStyle}
                            onPress={() => navigation.navigate('SignUpScreen')}
                            label={"REGISTER"}
                        />
                        <CustomButton
                            mainButtonStyle={Style.venueButtonStyle}
                            // onPress={() => Linking.openURL('https://dev-skoll.aureusventures.co.uk/venue/signup')}
                            onPress={() => Linking.openURL('https://stage.skoll-app.com/venue/signup')}
                            label={"SIGN UP AS A VENUE"}
                        />
                    </View>}
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default LandingScreen;