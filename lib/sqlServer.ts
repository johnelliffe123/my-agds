var sql = require("mssql/msnodesqlv8")

var dbConfig = {
    server: 'Localhost',
    port: 1433,
    database: 'master',
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true
    }
  }

var dbConnect = new sql.connect(dbConfig,
  function(err)
   {
     if(err){
       console.log("Error while connecting database: " + err)
     }else{
       console.log("connected to database: " + dbConfig.server)
     }
   }
)
export default dbConnect