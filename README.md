

Created a /users/:id get endpoint return used data as json from a database
Endpoint first validates the ID, secondly pulls data from database, then if the user both exists and is older than 21 json is returned, otherwise it falls to a 404 

The / endpoint is only provided for ease of testing