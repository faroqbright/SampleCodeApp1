import { StyleSheet } from 'react-native';

import Colors from '../../Utils/Colors';

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    imageBackGround: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop:'50%'
    },
    shadowContainer: {
        // flex:1,
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(10, 10, 10,0.5)",
        // tintColor:('rgba',68, 66, 65,0.6)

    },
    headingContainer: {
        width: '100%',
        height: '35%',
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop:5
    },
    headerStyle: {
        marginBottom: 'auto'
    },
    innerHeadingContainer: {
        width: '90%',
        alignSelf: 'center',
        // flexDirection:'row'
    },
    bottomContainer: {
        width: '100%',
        height: '70%',
        marginTop: 'auto',
        backgroundColor: Colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    headinContainer: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    headingText: {
        color: Colors.black,
        margin: 5,
        textAlign: 'center',
        fontFamily: "JosefinSans-Bold",
        fontSize: 28
    },
    flatListContainer: {
        elevation: 2,
        backgroundColor: Colors.white,
        borderRadius: 5,
        width: '90%',
        // height:80,
        alignSelf: 'center',
        borderColor: Colors.LightGray,
        borderBottomWidth: 0.5,
    },
    flatListInnerContainer: {
        width: '100%',
        marginTop: 15,
        flexDirection: 'row',
        borderRadius: 15,
    },
    leftContainer: {
        width: '70%',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    bottomFlatListContainer: {
        width: '50%',
        // alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10
    },
    accountNameText: {
        alignSelf: 'center',
        marginLeft: 15
    },
    cardNumberText: {
        alignSelf: 'center',
        marginLeft: 10
    },
    editButton: {
        // width:80,
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 15
    },
    editCardText: {
        color: Colors.blue,
        fontWeight: 'bold',
        fontSize: 13
    },
    container: {
        backgroundColor: '#303030',
        alignSelf: 'center',
        // height: 300,
        width: '90%',
        alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 20,
        // marginTop:'50%'
    },
    containerHeader: {
        fontFamily: 'JosefinSans-Bold',
        fontSize: 16,
        // textAlign: 'auto',
        // marginBottom: 'auto',
        marginTop: 20,
        color: Colors.blue,
        textAlign: 'center',
    },
    cardContainer: {
        width: '90%',
        // height: 220,
        borderRadius: 15,
        padding: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
    cardNumber: {
        color: Colors.white,
        fontSize: 25,
        marginTop: 5,
        // textAlign: 'center'
    },
    expiryText: {
        color: Colors.white,
        fontSize: 18,
        marginTop: 5,
    },
    balanceText: {
        color: Colors.white,
        fontSize: 16,
        marginTop: 12,
        marginLeft: 10,
        textAlign: 'center'
    },
    cardNumberHeading: {
        fontFamily: 'JosefinSans-Bold',
        fontSize: 18,
        marginTop: 10,
        color: Colors.white
    },
    cvcRowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: Colors.white,
        marginLeft: 'auto',
        borderRadius: 10
    },
    visaImage: {
        width: 50,
        height: 50,
        alignSelf: 'center',
    },
    emptyComponentMessageText: {
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: Colors.black
    }
})

export default Style;