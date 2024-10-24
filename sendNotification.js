const messaging=require('./firebaseService')
const sendNotification = async (registrationToken, title, body) => {
    console.log(registrationToken);
    console.log(title);
    console.log(body);
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: registrationToken, // The recipient's device registration token
    };
  
    try {
      const response = await messaging.send(message);
      console.log('Successfully sent message:',response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  module.exports=sendNotification