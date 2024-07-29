const firebaseConfig = {
    // apiKey: "AIzaSyCdhGqwAm8cBqDMwS2rYbsMaV4TeDr6KaU",
    // authDomain: "crypto-tracker-46561.firebaseapp.com",
    // projectId: "crypto-tracker-46561",
    // storageBucket: "crypto-tracker-46561.appspot.com",
    // messagingSenderId: "333107388615",
    // appId: "1:333107388615:web:dfacfea8563067a4f85ee2",

    apiKey: process.env.REACT_APP_FB_APIKEY,
    authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECTID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_SENDERID,
    appId: process.env.REACT_APP_FB_APPID,
};

export default firebaseConfig;
