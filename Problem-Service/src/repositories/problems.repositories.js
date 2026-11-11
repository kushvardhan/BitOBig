
const { Problem } = require('../models');

class ProblemRepository {

    async createProblem(problemData) {
        try {
            return await Problem.create({
                title: problemData.title,
                description: problemData.description,
                testCases: problemData.testCases || [],
            })
        } catch (err) {
            throw err;
        }
    }

    async getAllProblems() {
        try {
            return await Problem.find();
        } catch (err) {
            throw err;
        }
    }

    async getProblemById(problemId) {
        try {
            return await Problem.findById(problemId);
        } catch (err) {
            throw err;
        }
    }

    async updateProblem(problemId, problemData) {
        try {
            return await Problem.findByIdAndUpdate(
                problemId,
                problemData,
                {
                    new: true,
                }
            );
        } catch (err) {
            throw err;
        }
    }

    async deleteProblem(problemId) {
        try{
            return await Problem.findByIdAndDelete(problemId);
        }catch(err){
            throw err;
        }
    }
}

module.exports = ProblemRepository;
