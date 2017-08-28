**Update Brewery**
----
  Updates brewery information.

* **URL**

  /api/v1/breweries/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  Optional to change: Name, city, state

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ name: "Your Mom's Place", city: "Chicago", state: "Illinois" }`
 
* **Error Response:**

  * **Code:** 500 Server error <br />
    **Content:** `{ error : "Internal server error" }`
