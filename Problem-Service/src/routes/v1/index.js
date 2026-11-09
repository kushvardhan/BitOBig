const express = require("express");

const router = express.Router();

const problemRouter = require('./problems.route');

router.use('/problems', problemRouter);

module.exports = {
    v1Router : router
};