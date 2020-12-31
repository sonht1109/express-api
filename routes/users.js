const express = require('express')
const router = express.Router()
const User = require('../models/user')

//get all
router.get('/', async (req, res)=> {
    try{
        const users = await User.find()
        res.json(users)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})
//get one
router.get('/:id', findUser, async (req, res)=> {
    res.json(res.user)
})
//create one
router.post('/', async(req, res)=>{
    const user = new User({
        name: req.body.name,
        age: parseInt(req.body.age),
        job: req.body.job
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})
//update one
router.patch('/:id', findUser, async (req, res) => {
    if(req.body.name != null){
        res.user.name = req.body.name
    }
    if(req.body.age != null){
        res.user.age = req.body.age
    }
    if(req.body.job != null){
        res.user.job = req.body.job
    }
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})
//delete one
router.delete('/:id', findUser, async (req, res) => {
    try{
        await res.user.remove()
        res.json({message: 'User deleted !'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//find user
async function findUser(req, res, next){
    let user
    try{
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message: "Cannot find user !"})
        }
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
    res.user = user
    next()
}

module.exports = router