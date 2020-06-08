var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BH2f8yIc39hMPM60PxkP97FxT5r-EQxpvsht-rJiPhNYIE-zptYg_RmyjgmH2tcw4x86eNPc4wGwGPo0DJsEZ5M",
    "privateKey": "dKlC4TQ0cs5KpebLZZJ0qmZgjVdzbnoglSj301cybGc"
};
 
 
webPush.setVapidDetails(
    'angelyna826@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fEEB-ZWrdv4:APA91bHuWP-1ge3uM5lpmWYkyRW5SCrpNQPxTS5WFMfK8ucset0_jfE12C-MCXxs-EvvFgcP5Q27y1TeDvBlWGS0i7Kg4NEtiFroVZaq7PS_fN1rLPao2fRM7hoxZirH7WMWRxMu7YJb",
    "keys": {
        "p256dh": "BB50PcrOSv3YlIISpIZ27RPqyD+pFVq6+D4gCFRX+nq+3pGP6sEUI4p/xNx9VsQU0JAKRYdUURcFxfjmubqcPdY=",
        "auth": "NrxP7qYY0PsEXskY+IB03A=="
    }
};
var payload = 'lets add your favourite teams!';
var options = {
    gcmAPIKey: '586657408159',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);