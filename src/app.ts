import express, { Application, Request, Response } from 'express';
import logger from './utils/logger';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL || null;
const RESOURCE_PATH = process.env.RESOURCE_PATH || null;
const API_KEY = process.env.API_KEY || null;

let urlAndPath: string;

if (BASE_URL && RESOURCE_PATH) {
  urlAndPath = BASE_URL + RESOURCE_PATH;
  logger.info('urlAndPath:', urlAndPath);
} else {
  logger.error('One or envioronment variables are null. Check your .env file.');
}

const app: Application = express();

app.get(
  '/v1/api/forms/:formId/filteredResponses',
  async (req: Request, res: Response) => {
    logger.info('route hit', req.query);
    try {
      const url = `${urlAndPath}/${req.params.formId}/submissions`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: req.query,
        validateStatus: function (status) {
          // relay api response of any status code
          return true;
        },
      });

      const data = await response.data;
      res.status(response.status).send(response.data);
    } catch (error) {
      // res.status(400).json({message: 'Invalid formId'});
    }
  }
);

app.all('*', (req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Error</title>
        </head>
        <body>
          <pre>Cannot GET ${req.path}</pre>
      </body>
    </html>  
  `);
});

export default app;