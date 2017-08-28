**Get All Brews(Beers)**
----
  Returns json data about all the brews in the database.

* **URL**

  `/api/v1/brews`

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

   **Required:**
 
   `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
      "id": 11,
      "original_id": 2099,
      "name": "Sophomoric Saison",
      "style": "Saison / Farmhouse Ale",
      "abv": 0.072,
      "ibu": null,
      "ounces": 12,
      "brewery_id": 178,
      "created_at": "2017-08-26T17:48:41.486Z",
      "updated_at": "2017-08-26T17:48:41.486Z"
    }
  ]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "...(description about error)..." }`

  OR

  * **Code:** 403 UNAUTHORIZED <br />
    **Content:** `{ error : "Invalid token." }`
    
  OR

  * **Code:** 403 UNAUTHORIZED <br />
    **Content:** `{ error : "You must be authorized to use this endpoint." }`

* **Sample Call:**

  ```javascript
      fetch('/api/v1/brews', {
        'method': 'GET',
      })
      .then(res => res.json())
      .then(token => console.log(token))
      .catch(error => console.log(error));
  ```
