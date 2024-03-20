import express, { Application, Request, Response } from 'express';
import logger from './utils/logger';
import axios from 'axios';
import { log } from 'console';
import { subscribe } from 'diagnostics_channel';

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

type ResponseFiltersType = FilterClauseType[];

type FilterClauseType = {
	id: string;
	condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
	value: number | string;
}

// type the data?
function applyFilter(data: any, filters: ResponseFiltersType): any {
  logger.info('applyFilter:', filters, typeof filters);

  data.responses = data.responses.filter((response: any) => {
    logger.info('response:', response.submissionId);
    return filters.every((filter: FilterClauseType) => {
      // return true if any question matches filter
      return response.questions.some((question: any) => {
        return true;
      });
    })
    
  })
  return data;
}

app.get(
  '/v1/api/forms/:formId/filteredResponses',
  async (req: Request, res: Response) => {
    logger.info('route hit', req.query);
    try {
      const url = `${urlAndPath}/${req.params.formId}/submissions`;
      
      const apiResponse = await axios.get(url, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: req.query,
        validateStatus: function (status) {
          // relay api apiResponse of any status code
          return true;
        },
      });

      const filtersParam = req.query.filters;
      let data = await apiResponse.data;

      if (filtersParam && apiResponse.status === 200) {
        const filters = JSON.parse(filtersParam as string);
        data = applyFilter(data, filters);
      }
      res.status(apiResponse.status).send(apiResponse.data);
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