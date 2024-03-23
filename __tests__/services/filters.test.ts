import { filterMatchesResponse, getFilteredData } from '../../src/services/filters';
import { apiData} from '../data'; 
import { FilterClauseType } from '../../src/types/types';

describe('filterMatchesResponse, number', () => {
  const employeesEquals: FilterClauseType = {id: "fFnyxwWa3KV6nBdfBDCHEA", condition: "equals", value: 2};
  const employeesDoesNotEqual: FilterClauseType = {id: "fFnyxwWa3KV6nBdfBDCHEA", condition: "does_not_equal", value: 2};
  const employeesGreaterThan: FilterClauseType = {id: "fFnyxwWa3KV6nBdfBDCHEA", condition: "greater_than", value: 1};
  const employeesLesseThan: FilterClauseType = {id: "fFnyxwWa3KV6nBdfBDCHEA", condition: "less_than", value: 4};
  const employeesLesseThanFloat: FilterClauseType = {id: "fFnyxwWa3KV6nBdfBDCHEA", condition: "less_than", value: 2.1};
  
  test('number: equals', () => {
    const match = filterMatchesResponse(apiData.responses[0], employeesEquals);
    expect(match).toEqual(true);

  });

  test('number; does_not_equal', () => {
    const match = filterMatchesResponse(apiData.responses[0], employeesDoesNotEqual);
    expect(match).toEqual(false);
  });

  test('number: greater_than', () => {
    const match = filterMatchesResponse(apiData.responses[0], employeesGreaterThan);
    expect(match).toEqual(true);

  });

  test('number: less_than', () => {
    const match = filterMatchesResponse(apiData.responses[0], employeesLesseThan);
    expect(match).toEqual(true);
  });

  test('number: less_than: float', () => {
    const match = filterMatchesResponse(apiData.responses[0], employeesLesseThanFloat);
    expect(match).toEqual(true);
  });

  test('number: equals + response value is null', () => {
    const match = filterMatchesResponse(apiData.responses[2], employeesEquals);
    expect(match).toEqual(false);
  });
  
});

describe('filterMatchesResponse, string, not date', () => {
  const nameEquals: FilterClauseType = {id: "bE2Bo4cGUv49cjnqZ4UnkW", condition: "equals", value: "Johnny"};
  const nameDoesNotEqual: FilterClauseType = {id: "bE2Bo4cGUv49cjnqZ4UnkW", condition: "does_not_equal", value: "Johnny"};
  const nameGreaterThan: FilterClauseType = {id: "bE2Bo4cGUv49cjnqZ4UnkW", condition: "greater_than", value: "A"};
  const nameLesseThan: FilterClauseType = {id: "bE2Bo4cGUv49cjnqZ4UnkW", condition: "less_than", value: "A"};
  
  test('string, not date: equals', () => {
    const match = filterMatchesResponse(apiData.responses[0], nameEquals);
    expect(match).toEqual(true);

  });

  test('string, not date; does_not_equal', () => {
    const match = filterMatchesResponse(apiData.responses[0], nameDoesNotEqual);
    expect(match).toEqual(false);
  });
  
  test('string, not date; does_not_equal - Jane', () => {
    const match = filterMatchesResponse(apiData.responses[0], {... nameDoesNotEqual, value: "Jane"});
    expect(match).toEqual(true);
  });

  test('string, not date: greater_than', () => {
    const match = filterMatchesResponse(apiData.responses[0], nameGreaterThan);
    expect(match).toEqual(true);

  });

  test('string, not date: less_than', () => {
    const match = filterMatchesResponse(apiData.responses[0], nameLesseThan);
    expect(match).toEqual(false);
  });
});

describe('filterMatchesResponse, string, is date', () => {
  const dateEquals: FilterClauseType = {id: "dSRAe3hygqVwTpPK69p5td", condition: "equals", value: "2024-02-01"};
  const dateDoesNotEqual: FilterClauseType = {id: "dSRAe3hygqVwTpPK69p5td", condition: "does_not_equal", value: "2024-02-01"};
  const dateGreaterThan: FilterClauseType = {id: "dSRAe3hygqVwTpPK69p5td", condition: "greater_than", value: "2023-02-01"};
  const dateLesseThan: FilterClauseType = {id: "dSRAe3hygqVwTpPK69p5td", condition: "less_than", value: "2023-02-01"};
  const dateEqualsEmptyString: FilterClauseType = {id: "dSRAe3hygqVwTpPK69p5td", condition: "equals", value: ""};
  
  test('string, is date: equals', () => {
    const match = filterMatchesResponse(apiData.responses[0], dateEquals);
    expect(match).toEqual(true);

  });

  test('string, is date; does_not_equal', () => {
    const match = filterMatchesResponse(apiData.responses[0], dateDoesNotEqual);
    expect(match).toEqual(false);
  });

  test('string, is date: greater_than', () => {
    const match = filterMatchesResponse(apiData.responses[0], dateGreaterThan);
    expect(match).toEqual(true);

  });

  test('string, is date: less_than', () => {
    const match = filterMatchesResponse(apiData.responses[0], dateLesseThan);
    expect(match).toEqual(false);
  });

  test('string, is date: equal -- question value null', () => {
    const match = filterMatchesResponse(apiData.responses[2], dateEquals);
    expect(match).toEqual(false);
  });

  test('string, is date: equal -- question value null, filter value empty string', () => {
    const match = filterMatchesResponse(apiData.responses[2], dateEqualsEmptyString);
    expect(match).toEqual(false);
  });
});

describe('getFilteredData', () => {
  const nameEquals: FilterClauseType = {id: "bE2Bo4cGUv49cjnqZ4UnkW", condition: "equals", value: "Johnny"};
  const nameDoesNotEqual: FilterClauseType = {id: "bE2Bo4cGUv49cjnqZ4UnkW", condition: "does_not_equal", value: "Johnny"};
  const employeesGreaterThan: FilterClauseType = {id: "fFnyxwWa3KV6nBdfBDCHEA", condition: "greater_than", value: 1};

  test('getFilteredData: one filter: nameEquals', () =>{
    let filteredApiData = getFilteredData(apiData, [nameEquals]);
    expect(filteredApiData.responses.length).toEqual(1);
  });

  test('getFilteredData: one filter: nameDoesNotEqual', () =>{
    let filteredApiData2 = getFilteredData(apiData, [nameDoesNotEqual]);
    expect(filteredApiData2.responses.length).toEqual(13);
  });

  test('getFilteredData: two filters: nameEquals + nameDoesNotEqual', () =>{
    let filteredApiData = getFilteredData(apiData, [nameEquals, nameDoesNotEqual]);
    expect(filteredApiData.responses.length).toEqual(0);
  });

  test('getFilteredData: two filters: nameEquals + nameDoesNotEqual', () =>{
    let filteredApiData = getFilteredData(apiData, [nameEquals, employeesGreaterThan]);
    expect(filteredApiData.responses.length).toEqual(1);
  });
});