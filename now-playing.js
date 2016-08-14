class NowPlaying {
    constructor() {
        this.httpRequest = null;
        this.startUpdates();
    }

    handleUpdate() {
        if (this.httpRequest.readyState === XMLHttpRequest.DONE) {
            if (this.httpRequest.status === 200) {
                this.setSong(this.httpRequest.responseText);
            }
        }
    }

    setSong(text) {
        var songElem = document.getElementById('now-playing-text');
        var containElem = document.getElementById('now-playing-container');
        if (!songElem || !containElem) return;

        if (text.length > 0) {
            songElem.innerText = text;
            containElem.style.display = 'block';
        }
        else {
            containElem.style.display = 'none';
        }
    }

    sendRequest() {
        var self = this;
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.onreadystatechange = function() {
            self.handleUpdate();
        };
        this.httpRequest.open('GET', 'now-playing.txt', true);
        this.httpRequest.send(null);
    }

    startUpdates() {
        var self = this;
        window.setInterval(function() {
            self.sendRequest.call(self)
        }, 1000);
    };
}

var np = new NowPlaying();
