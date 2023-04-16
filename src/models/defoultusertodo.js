const {fetchOne, fetch}  = require("../utils/pg")



const getallplans = `select task_title, task_desc,start_t, end_t from plans as p inner join user users as u on p.user=u.user_id`
// SELECT f.user_name, t.product_name, t.product_price, t.product_price from users as f INNER JOIN product as t ON f.user_id=t.user_id;
const padd = 'Insert into  task(task_title, task_desc,start_t, end_t)values($1, $2, $3) returning *';
const deleteid = 'Delete from task WHERE task_id = $1'
const update = 'UPDATE task SET product_title = $1, product_desc = $2, start_t = $3, end_t  = $4 WHERE task_id = $5';

const planadd = (title, desc, start, end) => fetchOne(padd , title, desc,start,end);
const allplans = () => fetch(getallplans);

const updateplan = (title, desc,start,end,id) =>fetchOne(update,title, desc,start,end,id);
const deleteplan = (id) => fetchOne(deleteid, id);

module.exports = {
    planadd,
    allplans,
    updateplan,
    deleteplan
}