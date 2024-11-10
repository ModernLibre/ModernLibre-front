'use client'

import Sdk from 'casdoor-js-sdk';

let casdoorSDK: Sdk | null = null;

export function initCasdoorSDK() {
  if (typeof window === 'undefined') return null;
  
  if (!casdoorSDK) {
    const sdkConfig = {
        serverUrl: process.env.NEXT_PUBLIC_CASDOOR_SERVER_URL || '',
        clientId: process.env.NEXT_PUBLIC_CASDOOR_CLIENT_ID || '',
        //clientSecret: process.env.NEXT_PUBLIC_CASDOOR_CLIENT_SECRET || '',
        organizationName: process.env.NEXT_PUBLIC_CASDOOR_ORG_NAME || '',
        appName: process.env.NEXT_PUBLIC_CASDOOR_APP_NAME || '',
        redirectPath: process.env.NEXT_PUBLIC_CASDOOR_REDIRECT_PATH || '',
      };

    casdoorSDK = new Sdk(sdkConfig);
  }

  return casdoorSDK;
}