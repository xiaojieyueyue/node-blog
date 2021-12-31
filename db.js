const mysql = require('mysql2');
const pool = mysql.createPool({
    host:'localhost',
    user:'node',//用户名
    password:'node',//密码
    database:'node',//数据库
    dateStrings:true,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});
var query = function(sql,values,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,values,function(qerr,results,fields){
                conn.release()
                pool.releaseConnection(conn);
                callback(qerr,results,fields);
            });
        }
    });
};
exports.query = query;