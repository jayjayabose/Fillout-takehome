import express, { Application, Request, Response } from 'express';
import logger from './utils/logger';
import axios from 'axios';
import {getFilteredData} from './services/filters';
import { log } from 'console';

const BASE_URL = process.env.BASE_URL || null;
const RESOURCE_PATH = process.env.RESOURCE_PATH || null;
const API_KEY = process.env.API_KEY || null;

let apiUrlAndPath: string;

if (BASE_URL && RESOURCE_PATH) {
  apiUrlAndPath = BASE_URL + RESOURCE_PATH;
  logger.info('apiUrlAndPath:', apiUrlAndPath);
} else {
  logger.error('One or envioronment variables are null. Check your .env file.');
}

const app: Application = express();


app.get(
  '/v1/api/forms/:formId/filteredResponses',
  async (req: Request, res: Response) => {
    logger.info('route hit', req.query);
    try {
      let requestedLimit = req.query.limit;
      delete req.query.limit;

      logger.info('req.query', req.query, `requestedLimit`, requestedLimit );
      const apiSubmissionsEndPoint = `${apiUrlAndPath}/${req.params.formId}/submissions`;
      
      const apiResponse = await axios.get(apiSubmissionsEndPoint, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: req.query,
        validateStatus: function (status) {
          // relay api apiResponse witn any status code
          return true;
        },
      });

      const filtersParam = req.query.filters;
      let data = await apiResponse.data;
      // logger.info('data:', data, typeof data);

      if (filtersParam && apiResponse.status === 200) {
        const filters = JSON.parse(filtersParam as string); // note: yes we do need to parse filter params
        data = getFilteredData(data, filters);
        logger.info('getFilteredData:', filters, data.responses.length);
        //data = getResponsesPageCount(data, limit) // note: implment this function
      }
      res.status(apiResponse.status).send(data);
    } catch (error) {
      logger.error('error:', error);
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