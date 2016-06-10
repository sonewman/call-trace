const sep = require('path').sep;
const desc = require('macchiato');
const trace = require('./');

desc('call-trace')
.it('should output call trace', function (t) {
  
  function a() {
    b();
  }

  function b() {
    c();
  }

  function c() {
    d();
  }

  function d() {
    e();
  }
  
  function e() {
    const out = trace().split(/\n/).map(d => {
      return d.replace(/\/[\w\d\-\_\.\/\\]+\:\d+\:\d+/, function (m) {
        const p = m.split('/');
        return p[p.length - 2] + sep + p[p.length - 1];
      });
    })
    .join('\n');

    const expected = '\n'
      + 'e (call-trace/test.js:25:17)\n'
      + 'd (call-trace/test.js:21:5)\n'
      + 'c (call-trace/test.js:17:5)\n'
      + 'b (call-trace/test.js:13:5)\n'
      + 'a (call-trace/test.js:9:5)\n'
      + 'call-trace/test.js:50:5\n'
      + '_combinedTickCallback (internalprocess/next_tick.js:67:7)\n'
      + 'process._tickCallback (internalprocess/next_tick.js:98:9)\n';

    t.expect(out).equals(expected);

    t.end();
  }

  // set with fresh call stack
  process.nextTick(function () {
    a();
  });
})
.it('should log output if passed arguments that are truthy', function (t) {
  // temporarily stub console.log
  t.stub(console, 'log');
  t.expect(console.log.notCalled);
  trace(true, true);
  t.expect(console.log.calledOnce);
  t.end();
})
.it('should not log output if passing arguments which are falsey', function (t) {
  t.stub(console, 'log');
  t.expect(console.log.notCalled);
  trace(true, false);
  t.expect(console.log.notCalled);
  t.end();
});
