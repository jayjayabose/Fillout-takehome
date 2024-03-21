# Filter Notes
- filterClause with `type: number`
  - no special handling for the case question `value` is an `null`, filterClause will not match
  
- filterClause with `type: string`
  - no special handling for the case filterCause `value` is an emppty string (``), filterClause will not match
  - no special handling for the case question `value` is an `null`, filterClause will not match
  - `condition: greater_than` or `condtion: less_than` 
    - The filter compares strings semantically 
    - Alternatively we could choose to treat this as an invalid filter and return an error




- api response data is type `any`
- null values and greater than less than