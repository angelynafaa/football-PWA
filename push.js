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
    "endpoint": "https://fcm.googleapis.com/fcm/send/dijBJ2_vE-k:APA91bH0AE7whT9VKLSUZWepm44jEGhzs8l5OFMSbyH9NijbSzdQvy1TcDoPsakc4YX-T8TPwZCFR2eXhLnUJdgd0u18FQl5aXpbDE-Yk3I6MRKhM9zPEJrGP2xJXO1yKCzsgzuOmt_Z",
    "keys": {
        "p256dh": "BBJuZCx1vkXEnazwJ+uSLVx43MJXafUZsLmhtE+6AXAOJtUWhkMxgkiFgeeCFrYp4UUjGvAnfyYRLN+vE65CL7g=",
        "auth": "1FnNVIiMd/9rQJvVW5k2qw=="
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