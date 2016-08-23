(function () {
  'use strict';

  describe('AudioContextBean', function () {
    let ctx = new AudioContextBean()

    describe('Contains a working audio context object', function () {
      it('Can be accessed through a getter', function () {
          expect(ctx).to.exist;
          expect(ctx).to.have.property('context')
      });

      it('Can construct nodes and things', function () {
          let gain = ctx.context.createGain()
          expect(gain).to.exist;
          expect(gain).to.have.property('gain')
      });

      it('is Closeable', function () {
          let ctx1 = new AudioContextBean()
          ctx1.close()
          expect(ctx1.context).to.have.property("state","closed")
      });
    });
  });

  describe('BreakoutNode', function () {

    let ctx = new AudioContextBean();
    let osc = ctx.context.createOscillator();

    describe('Encapsulates an audioNode', function () {
      it('Can be accessed through a getter', function () {
          let breakout = new BreakoutNode(osc, ctx.context)
          expect(breakout).to.exist;
          expect(breakout).to.have.property("node").that.equals(osc);
      });
      it('is connected to only the gain node', function () {
          let breakout = new BreakoutNode(osc, ctx.context)
          expect(breakout).to.have.property("node")
            .that.has.property("numberOfOutputs").that.equals(1);
          expect(breakout).to.have.property("node")
            .that.has.property("numberOfInputs").that.equals(0);
      });
    });

    describe('Contains a gain node for output control', function () {
      it ('Has one input from the audio node', function () {
          let breakout = new BreakoutNode(osc, ctx.context)
          expect(breakout).to.exist;
          expect(breakout).to.have.property("_gain")
            .that.has.property("numberOfInputs").that.equals(1);
      });
    });
    describe('Encapsulates output connections from the node', function () {

      it('Can add output connections to other audio nodes', function () {
          let breakout = new BreakoutNode(osc, ctx.context)
          let osc1 = ctx.context.createGain();
          let osc2 = ctx.context.createGain();

          breakout.connect(osc1);
          expect(breakout._outputNodes).to.have.lengthOf(1)
          expect(breakout.isConnected(osc1)).to.be.true;

          breakout.connect(osc2);
          expect(breakout._outputNodes).to.have.lengthOf(2)
          expect(breakout.isConnected(osc2)).to.be.true;
      });

      it('Can disconnect individual output connections to other audio nodes', function () {
          let breakout = new BreakoutNode(osc, ctx.context)
          let osc1 = ctx.context.createGain();
          let osc2 = ctx.context.createGain();

          breakout.connect(osc1);
          breakout.connect(osc2);

          breakout.disconnect(osc1);
          expect(breakout._outputNodes).to.have.lengthOf(1)
          expect(breakout.isConnected(osc1)).to.be.false;
          expect(breakout.isConnected(osc2)).to.be.true;

          breakout.disconnect(osc2);
          expect(breakout._outputNodes).to.be.empty;
          expect(breakout.isConnected(osc1)).to.be.false;
          expect(breakout.isConnected(osc2)).to.be.false;
      });

      it('Can disconnect all output connections to other audio nodes', function () {
          let breakout = new BreakoutNode(osc, ctx.context)
          let osc1 = ctx.context.createGain();
          let osc2 = ctx.context.createGain();

          breakout.connect(osc1);
          breakout.connect(osc2);
          breakout.disconnectAll();
          expect(breakout._outputNodes).to.be.empty;
          expect(breakout.isConnected(osc1)).to.be.false;
          expect(breakout.isConnected(osc2)).to.be.false;
      });
    });
  });
})();
