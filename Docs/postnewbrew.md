**Add a New Brew**
----
  Adds a Brew from the database and returns the brew that was added.

* **URL**

  `/api/v1/brews/`

* **URL Params**

  **Required:**
  
  `/:id`

* **Method:**

  `POST`
  
*  **Authorization**

   **Required:**
    Authorized JWT Token required.
   
   `{ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...." }`

* **Data Params**

   **Required:**
 
   `'brewery_id': int, 'name': string, 'style': string`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
```javascript
    {
      "id": 1000,
      "original_id": '',
      "name": "New Brew",
      "style": "APA",
      "abv": 0.072,
      "ibu": null,
      "ounces": 12,
      "brewery_id": 178,
      "created_at": "2017-08-26T17:48:41.486Z",
      "updated_at": "2017-08-26T17:48:41.486Z"
    }
```
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTITY <br />
    **Content:** `{ error: 'Missing required parameter ${requiredParam}' }`

  OR

  * **Code:** 403 UNAUTHORIZED <br />
    **Content:** `{ error : "Invalid token." }`
    
  OR

  * **Code:** 403 UNAUTHORIZED <br />
    **Content:** `{ error : "You must be authorized to use this endpoint." }`

* **Sample Call:**

  ```javascript
      fetch('/api/v1/brews/', {
        'Authorization': 'token',
        'method': 'DELETE',
        'Content-Type': 'application/json',
        'body': {
          brewery_id: 1000,
          name: 'New Brew',
          style: 'APA',
          ounces: 12,
        },
      })
      .then(res => res.json())
      .then(brew => console.log(brew))
      .catch(error => console.log(error));
  ```
