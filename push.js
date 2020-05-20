var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BIaI7bZukSpJMWxZtmlSlotn5aXR-K96zR3V9ilcc2m4O3kebCZtylDVgCeQHU3ji6gLcDsTSW_vca8COZWhhw0",
   "privateKey": "CqGec3eySFQ20prEjgs3gDBWSGsyNMY5m9pMRb9bF4w"
};
 
 
webPush.setVapidDetails(
   'angelyna826@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dPOjWYqZHYI:APA91bFtCU7Djwa-l716Gajnu4nl3F2YC6m0Tb9SIKOfcWE9PT1c-3T8VwA-0C9lRYhi5KBntm2JrSqN5mTNtPkuUeFjTCqnpReum6xYqb5tBdDxw4ReDekHsUbjji-39qgn4ei4b-fB",
   "keys": {
       "p256dh": "BB7HZ2W4VdZVC0MLqMu3Sxi44yiIFeF5q+N7eT/SdAFKc7RIWUu1Em9aknj4gwpxmogI0Yyc2MkHOAPzLSMrV7A=",
       "auth": "u+zjczSpQ7O0RxBsqxLloQ=="
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