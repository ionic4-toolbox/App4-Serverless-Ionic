"use strict";

const AWS = require("aws-sdk");

class Response {
  constructor(){
      this.statusCode = 200;
      this.headers = {"Access-Control-Allow-Origin" : "*"};
      this.body = "";
  }
}

const getDynamoClient = () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient({region: 'ap-northeast-1'});
  return dynamodb;
};

exports.foo = async (event) => {
  const dynamodb = getDynamoClient();

  const params = {
    TableName: "sample_table"
  };
  
  try {
    const scanItems = await dynamodb.scan(params).promise();
    const response = new Response();
    response.body = JSON.stringify(scanItems);
    return response;
  } catch(err) {
    throw err;
  }
};

exports.bar = async (event) => {
  const body = JSON.parse(event.body);
  const response = new Response();
  response.body = JSON.stringify(body);
  return response;
};