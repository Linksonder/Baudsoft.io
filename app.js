const { Chirp, toAscii} = ChirpConnectSDK;

const encode = s => typeof TextEncoder === 'undefined' ? s : new TextEncoder('utf-8').encode(s)
const decode = s => typeof TextDecoder === 'undefined' ? toAscii(s) : new TextDecoder('utf-8').decode(s)

var app = new Vue({
    el: '#app',
    data: {
        messages: [],
        txtInput: "",
        status: null,
    },
    created: function () {
        this.messages.push({ role: 'admin', value: "Welcome to Baudsoft chat!"})
        this.messages.push({ role: 'admin', value: "Please enable sound to chat to each other"})

        Chirp({ 
            key: '1b19eAdBb5DcdbfcA4db0727b',
            onReceiving: () =>  {
                this.status = "receiving";
            },
            onReceived: (data) => {
                this.messages.push({ role: "other", value: decode(data)})
                this.isReceiving = null;
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
            var msg = this.txtInput;
            this.txtInput = "";
            this.status = "sending";
            this.sdk.send(msg);
            this.status = null;
            this.messages.push({ role: "me", value: msg});
            var container = this.$el.querySelector(".output");
            container.scrollTop = container.height;
        },
    }
})