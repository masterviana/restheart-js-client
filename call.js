let request = require('request');
let service = require('./src/api_client');
let resultSet = require('./src/models/resultset');
let async = require('async');

let model = require('./src/models/item')

function getDatabase() {

    var options = {
        url: 'https://localhost:4445/benfica/treinador',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW46dmZvcw==',
            'Cache-Control': 'no-cache',
            'Upgrade-Insecure-Requests': "1",
            'Connection': 'keep-alive'
        },
        agentOptions: {
            rejectUnauthorized: false
        },
    };


    function callback(error, response, body) {
        console.log('callback of request ', error);
        console.log('Reps ', response);
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log('Resp ', info);
        }
    }

    request(options, callback);

}

function addTreinador() {

    var body = {
        "treinadorid": "Andre Jardim",
        "name": "A. Jardim",
        "rating": 90

    }

    var options = {
        url: 'https://localhost:4445/benfica/treinador',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW46dmZvcw==',
            'Cache-Control': 'no-cache',
            'Upgrade-Insecure-Requests': "1",
            'Connection': 'keep-alive'
        },
        agentOptions: {
            rejectUnauthorized: false
        },
        body: body,
        json: true

    };


    function callback(error, response, body) {
        console.log('callback of request ', error);
        console.log('Reps ', response);
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log('Resp ', info);
        }
    }

    request(options, callback);
}

//addTreinador()
//getDatabase();


console.log('Run itt...', resultSet)

service.setAuthToken('Basic YWRtaW46dmZvcw==');
service.request('/benfica/treinador', 'GET', {}, null, null, null, null, {}, (err, data) => {
    if (err) {
        console.error('ERror ', err)
    } else {
    resultSet.parseRaw(data, (err ,  d) => {

            console.error('NNNNNNNNNNNNNNNNNNN : ', d.resultItens)
        });
        
        

    }
})