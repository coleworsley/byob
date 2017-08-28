**Show Breweries**
----
  Returns json data about all the breweries.

* **URL**

  `/api/v1/breweries`

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
    { name: "Denver Beer Co.", city : "Denver", state: "CO" }
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
      fetch('/api/v1/breweries', {
        'method': 'GET',
      })
      .then(res => res.json())
      .then(token => console.log(token))
      .catch(error => console.log(error));
  ```
