import express from 'express';
import { Request, Response } from 'express';
import axios from 'axios';
import logger from '../utils/logger';
import {getFilteredData, getTotalResponsesAndPageCount, getLimitedData} from '../services/filters';
import { apiUrlAndPath, API_KEY } from '../utils/config';

const apiRouter = express.Router();

apiRouter.get(
  '/forms/:formId/filteredResponses',
  async (req: Request, res: Response) => {
    try {
      const filtersParam = req.query.filters;
      const requestedLimit = Number(req.query.limit) || null;

      // if filters are present, remove limit query param to get all responses
      if (filtersParam) {
        delete req.query.limit;
      }

      const apiSubmissionsEndPoint = `${apiUrlAndPath}/${req.params.formId}/submissions`;
      
      const apiResponse = await axios.get(apiSubmissionsEndPoint, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: req.query,
        validateStatus: function (status) {
          // relay api apiResponse witn any status code
          return true;
        },
      });

      let data = await apiResponse.data;

      if (filtersParam && apiResponse.status === 200) {
        const filters = JSON.parse(filtersParam as string); // note: yes we do need to parse filter params
        data = getFilteredData(data, filters);
        data = getTotalResponsesAndPageCount(data, requestedLimit);
        data = getLimitedData(data, requestedLimit);
      }
      res.status(apiResponse.status).send(data);
    } catch (error) {
      logger.error('error:', error);
    }
  }
);

apiRouter.all('*', (req, res) => {
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

export default apiRouter;

