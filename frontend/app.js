var app = new Vue({
    el: '#app',
    data: {
        message: 'Starting up...',
        records: [],
        audioChunks: []
    },
    created: function () {
        this.message = "loading data..."
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.mediaRecorder = new MediaRecorder(stream);

                //
                this.mediaRecorder.addEventListener("dataavailable", event => {
                    this.audioChunks.push(event.data);
                });

                this.mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(this.audioChunks);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    this.records.push(audio);
                    this.audioChunks = [];
                    audio.play();
                })
            });
    },
    methods: {
        record: function () {
            this.message = "recording..."
            this.mediaRecorder.start();
        },
        stop: function () {
            this.message = "done recording!"
            this.mediaRecorder.stop();
        },
        playback: function () {

        },
        delete: function () {

        }
    }
})