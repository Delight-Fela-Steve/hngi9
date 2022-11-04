const router = require('express').Router();
const { operationFunction } = require("../controllers/task2.controller")

router.post('/task2', operationFunction)

module.exports = router;