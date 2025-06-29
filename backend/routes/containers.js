
const express = require('express');
const router = express.Router();
const docker = require('../utils/docker');

// Start container
router.post('/start/:id', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.start();
    res.json({ message: 'Container started' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stop container
router.post('/stop/:id', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.stop();
    res.json({ message: 'Container stopped' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Restart container
router.post('/restart/:id', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.restart();
    res.json({ message: 'Container restarted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /api/containers
router.get('/', async (req, res) => {
  try {
    if (!docker) throw new Error("Docker is not initialized");
    
    const containers = await docker.listContainers({ all: true });
    res.json(containers);
  } catch (err) {
    console.error('❌ Error fetching containers:', err.message);
    res.status(500).json({ error: 'Failed to fetch containers. Is Docker running?' });
  }
});

module.exports = router;
