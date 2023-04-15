const {fetchOne, fetch}  = require("../utils/pg")


const getUserByemail = 'select * from users where user_email = $1';
const getallusers = 'select * from users';
const creatUser = 'Insert into users (user_email, user_password, user_role, user_name)values($1, $2, $3, $4) returning *';
const cregister = 'Insert into users ( user_name, user_email, user_password)values($1, $2, $3) returning *';
const deleteid = 'UPDATE users SET user_isDelete = true WHERE user_id = $1';
// const home = "select * from "
const google = "Insert into users (userg_id, user_name, user_email)values($1, $2, $3) "
const homeget = ""


const register = (name, email, password) => fetchOne(cregister , name, email , password );
const findbyemail = (email) => fetchOne(getUserByemail, email);
const allusers = () => fetch(getallusers);
const googleby = (id,name,email) => fetchOne(google, id, name, email)
const create = (name,email, password, role) => fetchOne(creatUser, name, email, password, role);
const deleteUser = (user_id) => fetchOne(deleteid, user_id);

module.exports = {
 findbyemail,
 create,
 allusers,
 register,
 deleteUser,
 googleby
}