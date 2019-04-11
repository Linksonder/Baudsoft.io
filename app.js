const { Chirp, toAscii} = ChirpConnectSDK;

const encode = s => typeof TextEncoder === 'undefined' ? s : new TextEncoder('utf-8').encode(s)
const decode = s => typeof TextDecoder === 'undefined' ? toAscii(s) : new TextDecoder('utf-8').decode(s)

var app = new Vue({
    el: '#app',
    data: {
        messages: [],
        txtInput: ""
    },
    created: function () {
        this.messages.push({ role: 'admin', value: "Welcome to baudosft chat!"})
        this.messages.push({ role: 'admin', value: "Please enable sound to chat to each other"})

        Chirp({ 
            key: '1b19eAdBb5DcdbfcA4db0727b',
            onReceived: (data) => {
                this.messages.push(decode(data))
                //app.$broadcast('incoming', data);
            }
        }).then(sdk => {
            this.sdk = sdk;
          }).catch(console.error)          
    },
    receive: function(){
       
        this.message.push("other: " + data);
    },
    methods: {
        send: function () {
            this.messages.push({ role: "me", value: this.txtInput});
            this.sdk.send(this.txtInput);
            this.txtInput = "";

        },
    }
})