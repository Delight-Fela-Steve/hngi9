const router = require('express').Router();
const { operationFunction } = require("../controllers/task2.controller")

router.post('/', operationFunction)

module.exports = router;