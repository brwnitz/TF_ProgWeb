class SaleItemsModel {
    constructor(saleItems) {
      this.id = saleItems.id,
      this.id_sale = saleItems.id_sale,
      this.id_kit = saleItems.id_kit,
      this.id_packedLunch = saleItems.id_packedLunch,
      this.observations = saleItems.observations,
      this.qtd = saleItems.qtd
    }
  }
  
  module.exports = SaleItemsModel;