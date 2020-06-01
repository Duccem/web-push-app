self.addEventListener('push', function(event){
    const pushdata = event.data.json();
    self.registration.showNotification(pushdata.title,{
        body:pushdata.body,
        icon: 'https://cdn.iconscout.com/icon/free/png-512/node-js-1174925.png'
    })
}); 