
class ProblemServices {
    constructor(problemRepository) {
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData) {
        return this.problemRepository.createProblem(problemData);
    }

    async getAllProblems() {
        return this.problemRepository.getAllProblems();
    }

    async getProblemById(problemId) {
        return this.problemRepository.getProblemById(problemId);
    }

    async updateProblem(problemId, problemData) {
        return this.problemRepository.updateProblem(
            problemId,
            problemData
        );
    }

    async deleteProblem(problemId) {
        return this.problemRepository.deleteProblem(problemId);
    }
}

module.exports = ProblemServices;
