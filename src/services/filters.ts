import { ResponseFiltersType, FilterClauseType, ApiResponseDataType } from '../types/types';

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

  // clause does not match if question is not found
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

function getTotalResponsesAndPageCount(data: ApiResponseDataType, limit: number | null): ApiResponseDataType {
  const totalResponses = data.responses.length;
  const pageCount = limit ? Math.ceil(totalResponses / limit) : 1;
  return { ...data, totalResponses, pageCount };
}

function getLimitedData(data: ApiResponseDataType, limit: number | null): ApiResponseDataType {
  if (limit) {
    return { ...data, responses: data.responses.slice(0, limit) };
  }
  return data;
}

export {getFilteredData,  filterMatchesResponse, getTotalResponsesAndPageCount, getLimitedData};