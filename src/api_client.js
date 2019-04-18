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
    request: function (path, httpMethod, pathParams,
        queryParams, headerParams, body, contentTypes,
        returnType, next) {


        if (!(path && path.length > 0)) {
            debug('You should supply a path for request!')

            throw new Error("You should supply a path for request!");
        }

        if (!(httpMethod && (httpMethod == 'GET' || httpMethod == 'POST' || httpMethod == 'PUT' || httpMethod == 'DELETE'  || httpMethod == 'PATCH'))) {

            throw new Error("You should supply the http method you want execute [POST|GET|PUT|DELETE]");
        }

        if (!security.isAuth) {
            throw new Error("You should supply auth token to securtiy model");
        }

        /**
         * prepare URL
         */
        let url = this.buildUrl(path, pathParams);
        debug('Url to request is ', url);

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