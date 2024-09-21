interface Product {
    id ?: number,
    name: string,
    description: string,
    ingredients: string,
    price: number,
    moreInfors: string,
    stock: number,
    category: number,
    images: Array<any>
}

export default Product;