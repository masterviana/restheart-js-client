let async = require('async');
let model = require('./item');


/**
 *  This class contain the result from query
 * 
 * Contain the fields for object and the list subtitems from the query
 * 
 */
let ResultSet = function () {
    this.resultItens = [];
    this.size = -1;
    this.total_pages = -1;
    this.returned = -1;
    this.statusCode = -1;
}

ResultSet.prototype.parseRaw = function (rawQuery, next) {
    let self = this;

    
    //console.log('Raw Query ', rawQuery);
    async.waterfall([

        (next) => {
            if (rawQuery && rawQuery.body && rawQuery.body._embedded) {
                async.each(rawQuery.body._embedded,
                    (item, inext) => {
                        let y = new model();
                        let itemParsed = y.parseRaw(item);
                        self.resultItens.push(itemParsed);
                        // console.log('item parsed ', itemParsed);
                        inext();
                    },
                    (err) => {
                        if (err) {
                            next(err, null);
                        } else {
                            self.size = rawQuery.body._size ? rawQuery.body._size : -1;
                            self.total_pages = rawQuery.body._total_pages ? rawQuery.body._total_pages : -1;
                            self.returned = rawQuery.body._returned ? rawQuery.body._returned : -1;
                            self.statusCode = rawQuery.statusCode ? rawQuery.statusCode : -1;
                            next(null, self);
                        }
                    });
            } else {
                let ret = rawQuery && rawQuery.statusCode ? {
                    statusCode: rawQuery.statusCode
                } : {};
                next(null, ret);
            }

        }

    ], (err, data) => {

        next(err, data);
    });


}


exports = module.exports = new ResultSet();