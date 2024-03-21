# Notes on filter
- filterClause with `type: number`
  - no special handling for the case question `value` is an `null`, filterClause will not match

- filterClause with `type: string`
  - no special handling for the case filterCause `value` is an emppty string (``), filterClause will not match
  - no special handling for the case question `value` is an `null`, filterClause will not match
  - `condition: greater_than` or `condtion: less_than` 
    - The filter compares strings semantically 
    - Alternatively we could choose to treat this as an invalid filter and return an error

# Notes on `totalResponses` and `pageCount`
The way I read the requirements is as follows:
- `totalResponses` represents "total number of submissions matching given parameters"
  - `filters` is a given parameter to `/filteredResponses` endpoint
  - therefore `/filteredResponses` endpoint should return a value for `totalResponses` that is refelctive of `filters` being appplied 

However, I see a complication:
  -  In the case that the `totalResponses` value returned from `/responses` endpiont is greater than number of responses in the body of the response,  `/filteredResponses` does not have all the data to be filtered
    - e.g. `/responses` returns a max of 150 responses (if I understand correctly)
    - say, `totalResponses` `/responses` is `500`. 
    - In this case `/filteredResponses` can only apply a filter to `150` records, not `500`, and so `totalResponses` value to be returned from `/filteredResponses` cannot be determined
      - This could be solved by making multiple requests to `/responses` to retrive all `500` responses and then filtering
        - I have not implemented this.

My assumption:
- `totalResponses` returned from `/responses` does not exceed the number of respones allowed in JSON (150 I believe)



"totalResponses": 300, // total number of submissions matching given parameters
	"pageCount": 2 // total number of pages of submissions based on provided limit
OTHER
- api response data is type `any`
- null values and greater than less than