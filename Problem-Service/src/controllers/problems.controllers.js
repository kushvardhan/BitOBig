 function pingProblem(req,res){
    try{
        console.log('Ping Controller');
    }catch(err){
        console.log(`Error: $err`);
    }
}

 function getAllProblem(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        // const problem = await 
        console.log("get all controller working properly");

    }catch(err){
        console.log(`Error: $err`);
    }
}

 function createProblem(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        // const problem = await 
        console.log("Create controller working properly");

    }catch(err){
        console.log(`Error: $err`);
    }
}

 function getProblemById(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        const {id} = req.params;
        // const problem = await 
        console.log(`get problem by ID: ${id} controller working properly`);

    }catch(err){
        console.log(`Error: $err`);
    }
}

 function updateProblem(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        const {id} = req.params;
        // const problem = await 
        console.log(`update problem by ID: ${id} controller working properly`);

    }catch(err){
        console.log(`Error: $err`);
    }
}

async function deleteProblem(req,res){
    try{
        if(!req.body || Object.keys(req.body).length === 0){
        console.log("Request Cannot be empty");
        }
        const {id} = req.params;
        // const problem = await 
        console.log(`delete problem by ID: ${id} controller working properly`);

    }catch(err){
        console.log(`Error: $err`);
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