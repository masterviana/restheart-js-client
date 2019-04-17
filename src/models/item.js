/**
 *  This class represent the model of item
 * 
 * It read all the property of an object
 */

var Model = function () {

    this.etag = null;
    this.id = null;
}

Model.prototype = {


    parseRaw: function (item) {
        this.id = item._id.$oid;
        this.etag = item._etag ? item._etag.$oid ? item._etag.$oid : '' : '';
        for (var prop in item) {
            if (prop != '_id' && prop != '_etag') {
                this[prop] = item[prop];
            }
        }
        return this;
    },


}

exports = module.exports = Model;