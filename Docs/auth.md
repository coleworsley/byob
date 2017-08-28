**JWT Auth **
----
  Returns a jwt (json web token)
* **URL**

  `/auth`

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  email and app name

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...." }`
    
 * **Error Response:**
 * **Code** 403 <br />
   **Content:** `{error: 'You must be authorized to use this endpoint}`
   
   OR
   * **Code** 403 <br />
   **Content:** `{error: 'Invalid token}`
   

* **Sample Call:**

  ```javascript
  fetch('/auth', {
    'Content-Type': 'application/json',
    'method': 'POST',
    'body': {
      email: 'example@something.io',
      appName: 'exampleApp',
    },
  })
  .then(res => res.json())
  .then(token => console.log(token))
  .catch(error => console.log(error));
  ```
