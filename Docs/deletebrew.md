**Delete a Brew**
----
  Removes a Brew from the database and returns the brew that was deleted.

* **URL**

  `/api/v1/brews/:id`

* **URL Params**

  **Required:**
  
  `/:id`

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

   **Required:**
 
   `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
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
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Resource does not exist" }`

  OR

  * **Code:** 403 UNAUTHORIZED <br />
    **Content:** `{ error : "Invalid token." }`
    
  OR

  * **Code:** 403 UNAUTHORIZED <br />
    **Content:** `{ error : "You must be authorized to use this endpoint." }`

* **Sample Call:**

  ```javascript
      fetch('/api/v1/brews/11', {
        'method': 'DELETE',
      })
      .then(res => res.json())
      .then(brew => console.log(brew))
      .catch(error => console.log(error));
  ```
