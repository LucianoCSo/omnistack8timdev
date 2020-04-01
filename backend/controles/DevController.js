const Dev = require('../models/devs');
const axios = require('axios');

module.exports = {
    async index(req, res){

        const { user } = req.headers;
        const loggeDev = await Dev.findOne({_id: user });
               
        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggeDev.likes }},
                { _id: { $nin: loggeDev.deslikes }},
            ]
        })

        return res.json(users);
    },

    async store(req, res) {
        const { username } = req.body;

        const userExist = await Dev.findOne({ user: username });

        if(userExist){
            return res.json(userExist);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev);
    }
};