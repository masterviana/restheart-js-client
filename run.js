let r = require('./src/api_client');

console.log('R is ', r);

// https://restheart.org/learn/tutorial/



function getDatabase(next) {

    let baseUrl ="https://localhost:4445";
    r.setBaseUrl(baseUrl, ()=>{

    });

    let url = "/";

    let method = "GET";
    let authorization = 'Basic YWRtaW46dmZvcw=='
    let postBody = {};

    // verify the required parameter 'database' is set
    // if (database === undefined || database === null) {
    //     throw new Error("Missing the required parameter 'database' when calling addDatabase");
    // }

    // verify the required parameter 'authorization' is set
    if (authorization === undefined || authorization === null) {
        throw new Error("Missing the required parameter 'authorization' when calling addDatabase");
    }

    let pathParams = {};
    let queryParams = {};
    let headerParams = {
        'Authorization': authorization
    };
    let formParams = {};

    let authNames = ['basicAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    //let returnType = Error;
    let returnType = {}

    return r.callApi(
        url, method ,
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, next
    );
}


getDatabase((err, data)=>{
    if(err){
        console.log('error from data ', err)
    }
    else{
        console.log('Data is  ', data );
    }
})


console.log('Thats finish!!');