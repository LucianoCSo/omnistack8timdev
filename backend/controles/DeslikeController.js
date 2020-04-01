const Dev = require("../models/devs");

module.exports = {
    async store(req, res){
        
        const user = req.headers.user;
        const devId  = req.params.devId;
        const loggeDev = await Dev.findOne({_id: user });
        const targetDev = await Dev.findOne({_id: devId});

        if(!targetDev){
             return res.status(400).json({ error: "Usuário não existe." });
        }

        loggeDev.deslikes.push(targetDev._id);
        await loggeDev.save();
        

        return res.json(loggeDev); 
    }
}