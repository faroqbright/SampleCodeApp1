import axios from 'axios';

import { store } from '../redux'
// import { showErrorMsg } from '../utils'

// const ROOT_URL = 'https://dev-skoll.aureusventures.co.uk'; // dev server
const ROOT_URL = 'https://stage.skoll-app.com'; // staging server


const BASE_URL = `${ROOT_URL}/api`;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    const { authenticationToken } = store.getState().userSession;
    // console.log("Authorization---",authenticationToken)
    if (authenticationToken) {
      requestConfig.headers = {
        'Authorization': `Bearer ${authenticationToken.token}`,
      };
    }
    return requestConfig;
  },
  (err) => {
    // showErrorMsg(err);
    return Promise.reject(err);
  },
);

export {
  ROOT_URL,
  BASE_URL,
  client,
};
