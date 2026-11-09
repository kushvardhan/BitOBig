function pingProblem(req, res) {
    try {
        console.log('Ping Controller');

        return res.status(200).json({
            success: true,
            message: "Problem Controller is working!"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function getAllProblem(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        // const problem = await 
        const problems = await problemServices.getAllProblems();

        if(!problems || problems.length === 0){
            return res.status(404).json({
                success: false,
                message: "No problems found"
            });
        }

             return res.status(200).json({
            success: true,
            message: "Problem Controller  getAllProblem Controller is working!",
            data: problems
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function createProblem(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        
        const problem = await problemServices.createProblem(req.body);

        if(!problem){
            return res.status(400).json({
                success: false,
                message: "Problem creation failed"
            });
        }

            return res.status(200).json({
            success: true,
            message: "Problem Controller create problem controller is working!",
            data: problem
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function getProblemById(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        const {id} = req.params;

        const problem = await problemServices.getProblemById(id);

        if(!problem){
            return res.status(404).json({
                success: false,
                message: `Problem with id: ${id} not found`
            });
        }

            return res.status(200).json({
            success: true,
            message: `Problem Controller get Problem by id: ${id} is working!`,
            data: problem
        
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

 async function updateProblem(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        const {id} = req.params;
        const problem = await problemServices.updateProblem(id, req.body);
        if(!problem){
            return res.status(404).json({
                success: false,
                message: `Problem with id: ${id} not found`
            });
        }
              return res.status(200).json({
            success: true,
            message: `Problem Controller update Problem by id: ${id} is working!`,
            data: problem
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function deleteProblem(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        const {id} = req.params;
        const problem = await problemServices.deleteProblem(id);
        if(!problem){
            return res.status(404).json({
                success: false,
                message: `Problem with id: ${id} not found`
            });
        }
              return res.status(200).json({
            success: true,
            message: `Problem Controller delete Problem by id: ${id} is working!`,
            data: problem
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
  createProblem,
  getProblemById,
  getAllProblem,
  updateProblem,
  deleteProblem,
  pingProblem,
};