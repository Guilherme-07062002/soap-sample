import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export async function callDivideService(intA: number, intB: number) {
  const url = 'http://www.dneonline.com/calculator.asmx';
  const soapEnvelope = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Divide xmlns="http://tempuri.org/">
          <intA>${intA}</intA>
          <intB>${intB}</intB>
        </Divide>
      </soap:Body>
    </soap:Envelope>
  `;

  console.log('Calling SOAP service:', url);
  await axios.post(url, soapEnvelope, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://tempuri.org/Divide',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  }).then(async response => {
    const result = await parseStringPromise(response.data, { explicitArray: false });
    const divideResult = result['soap:Envelope']['soap:Body']['DivideResponse']['DivideResult'];

    return parseFloat(divideResult);
  }).catch(error => {
    console.error('Erro:', error);
    return error;
  });
}


