# BYOB

BYOB allows users to go to breweries and add their information as well as adding what beers they tried when they were there. 
They can update the information as well as delete it.


The API is [REST API](http://en.wikipedia.org/wiki/Representational_State_Transfer "RESTful")
Currently, return format for all endpoints is [JSON](http://json.org/ "JSON").
***

## Endpoints

#### Authentication

- **[<code>POST</code> /auth](https://github.com/buji405/byob/blob/master/Docs/auth.md)**

#### Brews Resources
- **[<code>GET</code> /brews](https://github.com/buji405/byob/blob/master/Docs/getBrews.md)**
- **[<code>POST</code> /brews](https://github.com/buji405/byob/blob/master/Docs/postBrews.md)**

- **[<code>GET</code> /brews/:id](https://github.com/buji405/byob/blob/master/Docs/specificBrew.md)**
- **[<code>DELETE</code> /brews/:id](https://github.com/buji405/byob/blob/master/Docs/deletebrew.md)**
- **[<code>PATCH</code> /brews/:id](https://github.com/buji405/byob/blob/master/Docs/updateBrew.md)**

#### Breweries Resources
- **[<code>GET</code> /breweries](https://github.com/buji405/byob/blob/master/Docs/getBreweries.md)**
- **[<code>POST</code> /breweries](https://github.com/buji405/byob/blob/master/Docs/postBreweries.md)**

- **[<code>DELETE</code> /breweries/:id](https://github.com/buji405/byob/blob/master/Docs/updateBrew.md)**
- **[<code>PATCH</code> /breweries/:id](https://github.com/buji405/byob/blob/master/Docs/updateBrew.md)**


## FAQ
### What do I need to know before I start using the API?
Got rust on your skills? No worries. Here are the docs you might need to get started:

- HTTPS protocol
- [REST software pattern][]
- Data serialization with [JSON][] (or see a [quick tutorial][])

### What return formats do you support?
[JSON](http://json.org/ "JSON") format.

### What kind of authentication is required?
Applications must identify themselves to access any Create, Update, or Delete method.
In order for you to access these methods, you must provide a valid JWT Token to identify if you are an administrator.


[REST software pattern]: http://en.wikipedia.org/wiki/Representational_State_Transfer
[JSON]: http://json.org
[quick tutorial]: http://www.webmonkey.com/2010/02/get_started_with_json/
