**Delete Brewery**
----
  Deletes a brewery from database.

* **URL**

  /api/v1/breweries/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Message:** `{"Successful delete" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Resource does not exist" }`

  OR

  * **Code:** 501 Not Implemented <br />
    **Content:** `{ error : "Internal server error." }`
