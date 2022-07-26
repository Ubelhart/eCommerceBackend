import { IProductMongo } from '../interfaces/Product'
import CartsRepository from '../repositories/CartsRepository'
const cartsRepository = new CartsRepository()

class CartService {
    public async postCart(newProducts: IProductMongo, { username }) {
        const newCart = {
            username,
            products: newProducts
        }
        return await cartsRepository.postCart(newCart)
    }

    public async deleteCart({ id }, { username }) {
        const cart = await this.getCart(id, username)

        if (cart) {
            await cartsRepository.deleteCart(id, username)
            return cart
        }
    }

    public async getCart({ id }, { username }) {
        return await cartsRepository.getCart(id, username)
    }

    public async postProduct({ id }, newProduct, { username }) {
        const cart = await this.getCart(id, username)
        if (cart) {
            return await cartsRepository.postProduct(newProduct, id, username)
        }
    }

    public async deleteProduct({ id, id_prod }, { username }) {
        const cart = await this.getCart(id, username)
        if (cart) {
            return await cartsRepository.deleteProduct(id, id_prod, username)
        }
    }
}

export default CartService
