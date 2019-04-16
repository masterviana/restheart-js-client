let async = require('async')
let Api = require('../api_client')
let resultSet = require('../models/resultset');

let Collection = function () {

}

Collection.prototype = {
    /**
     * 
     * @param {*} dbName 
     * @param {*} coll 
     * @param {*} body  should contain json object { description : '<desc>' }
     * @param {*} next 
     */
    addCollection: function (dbName, coll, body, next) {

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
                console.log('Get from collections ', path)
                Api.request(path, 'PUT', {}, null, null, body, null, {}, (er, data) => {
                    resultSet.parseRaw(data, (er, d) => {
                        inext(er, d);
                    });
                });
            }
        ], (err, data) => {
            next(err, data);
        })




    },
    /** 
     *      Update its the same of add just call put method 
     **/
    updateCollection: function (dbName, coll, body, next) {
        this.addCollection(dbName, coll, body, next);
    },
    deleteCollection: function (dbname, coll, collId,  next) {
        let self = this;

        async.waterfall([
            (inext) => {
                if (dbname && dbname.length > 0)
                    inext()
                else
                    next('you should supply the dbname for deleing new database');
            }, (inext) => {
                //create database
                let path = '/' + dbname + '/' + coll;

                Api.request(path, 'DELETE', {}, null, {
                    "If-Match": collId
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
    getAllCollections: function (dbName, next) {
        let self = this;

        async.waterfall([
            (inext) => {
                if (dbName && dbName.length > 0) {
                    inext()
                } else {
                    inext('You supply db name');
                }
            }, (inext) => {
                let path = '/' + dbName;
                console.log('Get from collections ', path)
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
    getColletion: function (dbname, collection, next) {
        let self = this;

        async.waterfall([
            (inext) => {
                if (dbName && dbName.length > 0) {
                    inext()
                } else {
                    inext('You supply db name');
                }
            }, (inext) => {
                let path = '/' + dbName + '/' + collection;
                console.log('Get from collections ', path)
                Api.request(path, 'GET', {}, null, null, null, null, {}, (er, datad) => {
                    resultSet.parseRaw(data, (er, d) => {
                        inext(er, d);
                    });
                });
            }
        ], (err, data) => {
            next(err, data);
        })


    }

}


exports = module.exports = new Collection;