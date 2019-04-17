let Document = require('../src/api/document')
let service = require('../src/api_client')
let async = require('async')

/** Authenticate Token  */
service.setAuthToken('Basic YWRtaW46dmZvcw==');

// MORE INFO
// https://restheart.org/curies/2.0/document.html


function addDocument(dbName, coll, row) {
    Document.addDocument(dbName, coll, row, (err, data) => {
        if (err)
            console.log('Error from adding row ', row)
        else
            console.log('After adding ', data);
    })
}


function listAllDocuments(dbName, coll) {
    Document.listAllDocuments(dbName, coll, (err, data) => {
        if (err)
            console.log('Error from adding row ', row)
        else
            console.log('List of Docs ', data);
    })

}

function getDocument(dbName, coll, docId) {
    Document.getDocument(dbName, coll, docId, (err, data) => {
        if (err)
            console.log('Error from adding row ', row)
        else
            console.log('Doc is ', data);
    })

}


function deleteRow(dbName, coll, rowId) {
    Document.deleteRow(dbName, coll, rowId, (err, data) => {
        if (err)
            console.log('Error from adding row ', err)
        else
            console.log('LIST ', data);
    })

}

/**
 * Add row to a collection
 */
// let dbName = 'benfica'
// let collection = 'jogadores'
// let body = {
//     name: 'pizzi',
//     age: '29',
//     number: 17
// }
// let body2 = {
//     name: 'samaris',
//     age: '29',
//     number: 17
// }
// addDocument(dbName, collection, body2);


/**
 * 
 * LIST ALL documents
 * 
*/
// let dbName = 'benfica'
// let collection = 'jogadores'
// listAllDocuments(dbName,collection )


/**
 * 
 * Get Document by Id
 */
let dbName = 'benfica'
let collection = 'jogadores'
let docId = '5cb70d6dde0fb791d814a277'
getDocument(dbName, collection, docId)

/**
 * 
 * Remove row from a collection
 */
// let dbName = 'benfica'
// let collection = 'jogadores'
// let rowId = '5cb701ebde0fb791d814a01f'
// deleteRow(dbName, collection, rowId)

