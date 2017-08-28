**Get All Brews(Beers)**
----
  Returns json data about all the brews in the database.

* **URL**

  `/api/v1/brews`

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    ```
    [
      {
        "id": 11,
        "original_id": 2099,
        "name": "Sophomoric Saison",
        "style": "Saison / Farmhouse Ale",
        "abv": 0.072,
        "ibu": null,
        "ounces": 12,
        "brewery_id": 178
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "...(description about error)..." }`


* **Sample Call:**

  ```javascript
      fetch('/api/v1/brews', {
        'method': 'GET',
      })
      .then(res => res.json())
      .then(token => console.log(token))
      .catch(error => console.log(error));
  ```
