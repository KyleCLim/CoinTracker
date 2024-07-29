const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_APIKEY,
    authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECTID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_SENDERID,
    appId: process.env.REACT_APP_FB_APPID,
};

export default firebaseConfig;
