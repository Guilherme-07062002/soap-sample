import { parseStringPromise } from 'xml2js';
import soapRequest from 'easy-soap-request';

export async function callDivideService(intA: number, intB: number) {
  const url = 'http://www.dneonline.com/calculator.asmx?wsdl';
  const sampleHeaders = {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
    soapAction: 'http://tempuri.org/Divide',
  };
  const soapEnvelope = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Divide xmlns="http://tempuri.org/">
          <intA>${intA}</intA>
          <intB>${intB}</intB>
        </Divide>
      </soap:Body>
    </soap:Envelope>
  `;

  const { response } = await soapRequest({ url, headers: sampleHeaders, xml: soapEnvelope });
  const { body } = response;

  const parsed = await parseStringPromise(body);
  const result = parsed['soap:Envelope']['soap:Body'][0]['DivideResponse'][0]['DivideResult'][0];

  return result;
}


