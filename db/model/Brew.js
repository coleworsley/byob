class Brew {
  construtor(brew) {
    this.id = brew.id;
    this.abv = parseFloat(brew.abv) || null;
    this.ibu = parseFloat(brew.ibu) || null;
    this.name = brew.name;
    this.style = brew.style;
    this.brewery_id = brew.brewery_id;
    this.ounces = brew.ounces;
  }
}

module.exports = Brew;
