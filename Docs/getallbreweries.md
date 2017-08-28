**Show Breweries**
----
  Returns json data about all the breweries.

* **URL**

  `/api/v1/breweries`

* **Method:**

  `GET`
  
* **Queries**
* **URL**
`/api/v1/breweries?state="KS"`

* **Success Response for Query:**

  * **Code:** 200 <br />
    **Content:** `[
    { name: "Red Shirt Brewery.", city : "Kansas City", state: "KS" }
  ]`
  
* **Success Response for all:**

  * **Code:** 200 <br />
    **Content:** `[
    { name: "Denver Beer Co.", city : "Denver", state: "CO" }
  ]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "...(description about error)..." }`


* **Sample Call:**

  ```javascript
      fetch('/api/v1/breweries', {
        'method': 'GET',
      })
      .then(res => res.json())
      .then(token => console.log(token))
      .catch(error => console.log(error));
  ```
