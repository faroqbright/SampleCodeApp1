import { StyleSheet } from "react-native";

import Colors from "../../Utils/Colors";

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // padding: 10,
        backgroundColor: Colors.black,
    },
    shadowContainer: {
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: "rgba(10, 10, 10,0.5)",
        // backgroundColor:"red"
    },
    innerContainer: {
        width: '100%',
        // backgroundColor:'red',
        // padding: 10,
        // marginTop: 20,
        alignItems: 'center',
        height: '80%'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '90%',
        alignSelf: 'center',
        // padding: 10,
        alignItems: 'center'
    },
    menuIconStyle: {
        width: 35,
        height: 35,
        tintColor: Colors.white,
        // backgroundColor:'red',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    flatListMainContainer: {
        width: '90%',
        // height: 150,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: "rgba(239,239,239,0.6)",
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10

    },
    flatListInnerContainer: {
        width: "90%",
        alignSelf: 'center',
        flexDirection: 'row',

    },
    flatListLocationName: {
        color: Colors.black,
        fontFamily: 'JosefinSans-Bold',
        fontSize: 15,
        // marginTop: '5%'
    },
    flatListLocation: {
        color: Colors.black,
        // backgroundColor:'red',
        // width: '85%',
        fontSize: 13,
        marginBottom: -12
    },

    mapImageContainer: {
        width: '85%',
        alignSelf: 'center',
        height: 130,
        marginTop: 15,
        borderRadius: 15
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    flatListImageContainer: {
        width: 120,
        height: 120,
        // backgroundColor:'red',
        borderWidth: 3,
        borderRadius: 5,
        borderColor: Colors.white,
        marginRight: 20,
    },
    filterRowContainer: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
    },
    sortByRowContainer: {
        flexDirection: 'row',
        width: 100,
        height: 50,
        alignItems: 'center'
    },
    filterSortTextStyle: {
        fontSize: 18,
        justifyContent: 'center',
        color: Colors.white,
        fontFamily: 'JosefinSans-SemiBold'
    },
    caretContainer: {
        marginLeft: 15,
        marginTop: 5,
        alignSelf: 'center',
        alignItems: 'center'
    },
    filterContainer: {
        width: 100,
        height: 50,
        marginLeft: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
    },
    flatlistView: {
        width: '100%',
        height: 280,
        marginTop: 5,
        alignSelf: 'center',
    },
    buttonContainer: {
        backgroundColor: Colors.green,
        position: 'absolute',
        zIndex: 9999,
        bottom: 65
    },
    checkImageContainer: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: "rgba(10, 10, 10,0.4)",
        width: '100%',
        height: '100%',
        // top:10,
        borderRadius: 10,
    },
    checkBoxImageStyle: {
        width: 60,
        height: 80,
        marginTop: '10%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: '10%',
        tintColor: Colors.white
    },
    arrowContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        marginBottom: 10
    },
    arrowImage: {
        width: 15,
        height: 25,
        marginLeft: 5,
        tintColor: Colors.white,
        marginTop: 5
    }
})

export default Style;