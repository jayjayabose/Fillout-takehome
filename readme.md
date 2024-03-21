# Project: Software Engineering Assignment
- [Requirements](https://fillout.notion.site/Software-engineering-assignment-fbd58fd78f59495c99866b91b1358221)

# Installation:


# Implementation Notes
## Notes on filter
- filterClause with `type: number`
  - no special handling for the case question `value` is an `null`, filterClause will not match

- filterClause with `type: string`
  - no special handling for the case filterCause `value` is an emppty string (``), filterClause will not match
  - no special handling for the case question `value` is an `null`, filterClause will not match
  - `condition: greater_than` or `condtion: less_than` 
    - The filter compares strings semantically 
    - Alternatively we could choose to treat this as an invalid filter and return an error

## Notes on `totalResponses` and `pageCount`
The way I read the requirements is as follows:
- `totalResponses` represents "total number of submissions matching given parameters"
  - `filters` is a given parameter to `/filteredResponses` endpoint
  - therefore `/filteredResponses` endpoint should return a value for `totalResponses` that represents of `filters` having been appplied 

However, I see a complication:
  -  In the case that the `totalResponses` value returned from `/responses` endpiont is greater than number of responses in the body of the response,  `/filteredResponses` does not have all the data to be filtered
    - e.g. `/responses` returns a max of 150 responses (if I understand correctly)
    - say, `totalResponses` `/responses` is `500`. 
    - In this case `/filteredResponses` can only apply a filter to `150` records, not `500`, and so `totalResponses` value to be returned from `/filteredResponses` cannot be determined
      - This could be solved by making multiple requests to `/responses` to retrive all `500` responses and then filtering
        - I have not implemented this.

My approach
- In order for `/filteredResponses` to calculate `totalRespnse` it needs from `/responses`
 1. all results. to satisfy this requirement I assume no more than 150 results exist
 2. "unlimited" results. to satisfy this, `/filteredRespones` drops the `limit` parameter before relaying the request to `/respones`. It then applies limit to the reuslt that it returns.