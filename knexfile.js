const path = require("path");
module.exports = {
    client: "mysql",
    connection:{
        host:"localhost",
        user: "root",
        password:"",
        database:"Online_Sweet_Store"
    },
    migrations:{
        tablename: "migrations",
        directory: path.resolve(__dirname, "./migrations")
    },
    useNullAsDefault: true
};
