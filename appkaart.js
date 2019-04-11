const { Chirp, toAscii} = ChirpConnectSDK;

const encode = s => typeof TextEncoder === 'undefined' ? s : new TextEncoder('utf-8').encode(s)
const decode = s => typeof TextDecoder === 'undefined' ? toAscii(s) : new TextDecoder('utf-8').decode(s)

var app = new Vue({
    el: '#appkaart',
    data: {
        message: '',
        
    },
    created: function () {
      
        Chirp({ 
            key: '1b19eAdBb5DcdbfcA4db0727b',
           
            onReceived: (data) => {
                this.message = decode(data);
               
            }
        }).then(sdk => {
            this.sdk = sdk;
          }).catch(console.error)          
    },
    
})