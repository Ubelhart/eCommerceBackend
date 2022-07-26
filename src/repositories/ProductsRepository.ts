import 'dotenv/config'
import Factory from '../factory'
const factory = Factory.getInstance()
const daoProducts = factory.create(process.env.DB, 'products')

class ProductsRepository {
    constructor() {}
    public async getProduct(id) {
        if (id) {
            return await daoProducts.getProduct(id)
        }
        return await daoProducts.getProducts()
    }

    public async postProduct(newProduct) {
        return await daoProducts.postProduct(newProduct)
    }

    public async putProduct(id, updatedProduct) {
        return await daoProducts.putProduct(id, updatedProduct)
    }

    public async deleteProduct(id) {
        return await daoProducts.deleteProduct(id)
    }
}

export default ProductsRepository
