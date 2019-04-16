let Collections = require('../src/api/collections')
let service = require('../src/api_client')
let async = require('async')

/** Authenticate Token  */
service.setAuthToken('Basic YWRtaW46dmZvcw==');


function listDbCollecions(dbName) {
    Collections.getAllCollections(dbName, (err, data) => {
        console.log('ALL collections ', data)
    })
}

function getCollenction(dbName, collection) {
    Collections.getColletion(dbName, collection, (err, data) => {
        console.log('ALL collections ', data)
    })
}

function addNewCollection(dbName, newColl, body) {
    Collections.addCollection(dbName, newColl, body, (err, data) => {
        console.log('After add new collection', data)
    })
}

function updateCollection(dbName, newColl, body) {
    Collections.addCollection(dbName, newColl, body, (err, data) => {
        console.log('After add new collection', data)
    })
}

function deleteCollection(dbName, coll, collId) {
    Collections.deleteCollection(dbName, coll, collId, (err, data) => {
        console.log('After add new collection', data)
    })
}

/**
 */
// let dbName = 'benfica'
// listDbCollecions(dbName)

/** 
 * List a specific collection
 */
// let dbName = 'benfica'
// let collection = 'jogadores'
// listDbCollecions(dbName, collection)

/**
 *  Add a new collection in database
 */
// let dbName = 'benfica'
// let coll = 'sub20'
// let body = {
//     description: "collection describe sub 20 team"
// }
// addNewCollection(dbName, coll, body);

/**
 *  Add a new collection in database
 */
let dbName = 'benfica'
let coll = 'sub20'
let collId = '5cb661f31ed797000816efd7'

deleteCollection(dbName, coll, collId);