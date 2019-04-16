let async = require('async')
let Api = require('../api_client')
let Resultset = require('../models/item')
let global = require('../global')
let resultSet = require('../models/resultset');
let debug = console.log;

let Database = function () {


}

Database.prototype = {

    addDatabase: function (dbname, next) {
        let self = this;

        async.waterfall([
            (inext) => {
                if (dbname && dbname.length > 0)
                    inext()
                else
                    next('you should supply the dbname for adding new database');
            }, (inext) => {
                //create database
                let path = '/' + dbname;
                debug('will call method to created db');
                Api.request(path, 'PUT', {}, null, null, null, null, {}, (err, data) => {
                    resultSet.parseRaw(data, (er, d) => {
                        inext(err, d);
                    });
                });
            }
        ], (err, data) => {
            next(err, data);
        })



    },
    listAllDatabases: function (next) {
        let self = this;

        async.waterfall([
            (inext) => {
                Api.request('/', 'GET', {}, null, null, null, null, {}, inext);
            }, (data, inext) => {
                resultSet.parseRaw(data, (err, d) => {
                    inext(err, d);
                });
            }
        ], (err, data) => {
            next(err, data);
        })

    },
    getDatabase: function (dbname, next) {
        let self = this;

        async.waterfall([
            (inext) => {

                if (dbname)
                    inext();
                else
                    inext('You should supply dbName');
            }, (inext) => {
                let path = '/' + dbname;
                Api.request(path, 'GET', {}, null, null, null, null, {}, (err, data) => {
                    resultSet.parseRaw(data, (er, d) => {
                        inext(err, d);
                    });
                });
            }
        ], (err, data) => {
            next(err, data);
        })

    },
    deleteDatabase: function (dbname, dbID, next) {
        let self = this;

        async.waterfall([
            (inext) => {
                if (dbname && dbname.length > 0)
                    inext()
                else
                    next('you should supply the dbname for deleing new database');
            }, (inext) => {
                //create database
                let path = '/' + dbname;

                Api.request(path, 'DELETE', {}, null, {
                    "If-Match": dbID
                }, null, null, {}, (err, data) => {
                    resultSet.parseRaw(data, (er, d) => {
                        inext(err, d);
                    });
                });
            }
        ], (err, data) => {
            next(err, data);
        })


    }



}


exports = module.exports = new Database();