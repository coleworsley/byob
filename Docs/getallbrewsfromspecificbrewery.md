**Get Brews from a Specific Brewery**
----
  Returns json data about all brews from an individual brewery in the database.

* **URL**

  `/api/v1/brewery/:id/brews`

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    ```javascript
    [
      {
        "id": 1498,
        "original_id": 2688,
        "name": "Stronghold",
        "style": "American Porter",
        "abv": 0.06,
        "ibu": 25,
        "ounces": 16,
        "brewery_id": 1,
        "created_at": "2017-08-26T17:48:42.139Z",
        "updated_at": "2017-08-26T17:48:42.139Z"
      },
      {
        "id": 1495,
        "original_id": 2691,
        "name": "Maggie's Leap",
        "style": "Milk / Sweet Stout",
        "abv": 0.049,
        "ibu": 26,
        "ounces": 16,
        "brewery_id": 1,
        "created_at": "2017-08-26T17:48:42.138Z",
        "updated_at": "2017-08-26T17:48:42.138Z"
      },
      ...
    ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "...(description about error)..." }`


* **Sample Call:**

  ```javascript
      fetch('/api/v1/breweries/1', {
        'method': 'GET',
      })
      .then(res => res.json())
      .then(brews => console.log(brews))
      .catch(error => console.log(error));
  ```
