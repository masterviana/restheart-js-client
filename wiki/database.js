let Database = require('../src/api/database')
let service = require('../src/api_client')
let async = require('async')

/** Authenticate Token  */
service.setAuthToken('Basic YWRtaW46dmZvcw==');


function listAllDatabase() {
    console.log('List all Databases');
    Database.listAllDatabases((err, data) => {
        console.log('Responses of Databases ', data)
    });
}

function getDatabase(dbName) {
    console.log('Get database!');
    Database.getDatabase(dbName, (err, data) => {
        console.log('Responses of getDatabasers ', data)
    });
}

function addDatbase(dbName) {
    console.log('ADD  database!');
    Database.addDatabase(dbName, (err, data) => {
        console.log('Responses of getDatabasers ', data)
    });
}

function deleteDatabase(dbName, id ) {
    console.log('DELETE database!');
    Database.deleteDatabase(dbName,id, (err, data) => {
        console.log('Responses of getDatabasers ', data)
    });
}

/**
 *  TO DO : should use mocha tests to add
 *  Calls for examples
 */


//List all databases
listAllDatabase();

//Get database
// let dbName = 'benfica'
// getDatabase(dbName);

//Add new database
let dbName = 'sporting'
addDatbase(dbName);

//delete a created db
// let dbName = "sporting" 
// let etag = '5cb44d141ed7970008a23f46'
// deleteDatabase(dbName, etag);