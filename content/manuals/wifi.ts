type WiFiCredentials = {
  network: string;
  password: string;
};

const wifiCredentials: Record<string, WiFiCredentials> = {
  'sound-breeze': {
    network: process.env.SOUND_BREEZE_WIFI_NETWORK || '',
    password: process.env.SOUND_BREEZE_WIFI_PASSWORD || '',
  },
  'songbird': {
    network: process.env.SONGBIRD_WIFI_NETWORK || '',
    password: process.env.SONGBIRD_WIFI_PASSWORD || '',
  },
  'launchpad': {
    network: process.env.LAUNCHPAD_WIFI_NETWORK || '',
    password: process.env.LAUNCHPAD_WIFI_PASSWORD || '',
  },
};

export default wifiCredentials;
