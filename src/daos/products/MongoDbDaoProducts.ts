import MongoDbContainer from '../../containers/MongoDbContainer'
import { Product } from '../../models/products'
import { IProductMongo } from '../../interfaces/Product'

export default class MongoDbDaoProducts extends MongoDbContainer {
    constructor(config: string) {
        super(config)
    }

    public async getProduct(id: string) {
        return await Product.findById(id)
    }

    public async getProducts() {
        return await Product.find({})
    }

    public async postProduct(newProduct: IProductMongo) {
        const newProductModel = new Product(newProduct)
        return await newProductModel.save()
    }

    public async putProduct(id: string, updatedProduct: IProductMongo) {
        return await Product.findByIdAndUpdate(id, updatedProduct)
    }

    public async deleteProduct({ id }: { id: string }) {
        return await Product.findByIdAndRemove(id)
    }
}
