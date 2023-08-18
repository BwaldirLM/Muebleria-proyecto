const mysql = require('mysql')

const { promisify } = require('util')


const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: '123456789',
        database:  'Muebleria', 
        port: 3306
     }
)

pool.getConnection((err, connection)=>{
   if(err){
      if(err.code === 'PROTOCOL_CONNECTION_LOST'){
         console.error('DATABASE CONNECTION WAS CLOSED');
      }
      if(err.code === 'ER_CON_COUNT_ERROR'){
         console.error('DATABASE HAS MANY CONNECTIONS');
      }
      if(err.code ==='ECONNREFUSED'){
         console.error('DATABASE CONNECTION WAS REFUSED');
      }
   }
   if(connection)connection.release();
   console.log('DB esta conectada')
   return;
});


pool.query = promisify(pool.query);

module.exports = pool;