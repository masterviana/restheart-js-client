let request = require('request');
let security = require('./security')
let debug = console.log //require('debug')('apiclient')
let global = require('./global');


let ClientApi = function () {


    this.baseUrl = global.baseUrl;
    this.defaultContentType = ['application/json'];
    this.useAuth = true;

    this.defaultHeader = {
        'Cache-Control': 'no-cache',
        'Upgrade-Insecure-Requests': "1",
        'Connection': 'keep-alive',
        'Authorization': 'Basic YWRtaW46dmZvcw=='
    };
}


ClientApi.prototype = {


    setAuthToken: function (authToken) {
        let token = security.setToken(authToken);
    },
    initialize : function (baseUrl)
    {
        this.baseUrl = baseUrl;
    },
    isFileParam: function (param) {
        // fs.ReadStream in Node.js and Electron (but not in runtime like browserify)
        if (typeof require === 'function') {
            let fs;
            try {
                fs = require('fs');
            } catch (err) {}
            if (fs && fs.ReadStream && param instanceof fs.ReadStream) {
                return true;
            }
        }

        // Buffer in Node.js
        if (typeof Buffer === 'function' && param instanceof Buffer) {
            return true;
        }

        // Blob in browser
        if (typeof Blob === 'function' && param instanceof Blob) {
            return true;
        }

        // File in browser (it seems File object is also instance of Blob, but keep this for safe)
        if (typeof File === 'function' && param instanceof File) {
            return true;
        }

        return false;
    },
    paramToString: function (param) {
        if (param == undefined || param == null) {
            return '';
        }
        if (param instanceof Date) {
            return param.toJSON();
        }

        return param.toString();
    },

    normalizeParams: function (params) {
        var newParams = {};
        for (var key in params) {
            if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
                var value = params[key];
                if (this.isFileParam(value) || Array.isArray(value)) {
                    newParams[key] = value;
                } else {
                    newParams[key] = this.paramToString(value);
                }
            }
        }

        return newParams;
    },

    buildUrl: function (path, pathParams) {

        if (!path.match(/^\//)) {
            path = '/' + path;
        }

        var url = this.baseUrl + path;
        url = url.replace(/\{([\w-]+)\}/g, (fullMatch, key) => {
            var value;
            if (pathParams.hasOwnProperty(key)) {
                value = this.paramToString(pathParams[key]);
            } else {
                value = fullMatch;
            }

            return encodeURIComponent(value);
        });

        return url;
    },
    /**
     * 
     * @param {*} path 
     * @param {*} httpMethod 
     * @param {*} pathParams 
     * @param {*} queryParams Should be supplied an array of each filter should be applied 
     * @param {*} headerParams 
     * @param {*} body 
     * @param {*} contentTypes 
     * @param {*} returnType 
     * @param {*} next 
     */
    request: function (path, httpMethod, pathParams,
        queryParams, headerParams, body, contentTypes,
        returnType, next) {


        if (!(path && path.length > 0)) {
            debug('You should supply a path for request!')

            throw new Error("You should supply a path for request!");
        }

        if (!(httpMethod && (httpMethod == 'GET' || httpMethod == 'POST' || httpMethod == 'PUT' || httpMethod == 'DELETE' || httpMethod == 'PATCH'))) {

            throw new Error("You should supply the http method you want execute [POST|GET|PUT|DELETE]");
        }

        if (!security.isAuth) {
            throw new Error("You should supply auth token to securtiy model");
        }

        /**
         * prepare URL
         */
        let url = this.buildUrl(path, pathParams);
        let finalFilter = ''

        if (queryParams) {
            for (let i in queryParams) {
                if (finalFilter.length > 4) {
                    finalFilter += '&';
                }
                finalFilter += 'filter=' + JSON.stringify(queryParams[i]);

            }
            url += '?' + finalFilter;
        }
        console.log('URL ', url)



        var options = {
            url: url,
            method: httpMethod,
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': 'Basic YWRtaW46dmZvcw==',
            //     'Cache-Control': 'no-cache',
            //     'Upgrade-Insecure-Requests': "1",
            //     'Connection': 'keep-alive'
            // },
            agentOptions: {
                rejectUnauthorized: false
            },
        };

        /**
         * apply body
         */
        if (body) {
            options.body = body;
            options.json = true;
        }

        /**
         *  Header section
         */
        options.headers = this.defaultHeader;
        options.headers['Content-Type'] = this.defaultContentType;
        if (contentTypes && Array.isArray(contentTypes)) {
            let arr = options.headers['Content-Type'];
            arr = arr.concat(contentTypes).join();
            options.headers['Content-Type'] = arr;
        }

        if (this.useAuth) {
            options.headers['Authorization'] = security.authToken;
        }

        options.headers = Object.assign({}, options.headers);
        if (headerParams) {
            for (let key in headerParams) {
                options.headers[key] = headerParams[key]
            }
        }



        // debug('Headers for request is ', options.headers);


        function callback(error, response, body) {
            if (error) {
                debug('Error requesting to server ', error);

                next(error, null);
            } else {
                //Its work for sure without errors
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    debug('response with sucess ', response.statusCode)

                    let body = response.body ? JSON.parse(response.body) : {};
                    let respJson = {
                        statusCode: response.statusCode,
                        body: body
                    }

                    next(null, respJson);
                } else {
                    //debug('Full response ', response)
                    next({
                        mgs: 'error server ',
                        code: response.statusCode
                    }, null);
                }


            }

        }

        request(options, callback);

    },

}

exports = module.exports = new ClientApi();