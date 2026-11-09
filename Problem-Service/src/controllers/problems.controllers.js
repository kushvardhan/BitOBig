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

 function getAllProblem(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        // const problem = await 
             return res.status(200).json({
            success: true,
            message: "Problem Controller  getAllProblem Controller is working!"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

 function createProblem(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        // const problem = await 
            return res.status(200).json({
            success: true,
            message: "Problem Controller create problem controller is working!"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

 function getProblemById(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        const {id} = req.params;
        // const problem = await 
            return res.status(200).json({
            success: true,
            message: `Problem Controller get Problem by id: ${id} is working!`
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

 function updateProblem(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        const {id} = req.params;
        // const problem = await 
              return res.status(200).json({
            success: true,
            message: `Problem Controller update Problem by id: ${id} is working!`
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

function deleteProblem(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        const {id} = req.params;
        // const problem = await 
              return res.status(200).json({
            success: true,
            message: `Problem Controller delete Problem by id: ${id} is working!`
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