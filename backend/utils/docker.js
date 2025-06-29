const Docker = require('dockerode');

// Windows fix: use TCP connection instead of socket
const docker = new Docker({
  host: 'localhost',
  port: 2375,
});

module.exports = docker;
