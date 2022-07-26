import 'dotenv/config'
import Factory from '../factory'
import { IProductMongo } from '../interfaces/Product'
const factory = Factory.getInstance()
const daoCarts = factory.create(process.env.DB, 'carts')

class CartsRepository {
    public async postCart(newCart) {
        return await daoCarts.postCart(newCart)
    }

    public async deleteCart(id, username) {
        return await daoCarts.deleteCart(id, username)
    }

    public async getCart(id, username) {
        return await daoCarts.getCart(id, username)
    }

    public async postProduct(id, newProduct, username) {
        const cart = await daoCarts.postProduct(id, newProduct, username)
        return cart.products.find(
            (product: IProductMongo) => product._id == newProduct._id
        )
    }

    public async deleteProduct(id, id_prod, username) {
        const cart = await daoCarts.deleteProduct(id, id_prod, username)
        return cart.products.find(
            (product: IProductMongo) => product._id == id_prod
        )
    }
}

export default CartsRepository
