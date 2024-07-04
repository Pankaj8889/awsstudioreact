const AWS = require('aws-sdk');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.STORAGE_CONTACTFORMDB_NAME;

app.use(bodyParser.json());

app.post('/contact', async (req, res) => {
  const { email, message, phone } = req.body;

  const params = {
    TableName: tableName,
    Item: {
      email,
      message,
      phone,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    res.status(200).json({ message: 'Contact info saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not save contact info' });
  }
});

module.exports = app;
