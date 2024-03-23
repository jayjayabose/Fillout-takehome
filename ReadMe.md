# Project: Software Engineering Assignment
- [Requirements](https://fillout.notion.site/Software-engineering-assignment-fbd58fd78f59495c99866b91b1358221)
- v 1.0.3

# Installation:
## Download the project
- Clone the repo: `git clone https://github.com/jayjayabose/Fillout-takehome.git`
- Install and build: `npm install && npm run build`

## Create your .env file
- Create `.env` file in your project directory
- Save contents as shown below 
```
API_KEY=<your api key>
BASE_URL=https://api.fillout.com
RESOURCE_PATH=/v1/api/forms
```

## Start the server
- `npm serve` will start the server

# Implementation Notes
## Notes on filter
- `value` property of questions may be `null`. There is no special logic for this case. No condition will match.
- A filter clause with `type: string` may be an empty string
  - We may want to warn the user or validate out this case on the front end?
- A filter clause with `condition: greater_than` or `condition: less_than` 
    - In the case of a of a question with `value` of type `string` the filter compares strings lexicographically
    - This is very unintuitive and probably not what a user intends
    - Perhaps we handle this case on the frontend with validation and/or user messaging
    - Alternatively we could choose to treat this as an invalid filter and return an error

## Notes on `totalResponses` and `pageCount`
The way I read the requirements is as follows:
- `totalResponses` represents "total number of submissions matching given parameters"
  - `filters` is a "given parameter"
  - therefore `/filteredResponses` endpoint should return a `totalResponses` value represents `filters` having been applied 

- I see a complication:
  -  In the case that the `totalResponses` value returned from `/responses` endpoint is greater than number of responses in the body of the response,  `/filteredResponses` does not have all the responses to be filtered
    - e.g. `/responses` returns a max of 150 responses (if I understand correctly)
    - say, `totalResponses` `/responses` is `500`. 
    - In this case `/filteredResponses` can only apply a filter to `150` records, not `500`, and so `totalResponses` value to be returned from `/filteredResponses` cannot be determined
      - This could be solved by making multiple requests to `/responses` to retrieve all `500` responses and then filtering
        - I have not implemented this.
  - This case does not arise in the given data, but seems like a production consideration
  - My approach for this exercise
    - In order for `/filteredResponses` to calculate `totalResponse` it needs from `/responses`, two things:
      1. All responses for a form. To satisfy this requirement I assume no more than 150 results exist
      2. "unlimited" results. to satisfy this, `/filteredResponses` drops the `limit` parameter before relaying the request to `/response`. It then applies limit to the result that it returns.

# Future work
## Testing
- Add integration tests
  - I have unit tests for filter functions and performed manual end to end tests.      