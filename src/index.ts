import express from 'express';
import http from 'http';
import { callDivideService } from './send-request';

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
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

