Error.stackTraceLimit = Infinity;

module.exports = function trace() {
  const stack = new Error().stack;
  return '\n' + stack
    .split(/\n/)
    .slice(2)
    .map(l => l.replace(/^\s*at\s*/, ''))
    .join('\n') + '\n';
};
