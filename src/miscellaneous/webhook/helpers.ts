import { Logger } from '@nestjs/common';
import { request, RequestOptions } from 'https';
import { StateLinkResponse } from './types';

export const getStateLink = (requestId: string, token: string) => {
  const logger = new Logger('Clip');

  return new Promise<StateLinkResponse>((resolve, reject) => {
    const options: RequestOptions = {
      hostname: 'api.payclip.com',
      path: `/v2/checkout/${requestId}`,
      method: 'GET',
      headers: {
        authorization: `Basic ${token}`,
        'content-type': 'application/json',
        accept: 'application/json',
      },
    };

    const req = request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          logger.error(`Error al crear el link de pago en Clip: ${body}`);
          return reject(new Error(`Clip API error: ${res.statusCode}`));
        }
        try {
          const response: StateLinkResponse = JSON.parse(body);
          resolve(response);
        } catch (error) {
          logger.error(
            `Error al procesar la respuesta de Clip: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
            error instanceof Error ? error.stack : undefined,
          );
          reject(new Error('Error al procesar la respuesta de Clip'));
        }
      });
    });

    req.on('error', (error) => {
      logger.error(
        `Error al crear el link de pago en Clip: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
        error instanceof Error ? error.stack : undefined,
      );
      reject(error);
    });

    req.end();
  });
};
