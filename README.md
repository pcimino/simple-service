# simple-service
Simple service using express

This demo loads a page pointing to a node server which has a few simple APIs.  

The premise is this is a service that translates error codes into human readable messages. Customer facing error messages shouldn't present too much information that a hacker can infer database, code logic or file structure, but should give enough information that a customer service rep knows how to correct the error or involve tech support.

## Database 
The database is a simple JSON loaded into memory, will be reset each time the server is restarted. No restrictions on code values.

In the form:  
`
[
    { "major":"1","value": [
        {"minor":"1","description":"This is major.minor 1.1"},
        {"minor":"2","description":"This is major.minor 1.2"}
    ]},
    { "major":"pizza", "value": [
        { "minor":"cold", "description":"The pizza is still cold"}, 
        { "minor":"frozen", "description":"Brrrrrr"},
        { "minor":"burnt", "description":"Too crisp, even a bit blackened"}
    ]}
]
`


## Default /  
 
This loads a static HTML to use the GET and POST APIs.

## GET  
### /code  
Returns all the codes and descriptions

### /code/:major
Retruns all the codes and descritpions for a given Major code  

### /code/:major/:minor  
Returns a specific code for a given Major.Minor combination

## PUT
### /code/:major/:minor
{ 'description' : 'text' }

Will insert a new code or overwrite an existing code.

### DELETE
### /code/:major/:minor 
Removes a code form the database