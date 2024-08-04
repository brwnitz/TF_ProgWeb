class CategoryModel {
    constructor(category) {
        this.id = category.id,
        this.name = category.name,
        this.description = category.description,
        this.icon = category.icon
    }
}
  
module.exports = CategoryModel;