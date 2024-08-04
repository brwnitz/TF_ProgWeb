class PackedLunchModel {
    constructor(marmitex) {
        this.id = marmitex.id,
        this.name = marmitex.name,
        this.description = marmitex.description,
        this.ingredients = marmitex.ingredients,
        this.price = marmitex.price,
        this.moreInfors = marmitex.moreInfors,
        this.stock = marmitex.stock,
        this.category  = marmitex.category
    }
  }
  
  module.exports = PackedLunchModel;