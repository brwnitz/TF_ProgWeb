class SaleModel {
    constructor(sale) {
        this.id = sale.id ,
        this.date_time = sale.date_time,
        this.codeSale = sale.codeSale,
        this.id_user = sale.id_user 
    }
}
  
module.exports = SaleModel;