const {Client} = require('pg');

const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    db: "postgres"
})
client.connect();

async function getUsers() {
    const users=await client.query(`SELECT * FROM test.users `);
    return users.rows;
}

async function createUser(imya,log,pass){
    const user= await client.query(`INSERT INTO test.users (name,login,password) VALUES('${imya}','${log}','${pass}')`);
    console.log('CREATE USER', user.rows)
}

async function logInUser(log,pass){
    const arrUsers= await getUsers();
    const user=arrUsers.filter(el => el.login === log && el.password===pass);

    if(user.length===0) return "problem with your login or password";

    return `Hi ${user[0].name} you are log in `;
}

async function registerUser(imya,log,pass){
    const arrUsers= await getUsers();

    if(!arrUsers.find(el => el.login === log )){
        await createUser(imya,log,pass);
        return `create new user. hello ${imya}`;
    }else {
        return "this login is already in use";
    }
}

async function updUser(log,newPass){
    await client.query(`UPDATE test.users SET password = '${newPass}' WHERE login='${log}'` );
    return getUsers();
}

async function deleteUser(log){
    await client.query(`DELETE FROM test.users WHERE login='${log}'`);
    return getUsers();
}
module.exports = {getUsers,createUser,logInUser,registerUser,updUser,deleteUser};