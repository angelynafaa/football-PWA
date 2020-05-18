var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BIaI7bZukSpJMWxZtmlSlotn5aXR-K96zR3V9ilcc2m4O3kebCZtylDVgCeQHU3ji6gLcDsTSW_vca8COZWhhw0",
   "privateKey": "CqGec3eySFQ20prEjgs3gDBWSGsyNMY5m9pMRb9bF4w"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "",
   "keys": {
       "p256dh": "",
       "auth": ""
   }
};
var payload = 'Ayo tambahkan tim f  avorit kamu!';
 
var options = {
   gcmAPIKey: '586657408159',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);