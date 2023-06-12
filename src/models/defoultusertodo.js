const {fetchOne, fetch}  = require("../utils/pg")



// const getallplans = 'select u.user_email, u.user_name, t.todo_title, t.todo_desc , t.start_t, t.end_t from todo as t inner join users as u on t.user=u.user_id'
// const getallplans = `select * from todo`


const getallplans = 'SELECT u.user_email,u.user_id, u.user_name, t.todo_title, t.todo_desc, t.created_at, t.ended_at from todo_def_u as t INNER JOIN users as u ON t.user_id = u.user_id WHERE    u.user_id = $1'

// const getallplans = 'select user_email, user_name from users'
 const padd = 'Insert into todo_def_u(todo_title, todo_desc, ended_at, user_id)values($1, $2, $3, $4) ';
 const deleteid = 'Delete from todo WHERE todo_id = $1'
 const update = 'UPDATE todo_def_u SET todo_title = $1, todo_desc = $2, created_at = $3, ended_at = $4 WHERE todo_id = $5';
//  const addid = 'insert into todo_def_u(user_id)values($1)'

 const planadd = (title,desc,end, id) => fetchOne(padd, title, desc,end, id);
 const allplans = (id) => fetch(getallplans, id);
 const idadd = (id) => fetchOne(addid, id);
const updateplan = (title, desc,start,end,id) =>fetchOne(update,title, desc,start,end,id);
const deleteplan = (id) => fetchOne(deleteid, id);

 module.exports = {
     planadd,
     allplans,
     updateplan,
     deleteplan,
     idadd
 }