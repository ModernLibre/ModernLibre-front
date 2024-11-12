'use client'

import Sdk from 'casdoor-js-sdk';

let casdoorSDK: Sdk | null = null;

export function initCasdoorSDK() {
  if (typeof window === 'undefined') return null;
  
  if (!casdoorSDK) {
    const sdkConfig = {
      serverUrl: process.env.NEXT_PUBLIC_CASDOOR_SERVER_URL || '',
      clientId: process.env.NEXT_PUBLIC_CASDOOR_CLIENT_ID || '',
      appName: process.env.NEXT_PUBLIC_CASDOOR_APP_NAME || '',
      organizationName: process.env.NEXT_PUBLIC_CASDOOR_ORG_NAME || '',
      redirectPath: '/callback',
      signinPath: '/api/signin',
    };

    casdoorSDK = new Sdk(sdkConfig);
  }

  return casdoorSDK;
}