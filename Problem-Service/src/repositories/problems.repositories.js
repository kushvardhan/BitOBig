
const logger = require('../config/logger.config');
const mongoose = require('mongoose');

const BaseError = require('../errors/base.errors');
const BadRequest = require('../errors/badRequest.errors');

const { Problem } = require('../models');

class ProblemRepository {

    async createProblem(problemData) {
        logger.debug(`Creating problem: ${problemData.title}`);

        const problem = await Problem.create(problemData);

        logger.info(`Problem created successfully: ${problem._id}`);

        return problem;
    }

    async getAllProblems() {
        logger.debug('Fetching all problems');

        const problems = await Problem.find();

        logger.info(`Retrieved ${problems.length} problems`);

        return problems;
    }

    async getProblemById(problemId) {
        logger.debug(`Fetching problem: ${problemId}`);

        if (!mongoose.Types.ObjectId.isValid(problemId)) {
            throw new BadRequest('id', {
                reason: 'Invalid MongoDB ObjectId'
            });
        }

        const problem = await Problem.findById(problemId);

        if (!problem) {
            logger.warn(`Problem not found: ${problemId}`);
        }

        return problem;
    }

    async updateProblem(problemId, problemData) {
        logger.debug(`Updating problem: ${problemId}`);

        if (!mongoose.Types.ObjectId.isValid(problemId)) {
            throw new BadRequest('id', {
                reason: 'Invalid MongoDB ObjectId'
            });
        }

        const updatedProblem = await Problem.findByIdAndUpdate(
            problemId,
            problemData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProblem) {
            throw new BaseError('Problem not found', {
                reason: `No problem found with id ${problemId}`
            });
        }

        logger.info(`Problem updated successfully: ${problemId}`);

        return updatedProblem;
    }

    async deleteProblem(problemId) {
        logger.debug(`Deleting problem: ${problemId}`);

        if (!mongoose.Types.ObjectId.isValid(problemId)) {
            throw new BadRequest('id', {
                reason: 'Invalid MongoDB ObjectId'
            });
        }

        const deletedProblem = await Problem.findByIdAndDelete(problemId);

        if (!deletedProblem) {
            throw new BaseError('Problem not found', {
                reason: `No problem found with id ${problemId}`
            });
        }

        logger.info(`Problem deleted successfully: ${problemId}`);

        return deletedProblem;
    }
}

module.exports = ProblemRepository;
