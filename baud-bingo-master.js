const { Chirp, toAscii } = ChirpConnectSDK;

const encode = s => typeof TextEncoder === 'undefined' ? s : new TextEncoder('utf-8').encode(s)
const decode = s => typeof TextDecoder === 'undefined' ? toAscii(s) : new TextDecoder('utf-8').decode(s)

function nextRandom(numbers, max) {
    var next = 0;
    while (numbers.indexOf(next) !== -1) {
        next = Math.round(Math.random() * max);
    }
    return next;
}

var app = new Vue({
    el: '#bingo-master',
    data: {
        messages: [],
        txtInput: "",
        numbers: [0],
    },
    created: function () {
        this.messages.push({ role: 'admin', value: "Welcome to bingo!" })
        this.messages.push({ role: 'admin', value: "We are getting started" })

        Chirp({
            key: '1b19eAdBb5DcdbfcA4db0727b',
            onReceiving: () => {
                this.status = "receiving";
            },
            onReceived: (data) => {
                this.messages.push({ role: "other", value: decode(data) })
                this.isReceiving = null;
                //app.$broadcast('incoming', data);
            }
        }).then(sdk => {
            this.sdk = sdk;
        }).catch(console.error)
    },
    receive: function () {

        this.message.push("other: " + data);
    },
    methods: {
        reset: function () {
            this.messages.unshift({ role: "admin", value: "Game reset!"});
            this.numbers = [0];
        },
        next: function () {
            if(this.numbers.length > max)
            {
                return this.message.unshift({ role: "admin", value: "Game over!"});
            }
            var next = nextRandom(this.numbers, 40);
            this.messages.unshift({ role: "admin", value: "[" + this.numbers.length + "] Sending the next number!" });
            this.numbers.push(next);
            this.sdk.send("" + next);
            console.log(this.numbers);
        },
    }
})