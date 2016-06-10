Error.stackTraceLimit = Infinity;

module.exports = function trace() {
  for (var i = 0; i < arguments.length; ++i) {
    if (arguments[i]) return;
  }

  const stack = new Error().stack;
  return '\n' + stack
    .split(/\n/)
    .slice(2)
    .map(l => l.replace(/^\s*at\s*/, ''))
    .join('\n') + '\n';
};
