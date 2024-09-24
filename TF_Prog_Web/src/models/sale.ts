import SaleItem from "./saleItem";

interface Sale{
    id: number,
    date_time: string,
    codeSale: string,
    id_user: number,
    saleItems: SaleItem[],
    valueTotal: number
}

export default Sale;