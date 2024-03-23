import {
  SubmissionsResponseInterface,
  ResponseInterface,
  ResponseFiltersType,
  FilterClauseType,
  QuestionInterface,
} from '../types/types';

// Apply all fiter clauses to the data returned from the API
function getFilteredData(
  data: SubmissionsResponseInterface,
  filters: ResponseFiltersType
): SubmissionsResponseInterface {
  // loop through submissions/responses
  const filteredResponses = data.responses.filter(
    (response: ResponseInterface) => {
      // filter for submissions where each filter clause returns true
      return filters.every((filter: FilterClauseType) => {
        return filterMatchesResponse(response, filter);
      });
    }
  );
  return { ...data, responses: filteredResponses };
}

// For a response (set of questions), check if any question has answer value that matches filter clause
function filterMatchesResponse(
  response: ResponseInterface,
  filter: FilterClauseType
): boolean {
  const question = response.questions.find((question: QuestionInterface) => {
    return question.id === filter.id;
  });

  // false if clause does not match a question
  if (!question) {
    return false;
  }

  let questionValue = question.value;
  let filterValue = filter.value;

  // reassign values to milliseconds if clause is a date type
  if (question.type === 'DatePicker') {
    if (typeof question.value === 'string') {
      questionValue = new Date(question.value).getTime();
      filterValue = new Date(filter.value).getTime();
    } else {
      return false;
    }
  }

  switch (filter.condition) {
    case 'equals':
      return questionValue === filterValue;
    case 'does_not_equal':
      return questionValue !== filterValue;
    case 'greater_than':
      return (
        questionValue !== null &&
        questionValue !== undefined &&
        questionValue > filterValue
      );
    case 'less_than':
      return (
        questionValue !== null &&
        questionValue !== undefined &&
        questionValue < filterValue
      );
  }
}

function getTotalResponsesAndPageCount(
  data: SubmissionsResponseInterface,
  limit: number | null
): SubmissionsResponseInterface {
  const totalResponses = data.responses.length;
  const pageCount = limit ? Math.ceil(totalResponses / limit) : 1;
  return { ...data, totalResponses, pageCount };
}

function getLimitedData(
  data: SubmissionsResponseInterface,
  limit: number | null
): SubmissionsResponseInterface {
  if (limit) {
    return { ...data, responses: data.responses.slice(0, limit) };
  }
  return data;
}

export {
  getFilteredData,
  filterMatchesResponse,
  getTotalResponsesAndPageCount,
  getLimitedData,
};
