
class ProblemServices {
    constructor(problemRepository) {
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData) {
        return await this.problemRepository.createProblem(problemData);
    }

    async getAllProblems() {
        return await this.problemRepository.getAllProblems();
    }

    async getProblemById(problemId) {
        return await this.problemRepository.getProblemById(problemId);
    }

    async updateProblem(problemId, problemData) {
        return await this.problemRepository.updateProblem(
            problemId,
            problemData
        );
    }

    async deleteProblem(problemId) {
        return await this.problemRepository.deleteProblem(problemId);
    }
}

module.exports = ProblemServices;
