//auth actions...
import {
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_RESPONSE,
  SIGNIN_RESPONSE,
  USER_SESSION_CHANGE_STATE,
  PREFERRED_INDUSTRY,
  PREFERRED_JOB_TYPE,
  SELECTEDSCREEN,
  LANDINGTOPROFILE,
  SCREENNAME,
  FCMTOKEN,
  ALLPHONECONTACTS,
  PAYPALLIVE,
} from './types';

export const logoutUser = () => ({
  type: LOGOUT
})

export const signupRequest = (payload) => ({
  type: SIGNUP_REQUEST,
  payload,
});

export const signupResponse = (response) => ({
  type: SIGNUP_RESPONSE,
  response,
});

export const signInResponse = (response) => ({
  type: SIGNIN_RESPONSE,
  response,
})

export const onUserSessionChangeState = (payload) => ({
  type: USER_SESSION_CHANGE_STATE,
  payload,
})

export const preferredIndustry = (payload) => ({
  type: PREFERRED_INDUSTRY,
  payload,
})

export const preferredJobType = (payload) => ({
  type: PREFERRED_JOB_TYPE,
  payload
})

export const selectedScreen = (payload) => ({
  type: SELECTEDSCREEN,
  payload
})
export const landingToProfile = (payload) => ({
  type: LANDINGTOPROFILE,
  payload
})
export const ScreenName = (payload) => ({
  type: SCREENNAME,
  payload
})
export const StoreFcmToke = (payload) => ({
  type: FCMTOKEN,
  payload
})
export const allPhoneContacts = (payload) => ({
  type: ALLPHONECONTACTS,
  payload
})
export const payPalLive = (payload) => ({
  type: PAYPALLIVE,
  payload
})