let async = require('async')
let Api = require('../api_client')
let Resultset = require('../models/item')

let Rows = function () {

}

Rows.prototype = {

    addDatabase: function (dbname, next) {
        let self = this;

        async.waterfall([
            (inext) => {

            }, (inext) => {

            }
        ], (err, data) => {

        })



    },
    listAllDatabases: function (next) {
        let self = this;

        async.waterfall([
            (inext) => {

            }, (inext) => {

            }
        ], (err, data) => {

        })

    },
    getDatabase: function (dbname, next) {
        let self = this;

        async.waterfall([
            (inext) => {

            }, (inext) => {

            }
        ], (err, data) => {

        })

    },
    deleteDatabase: function (dbname, next) {
        let self = this;

        async.waterfall([
            (inext) => {

            }, (inext) => {

            }
        ], (err, data) => {

        })


    }



}


exports = module.exports = new Rows;