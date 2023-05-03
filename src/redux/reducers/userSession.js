import {
  LOGOUT,
  SET_USER,
  SIGNUP_RESPONSE,
  SET_PASSWORD,
  SET_PROFILEIMAGE,
  SET_PREFERENCE,
  SIGNIN_RESPONSE,
  USER_SESSION_CHANGE_STATE,
  PREFERRED_INDUSTRY,
  PREFERRED_JOB_TYPE,
  SELECTEDSCREEN,
  LANDINGTOPROFILE,
  EXPLOREOFFERS,
  SCREENNAME,
  FCMTOKEN,
  ALLPHONECONTACTS,
  PAYPALLIVE
} from '../actions/types';

const INITIAL_STATE = {
  currentUser: null,
  routeToSignIn: true,
  isSignedIn: false,
  authenticationToken: '',
  userEmail: '',
  userPassword: '',
  profileImage: '',
  isOnboardingVisited: false,
  isProfieCompleted: false,
  profileData: null,
  hasProfileChanges: false,
  isPreferredIndustry: '',
  isPreferredJobType: '',
  isSelectedScreen: false,
  isLandingToProfile: false,
  screenName: '',
  isPayPal: false
};


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_SESSION_CHANGE_STATE:
      return {
        ...state,
        ...action.payload,
        isProfieCompleted: true
      };
    case LOGOUT:
      return {
        ...INITIAL_STATE,
        isSignedIn: false
        // userEmail: state.userEmail,
        // userPassword: state.userPassword,
        // isOnboardingVisited: state.isOnboardingVisited
      };
    case SIGNUP_RESPONSE:
      return {
        ...state,
        currentUser: action.response.userData,
        authenticationToken: action.response.token,
        isSignedIn: true,
      };
    case SIGNIN_RESPONSE:
      // console.log("Reducer", action)
      return {
        ...state,
        currentUser: action.response.userData,
        authenticationToken: action.response,
        isSignedIn: true,
        isProfieCompleted: action.response.isProfieCompleted
      }

    case SET_PASSWORD:
      return {
        ...state,
        userEmail: action.payload.email,
        userPassword: action.payload.password,
      };
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isSignedIn: true,
        authenticationToken: action.payload.access_token,
      };
    case SET_PROFILEIMAGE:
      return {
        ...state,
        profileImage: action.response,
      };
    case SET_PREFERENCE:
      return {
        ...state,
        marketingPreference: action.response,
      };
    case PREFERRED_INDUSTRY:
      return {
        ...state,
        isPreferredIndustry: action.payload
      }
    case PREFERRED_JOB_TYPE:
      return {
        ...state,
        isPreferredJobType: action.payload
      }

    case SELECTEDSCREEN:
      return {
        ...state,
        isSelectedScreen: action.payload
      }
    case LANDINGTOPROFILE:
      return {
        ...state,
        isLandingToProfile: action.payload
      }
    case SCREENNAME:
      return {
        ...state,
        screenName: action.payload
      }
    case FCMTOKEN:
      return {
        ...state,
        fcmToken: action.payload
      }
    case ALLPHONECONTACTS:
      return {
        ...state,
        phoneContacts: action.payload
      }
    case PAYPALLIVE:
      return {
        ...state,
        isPayPal: action.payload
      }
    default:
      return state;
  }
}
