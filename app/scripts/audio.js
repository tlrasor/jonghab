
class AudioContextBean {

  constructor() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this._context = new AudioContext();
  }

  get context() {
    return this._context
  }

  close() {
    this._context.close()
  }
}

class BreakoutNode {

  constructor(node, context) {
    this._node = node
    this._outputNodes = []
    this._gain = context.createGain()

    this._node.connect(this._gain);
  }

  get node() {
    return this._node;
  }

  isConnected(outNode) {
    //if already connected, ignore
    if (this._outputNodes.indexOf(outNode) > -1) {
      console.log("node already connected!" + outNode);
      return true;
    }
    return false;
  }

  connect(outNode){
    if (this.isConnected(outNode)){
      return;
    }
    this._outputNodes.push(outNode);

    this._reconnectNodes()
  }

  disconnect(outNode) {
    let position = this._outputNodes.indexOf(outNode);

    //ignore if outNode not connected
    if (position<0) {
      console.log('node was not connected!' + outNode);
      return;
    }

    this._outputNodes.splice(position, 1);

    this._reconnectNodes()
  }

  _reconnectNodes() {
    let i
    this._gain.disconnect();
    for(i=0; i < this._outputNodes.length; i++) {
      this._gain.connect(this._outputNodes[i]);
    }
  }

  disconnectAll() {
    this._outputNodes = []
    this._gain.disconnect()
  }

}

var OscillatorBreakoutNode = function() {
    osc = new BreakoutNode(context.createOscillator(), context)

    osc.node.type = osc.node.SAWTOOTH;
    osc.node.frequency.value = 100;
    osc.node.start(0);
}


