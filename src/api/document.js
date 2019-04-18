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

    deleteDocument: function (dbName, coll, docId, etag, next) {
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

                let path = '/' + dbName + '/' + coll + '/' + docId;

                Api.request(path, 'DELETE', {}, null, {
                    "If-Match": etag
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
    updateDocument: function (dbName, coll, docId, body, next) {
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
                debug('PATCH ', path, ' with body')
                Api.request(path, 'PATCH', {}, null, null, body, null, {}, (err, data) => {
                    let item = new Item()
                    inext(null, item.parseRaw(data.body));
                });
            }
        ], (err, data) => {
            next(err, data);
        })


    },

    /**
     *  Query documents from collecation to learn more how to perform this 
     * https://restheart.org/learn/query-documents/
     * @param {*} dbName 
     * @param {*} coll 
     * @param {*} filter 
     * @param {*} next 
     */
    queryDocuments: function (dbName, coll, filter, next) {
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
                debug('TODEL  : FILTER ', path, ' with body')
                Api.request(path, 'GET', {}, filter, null, null, null, {}, (err, data) => {
                    let item = new Item()
                    inext(null, item.parseRaw(data.body));
                });
            }
        ], (err, data) => {
            next(err, data);
        })
    }


}


exports = module.exports = new Document;