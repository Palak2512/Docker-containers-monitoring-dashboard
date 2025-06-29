
const express = require('express');
const router = express.Router();
const docker = require('../utils/docker');

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
