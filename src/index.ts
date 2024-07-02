import express from 'express';
import http from 'http';
import { callDivideService } from './send-request';

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use((req, res, next) => {
  res.header('Content-Type', 'text/xml');
  next();
});

app.post('/mock-soap', (req, res) => {
  // XML de resposta mockado
  const responseXml = `
    <Response>
      <Message>Success</Message>
      <Data>
        <Item>
          <Name>Item 1</Name>
          <Value>123</Value>
        </Item>
        <Item>
          <Name>Item 2</Name>
          <Value>456</Value>
        </Item>
      </Data>
    </Response>
  `;
  res.send(responseXml);
});

app.post('/divide', async (req, res) => {
  const body = req.body;
  const intA = parseInt(body.intA);
  const intB = parseInt(body.intB);

  const result = await callDivideService(intA, intB);
  res.send({
    result: parseInt(result),
  });
})

server.listen(3000, () => {
  console.log('\nlistening on 3000');
});

