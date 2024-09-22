class SaleModel {
    constructor(sale) {
        this.id = sale.id ,
        this.date_time = sale.date_time,
        this.codeSale = sale.codeSale,
        this.id_user = sale.id_user,
        this.saleItems = sale.saleItems 
    }
}
  
module.exports = SaleModel;