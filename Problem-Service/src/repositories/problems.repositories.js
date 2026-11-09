const {Problem} = require('../models/problem.model');

class ProblemsRepository {
    async createProblem(problemData){
        try{
            const problem = await Problem.create({
                title: problemData.title,
                description: problemData.description,
                difficulty: problemData.difficulty,
                testCases: problemData.testCases || [],
            });
            return problem;
        }catch(err){
            return res.status(500).json({
            success: false,
            message: err.message
        });
        }
    }

    async getAllProblems(){
        try{
            const problems = await Problem.find();
            return problems;
        }catch(err){
            return res.status(500).json({
            success: false,
            message: err.message
        });
        }
    }

    async getProblemById(problemId){
        try{
            const problem = await Problem.findById(problemId);
            return problem;
        }catch(err){
            return res.status(500).json({
            success: false,
            message: err.message
        });
        }
    }

    async updateProblem(problemId, updateData){
        try{
            const updatedProblem = await Problem.findByIdAndUpdate(problemId, updateData, {new:true});
            return updatedProblem;
        }catch(err){
            return res.status(500).json({
            success: false,
            message: err.message
        });
        }
    }
    
    async deleteProblem(problemId){
        try{
            const deletedProblem = await Problem.findByIdAndDelete(problemId);
            return deletedProblem;
        }catch(err){
            return res.status(500).json({
            success: false,
            message: err.message
        });
        }
    }
}

module.exports = ProblemsRepository;