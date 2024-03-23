import express from 'express';
import { Request, Response } from 'express';
import axios from 'axios';
import logger from '../utils/logger';
import {
  getFilteredData,
  getTotalResponsesAndPageCount,
  getLimitedData,
} from '../services/filters';
import { apiUrlAndPath, API_KEY } from '../utils/config';
import {
  SubmissionsResponseInterface,
  ResponseFiltersType,
} from '../types/types';

const apiRouter = express.Router();

function formatFilteredResponse(
  data: SubmissionsResponseInterface,
  filters: ResponseFiltersType,
  requestedLimit: number | null
): SubmissionsResponseInterface {
  data = getFilteredData(data, filters);
  data = getTotalResponsesAndPageCount(data, requestedLimit);
  data = getLimitedData(data, requestedLimit);
  return data;
}

apiRouter.get(
  '/forms/:formId/filteredResponses',
  async (req: Request, res: Response) => {
    try {
      const apiSubmissionsEndPoint = `${apiUrlAndPath}/${req.params.formId}/submissions`;
      const filtersParam = req.query.filters;
      const requestedLimit = Number(req.query.limit) || null;
      const paramsToRelay = { ...req.query };

      // if filters are present, remove limit query param to get all responses from '/submissions' endpoint
      if (filtersParam) {
        delete paramsToRelay.limit;
      }

      const apiResponse = await axios.get(apiSubmissionsEndPoint, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: paramsToRelay,
        validateStatus: function (status) {
          return true; // relay api apiResponse regarless of status code
        },
      });

      let data: SubmissionsResponseInterface = await apiResponse.data;

      if (filtersParam && apiResponse.status === 200) {
        const filters = JSON.parse(filtersParam as string);
        data = formatFilteredResponse(data, filters, requestedLimit);
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