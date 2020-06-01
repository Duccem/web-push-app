const publicKey = 'BBazL4CEhQH9hkaPp2wtSbiPo4NbsTC9yG8m105wYDRSlvjifm21d0t7lXp9SoV3R5ujKmjYfgxRv0QKZRbLy9c'


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function subscribe(){
    try {
        const register = await navigator.serviceWorker.register('/web-push-app/worker.js',{
            scope: '/web-push-app/'
        });
    
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey)
        })
    
        await fetch('http://localhost:86/subscribe',{
            method: 'POST',
            body:JSON.stringify(subscription),
            headers:{
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
    }
}

subscribe();