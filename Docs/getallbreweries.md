**Show Breweries**
----
  Returns json data about all the breweries.

* **URL**

  /api/v1/breweries

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ name: "Denver Beer Co.", city : "Denver", state: "CO" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Could not get any response" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
