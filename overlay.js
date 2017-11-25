"use strict";

class Widget {
  /*
   * [source] Network resource where the widget text can be found.
   * [identifier] String to include in element IDs.
   * [parent] Element to anchor the widget to.
   */
  constructor(source, identifier, parent, options) {
    this.source = source;
    this.id = identifier;
    this._httpRequest = null;
    this._options = options;
    if (!options) this._options = {};
    this._currentText = '';

    this._createWidget(parent);
  }

  _createWidget(parent) {
    const containElem = document.createElement('div');
    containElem.id = this.id + '-container';
    containElem.className = 'status-container hidden';
    const textElem = document.createElement('div');
    textElem.id = this.id + '-text';
    textElem.className = 'status-text';
    textElem.innerText = '_';
    containElem.appendChild(textElem);
    parent.appendChild(containElem);
  }

  _handleUpdate() {
    if (this.httpRequest.readyState === XMLHttpRequest.DONE) {
      if (this.httpRequest.status === 200) {
        this._setText(this.httpRequest.responseText);
      }
    }
  }

  _setText(text) {
    const textElem = document.getElementById(this.id + '-text');
    const containElem = document.getElementById(this.id + '-container');
    if (!textElem || !containElem) return;

    if (text.length > 0) {
      if (text !== this._currentText || (containElem.classList.contains('hidden') && !this._options.fade)) {
        this._currentText = text;
        textElem.innerHTML = "";
        const prefixNode = this._buildNode('prefix', this.prefix);
        const suffixNode = this._buildNode('suffix', this.suffix);
        const textNode = this._buildNode('value', text);
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

  _buildNode(className, text) {
    if (!text || text.length === 0) return;

    const node = document.createElement('span');
    node.className = className;
    node.innerText = text;
    return node;
  }

  _sendRequest() {
    const self = this;
    this.httpRequest = new XMLHttpRequest();
    this.httpRequest.onreadystatechange = function() {
      self._handleUpdate();
    };
    this.httpRequest.open('GET', this.source, true);
    this.httpRequest.send(null);
  }

  startUpdates() {
    const self = this;
    window.setInterval(function() {
      self._sendRequest.call(self)
    }, 1000);
  };
}
