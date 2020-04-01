const Dev = require("../models/devs");

module.exports = {
    async store(req, res){
        
        const { user } = req.headers;
        const { devId }  = req.params;
        const loggeDev = await Dev.findOne({_id: user });
        const targetDev = await Dev.findOne({_id: devId});

        if(!targetDev){
             return res.status(400).json({ error: "Usuário não existe." });
        }

        if(targetDev.likes.includes(loggeDev._id)){
            console.log("DEU MATCH");
        }
        loggeDev.likes.push(targetDev._id);
        await loggeDev.save();
        

        return res.json(loggeDev); 
    }
}