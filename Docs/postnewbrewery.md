**Post Brewery**
----
  Posts a new brewery.

* **URL**

  /api/v1/breweries

* **Method:**

  `POST`

* **Data Params**

  Name

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ name : "Black Sheep Brewer", city: "Kansas City", state: "KS" }`
 
* **Error Response:**

  * **Code:** 500 Server Error <br />
    **Content:** `{ error : "Internal server error" }`

  OR

  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Missing required parameter name." }`
