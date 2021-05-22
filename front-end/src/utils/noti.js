/* eslint-disable no-alert */
/* eslint-disable no-new */
const notifyMefunction = (message, image) => {
  console.log(message);
  if (message) {
    if (!('Notification' in window)) {
      // alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      const options = {
        body: message,
        icon: image || '/static/images/logo.png',
        dir: 'ltr'
      };
      new Notification('New Message', options);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission((permission) => {
        if (!('permission' in Notification)) {
          Notification.permission = permission;
        }

        if (permission === 'granted') {
          const options = {
            body: message,
            icon: image || '/static/images/logo.png',
            dir: 'ltr'
          };
          new Notification('New Message', options);
        }
      });
    }
  }
};

export default notifyMefunction;
