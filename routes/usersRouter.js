const express = require('express');
const {getUsers, createUser, logInUser,registerUser,updUser,deleteUser} = require("../controlers/usersControler");

const usersRouter = express.Router();

usersRouter.get('/', async(req, res, next) => {
    const users = await getUsers();
    res.send(users);
})


usersRouter.post('/', async(req, res, next) => {
    await createUser("jenya","ustimk1", "1234");
    res.send('post users endpoint');
})


usersRouter.get(`/login`, async (req,res)=>{
    const {login}=req.query,
        {password}=req.query;
    res.send(await logInUser(login,password));

})

usersRouter.get(`/register`, async (req,res)=>{
    const {login}=req.query,
        {password}=req.query,
        {name}=req.query;
    res.send(await registerUser(name,login,password));

})

usersRouter.get(`/updUser`, async (req,res)=>{
    const {login,changePass}=req.query;

    res.send(await updUser(login,changePass));
})

usersRouter.get(`/deleteUser`, async (req,res)=>{
    const {login}=req.query;

    res.send(await deleteUser(login));
})

module.exports = {usersRouter};