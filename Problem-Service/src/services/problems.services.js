const ProblemRepository = require('../repositories/problems.repository');

class ProblemServices{
    constructor(problemRepository){
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData){
        try{
            const createProblem = await this.problemRepository.createProblem(problemData);
            return createProblem;
        }catch(err){
            return res.status(500).json({
            success: false,
            message: err.message  
        })
    }
}

    async getAllProblems(){
        try{
            const prolems = await this.problemRepository.getAllProblems();
            return prolems;
        }catch(err){
            return res.status(500).json({
                success: false,
                message: err.message  
            })
        }
    }

    async getProblemById(problemId){
        try{
            const problem = await this.problemRepository.getProblemById(problemId);
            return problem;
        }catch(err){
            return res.status(500).json({
                success: false,
                message: err.message  
            })
        }
    }

    async updateProblem(problemId, problemData){
        try{
           
            const updateProblem = await this.problemRepository.updateProblem(problemId, problemData);
            return updateProblem;
        }catch(err){
            return res.status(500).json({
                success: false,
                message: err.message  
            })
        }
    }

    async deleteProblem(problemId){
        try{
            const deleteProblem = await this.problemRepository.deleteProblem(problemId);
            return deleteProblem;
        }catch(err){
            return res.status(500).json({
                success: false,
                message: err.message  
            })
        }
    }
}

module.exports = ProblemServices;