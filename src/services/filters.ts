import { log } from 'console';
import { ResponseFiltersType, FilterClauseType, ApiResponseDataType } from '../types/types';

import logger from '../utils/logger';

// type the data?
/*
FILTER
I: responseFilters: FilterClauseType[], responses: { submissionId, ... questions: {id, name, type, value}, ...}[] }[]
O: filtered responses: responseObjects[] // subet
Rules
 - multiple clauses applied as 'AND'
 - update totalResponses and pageCount if needed


{
 sumbissionId:
 questions: [
   id:
    type:
    nhame: 
    value; 
  ]

}

Approach:
 - interrogate all submissions
 - filter for submissions where each filter clause returns truen
 -(update pagination)

Algo: filter
 LOOP: all submiision objects
    return filterCauses.every 
        clause matches a question

*/

// Apply all fiter clauses to the data returned from the API
function getFilteredData(data: ApiResponseDataType, filters: ResponseFiltersType): ApiResponseDataType {
  // loop through submissions/responses
  const filteredResponses = data.responses.filter((response: any) => {
    // filter for submissions where each filter clause returns true
    return filters.every((filter: FilterClauseType) => {
      return filterMatchesResponse(response, filter);
    });
  });
  return { ...data, responses: filteredResponses };
}

// For a response (set of questions), check if any question has answer value that matches filter clause
function filterMatchesResponse(
  response: any,
  filter: FilterClauseType
): boolean {
  const question = response.questions.find((question: any) => {
    return question.id === filter.id;
  });

  // no match if question not found
  if (!question) {
    return false;
  }

  let questionValue = question.value;
  let filterValue = filter.value;

  // if date, reassign values to milliseconds
  if (question.type === 'DatePicker') {
    questionValue = new Date(question.value).getTime();
    filterValue = new Date(filter.value).getTime();
  }

  switch (filter.condition) {
    case 'equals':
      return questionValue === filterValue;
    case 'does_not_equal':
      return questionValue !== filterValue;
    case 'greater_than':
      return questionValue > filterValue;
    case 'less_than':
      return questionValue < filterValue;
  }
}

function getResponsesPageCount<T>(data: T, limit: number): T {
  return data;
}

export { getFilteredData, getResponsesPageCount, filterMatchesResponse};