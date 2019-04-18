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


function deleteDocument(dbName, coll, rowId, etag) {
    Document.deleteDocument(dbName, coll, rowId, etag, (err, data) => {
        if (err)
            console.log('Error from adding row ', err)
        else
            console.log('LIST ', data);
    })

}

function updateDocument(dbName, coll, rowId, body) {
    Document.updateDocument(dbName, coll, rowId, body, (err, data) => {
        if (err)
            console.log('Error from adding row ', err)
        else
            console.log('LIST ', data);
    })

}

/**
 * sample of filters
 * age equal 33
 * ?filter={'age' : '33'}
 * number greater them 50
 * ?filter={'number' : {'$gte' : 50}}
 * Less then 
 * ?filter={'number' : {'$lte' : 50}}
 * more at : https://restheart.org/learn/query-documents/
 */
function queryDocument(dbName, coll, filter) {
    Document.queryDocuments(dbName, coll, filter, (err, data) => {
        if (err)
            console.log('Error from adding row ', err)
        else
            console.log('query ', data);
    })
}


/**
 * Add row to a collection
 */
// let dbName = 'benfica'
// let collection = 'jogadores'
// // let body = {
// //     name: 'pizzi',
// //     age: '29',
// //     number: 17
// // }
// let body2 = {
//     name: 'FEJSA',
//     age: '21',
//     number: 200
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
// let dbName = 'benfica'
// let collection = 'jogadores'
// let docId = '5cb70d6dde0fb791d814a277'
// getDocument(dbName, collection, docId)

/**
 * 
 * Remove row from a collection
 */
// let dbName = 'benfica'
// let collection = 'jogadores'
// let rowId = '5cb73fa369b4f8faa2542088'
// let etag = '5cb73fa31ed7970009f14817'
// deleteDocument(dbName, collection, rowId, etag)

/**
 * 
 * Remove row from a collection
 */
// let dbName = 'benfica'
// let collection = 'jogadores'
// let rowId = '5cb70d4ede0fb791d814a26d'
// let newBody = {
//     age : '342'
// }
// updateDocument(dbName, collection, rowId, newBody)



/**
 * Query document  with compose filter
 * 
 */
let dbName = 'benfica'
let collection = 'jogadores'
let equal = {
    age: '33'
}
let greater = {
    'number': {
        '$gte': 1
    }
}
queryDocument(dbName, collection, [equal, greater])
//let normalized = service.buildUrl(url, tmp);