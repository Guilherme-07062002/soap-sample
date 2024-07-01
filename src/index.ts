import express from 'express';
import http from 'http';
import { callDivideService } from './send-request';

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/divide', async (req, res) => {
  const result = await callDivideService(25, 5)
    .then(result => {
      console.log('Resultado da divisão:', result);
    })
    .catch(error => {
      console.error('Erro:', error);
    });

  res.send('Resultado da divisão: ' + result);
})

server.listen(3000, () => {
  console.log('\nlistening on 3000');
});

