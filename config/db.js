const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    socketPath: `/cloudsql/stunning-prism-447018-c5:us-central1:docman`,
    //host: '34.134.177.27', // The IP address or hostname of your Cloud SQL instance
    user: 'user',       // Your MySQL username
    password: 'user',   // Your MySQL password
    database: 'docman_db',        // The database name you want to use
    port: 3306
});

// Connect to the database
connection.connect((err)=>{
    if(err) return console.log('error connecting to database',err)
    console.log('Database connected')
});

module.exports = connection