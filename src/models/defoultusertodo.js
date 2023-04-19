const {fetchOne, fetch}  = require("../utils/pg")



// const getallplans = 'select u.user_email, u.user_name, t.task_title, t.task_desc , t.start_t, t.end_t from task as t inner join users as u on t.user=u.user_id'
// const getallplans = `select * from task`
const getallplans = 'SELECT user_email, user_name, task_title, task_desc, start_t, end_t from task as t INNER JOIN users as u ON t.user_id=u.user_id'
// const getallplans = 'select user_email, user_name from users'
const padd = 'Insert into task(task_title, task_desc,start_t, end_t,user_id)values($1, $2, $3, $4, $5) returning *';
const deleteid = 'Delete from task WHERE task_id = $1'
const update = 'UPDATE task SET task_title = $1, task_desc = $2, start_t = $3, end_t = $4 WHERE task_id = $5';

const planadd = (title, desc, start, end,user_id) => fetchOne(padd , title, desc,start,end,user_id);
const allplans = () => fetch(getallplans);

const updateplan = (title, desc,start,end,id) =>fetchOne(update,title, desc,start,end,id);
const deleteplan = (id) => fetchOne(deleteid, id);

module.exports = {
    planadd,
    allplans,
    updateplan,
    deleteplan
}