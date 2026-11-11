
const { Problem } = require('../models');

class ProblemRepository {

    async createProblem(problemData) {
        const problem = await Problem.create(problemData);
        return problem;
    }

    async getAllProblems() {
        return await Problem.find();
    }

    async getProblemById(problemId) {
        return await Problem.findById(problemId);
    }

    async updateProblem(problemId, problemData) {
        return await Problem.findByIdAndUpdate(
            problemId,
            problemData,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async deleteProblem(problemId) {
        return await Problem.findByIdAndDelete(problemId);
    }
}

module.exports = ProblemRepository;
