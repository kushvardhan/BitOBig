
class ProblemServices {
    constructor(problemRepository) {
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData) {
        try{
        return await this.problemRepository.createProblem(problemData);
        }catch(err){
            throw err;
        }
    }

    async getAllProblems() {
        try{
            return await this.problemRepository.getAllProblems();
        }catch(err){
            throw err;
        }
        
    }

    async getProblemById(problemId) {
        try{
            return await this.problemRepository.getProblemById(problemId);
        }catch(err){
            throw err;
        }
    }

    async updateProblem(problemId, problemData) {    
        try{
        return await this.problemRepository.updateProblem(
            problemId,
            problemData
        );
        }catch(err){
            throw err;
        }  
    }

    async deleteProblem(problemId) {
        try{
        return await this.problemRepository.deleteProblem(problemId);
        }catch(err){
            throw err;
        }
    }
}

module.exports = ProblemServices;
