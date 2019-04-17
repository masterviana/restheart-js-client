let async = require('async')
let Api = require('../api_client')
let resultSet = require('../models/resultset')
let Item = require('../models/item')
let debug = console.log

let Document = function () {

}

Document.prototype = {

    addDocument: function (dbName, coll, document, next) {
        let self = this;

        async.waterfall([
            (inext) => {
                if (dbName && dbName.length > 0) {
                    inext()
                } else {
                    inext('You supply db name');
                }
            },
            (inext) => {
                if (coll && coll.length > 0) {
                    inext()
                } else {
                    inext('You should supply collection name');
                }
            },
            (inext) => {
                let path = '/' + dbName + '/' + coll;
                debug('POST ', path, ' with body')
                Api.request(path, 'POST', {}, null, null, document, null, {}, (err, data) => {

                    resultSet.parseRaw(data, (er, d) => {
                        inext(er, d);
                    });
                });
            }
        ], (err, data) => {
            next(err, data);
        })


    },
    listAllDocuments: function (dbName, coll, next) {
        let self = this;

        async.waterfall([
            (inext) => {
                if (dbName && dbName.length > 0) {
                    inext()
                } else {
                    inext('You supply db name');
                }
            },
            (inext) => {
                if (coll && coll.length > 0) {
                    inext()
                } else {
                    inext('You should supply collection name');
                }
            },
            (inext) => {
                let path = '/' + dbName + '/' + coll;
                debug('POST ', path, ' with body')
                Api.request(path, 'GET', {}, null, null, null, null, {}, (err, data) => {

                    resultSet.parseRaw(data, (er, d) => {
                        inext(er, d);
                    });
                });
            }
        ], (err, data) => {
            next(err, data);
        })


    },

    deleteDocument: function (dbName, coll, rowId, next) {
        let self = this;

        async.waterfall([
            (inext) => {
                if (dbName && dbName.length > 0)
                    inext()
                else
                    next('you should supply the dbname for deleing new database');
            },
            (inext) => {
                if (coll && coll.length > 0)
                    inext()
                else
                    next('you should supply the collection for delete row');
            },
            (inext) => {

                let path = '/' + dbName + '/' + coll;

                Api.request(path, 'DELETE', {}, null, {
                    "If-Match": rowId
                }, null, null, {}, (err, data) => {
                    resultSet.parseRaw(data, (er, d) => {
                        inext(err, d);
                    });
                });
            }
        ], (err, data) => {
            next(err, data);
        })

    },
    getDocument: function (dbName, coll, docId, next) {
        let self = this;

        async.waterfall([
            (inext) => {
                if (dbName && dbName.length > 0) {
                    inext()
                } else {
                    inext('You supply db name');
                }
            },
            (inext) => {
                if (coll && coll.length > 0) {
                    inext()
                } else {
                    inext('You should supply collection name');
                }
            },
            (inext) => {
                let path = '/' + dbName + '/' + coll + '/' + docId;
                debug('GET ', path, ' with body')
                Api.request(path, 'GET', {}, null, null, null, null, {}, (err, data) => {
                    let item = new Item()
                    inext(null, item.parseRaw(data.body));
                });
            }
        ], (err, data) => {
            next(err, data);
        })


    },


}


exports = module.exports = new Document;