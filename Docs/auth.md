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

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...." }`

* **Sample Call:**

  ```javascript
  fetch('/auth', {
    'Content-Type': 'application/json',
    'method': 'POST',
    'body': {
      email: 'example@something.io',
      app: 'exampleApp',
    },
  })
  .then(res => res.json())
  .then(token => console.log(token))
  .catch(error => console.log(error));
  ```
