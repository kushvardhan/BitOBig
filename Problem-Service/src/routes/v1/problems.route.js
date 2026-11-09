const express = require('express');

const { ProblemController } = require("../../controllers");

const router = express.Router();

router.get('/ping', ProblemController.pingProblem);
router.get('/', ProblemController.getAllProblem);
router.post('/', ProblemController.createProblem);
router.get('/:id', ProblemController.getProblemById);
router.put('/:id', ProblemController.updateProblem);
router.delete('/:id', ProblemController.deleteProblem);

module.exports = router;