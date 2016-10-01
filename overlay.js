class Widget {
    /*
     * [source] Network resource where the widget text can be found.
     * [identifier] String to include in element IDs.
     * [parent] Element to anchor the widget to.
     */
    constructor(source, identifier, parent, options) {
        this.source = source;
        this.id = identifier;
        this.httpRequest = null;
        this._options = options;
        if (!options) this._options = {};
        this._currentText = '';

        this.createWidget(parent);
    }

    createWidget(parent) {
      var containElem = document.createElement('div');
      containElem.id = this.id + '-container';
      containElem.className = 'status-container hidden';
      var textElem = document.createElement('div');
      textElem.id = this.id + '-text';
      textElem.className = 'status-text';
      textElem.innerText = '_';
      containElem.appendChild(textElem);
      parent.appendChild(containElem);
    }

    handleUpdate() {
        if (this.httpRequest.readyState === XMLHttpRequest.DONE) {
            if (this.httpRequest.status === 200) {
                this.setText(this.httpRequest.responseText);
            }
        }
    }

    setText(text) {
        var textElem = document.getElementById(this.id + '-text');
        var containElem = document.getElementById(this.id + '-container');
        if (!textElem || !containElem) return;

        if (text.length > 0) {
            if (text !== this._currentText) {
                this._currentText = text;
                textElem.innerHTML = "";
                var prefixNode = this.buildNode('prefix', this.prefix);
                var suffixNode = this.buildNode('suffix', this.suffix);
                var textNode = this.buildNode('value', text);
                if (prefixNode) textElem.appendChild(prefixNode);
                if (textNode) textElem.appendChild(textNode);
                if (suffixNode) textElem.appendChild(suffixNode);
                containElem.classList.remove('hidden');

                if (this._options.fade) {
                  setTimeout(() => containElem.classList.add('hidden'), this._options.fadeDelay);
                }
            }
        }
        else {
            containElem.classList.add('hidden');
        }
    }

    buildNode(className, text) {
      if (!text || text.length === 0) return;

      var node = document.createElement('span');
      node.className = className;
      node.innerText = text;
      return node;
    }

    sendRequest() {
        var self = this;
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.onreadystatechange = function() {
            self.handleUpdate();
        };
        this.httpRequest.open('GET', this.source, true);
        this.httpRequest.send(null);
    }

    startUpdates() {
        var self = this;
        window.setInterval(function() {
            self.sendRequest.call(self)
        }, 1000);
    };
}
