import MongoDbContainer from '../../containers/MongoDbContainer'
import { Cart } from '../../models/carts'
import { IProductMongo } from '../../interfaces/Product'
import logger from '../../utils/logger'
export default class MongoDbDaoCarts extends MongoDbContainer {
    constructor(config: string) {
        super(config)
        this.connect()
    }

    public async postCart(
        newProducts: IProductMongo[],
        { username }: { username: string }
    ) {
        const newCartModel = new Cart()
        await newCartModel.save((err, cart) => {
            if (err) {
                logger.error(err)
            }
            cart.username = username
            cart.products = newProducts
            cart.save()
        })
        return newCartModel
    }

    public async deleteCart(
        { id }: { id: string },
        { username }: { username: string }
    ) {
        await Cart.findOneAndDelete({ _id: id, username })
    }

    public async getCart(id: string, { username }: { username: string }) {
        return await Cart.findOne({ _id: id, username })
    }

    public async postProduct(
        { id }: { id: string },
        newProduct: IProductMongo,
        { username }: { username: string }
    ) {
        let product
        await Cart.findOneAndUpdate(
            { _id: id, username },
            { $push: { products: newProduct } },
            { new: true }
        ).then((cart) => {
            if (cart) {
                product = cart.products.find(
                    (product: IProductMongo) => product._id == newProduct._id
                )
            }
        })
        return product
    }

    public async deleteProduct(
        { id }: { id: string },
        id_prod: string,
        { username }: { username: string }
    ) {
        let deletedProduct
        await Cart.findOneAndUpdate(
            { _id: id, username },
            {
                $pull: { products: { _id: id_prod } }
            }
        ).then((cart) => {
            if (cart) {
                deletedProduct = cart.products.find(
                    (product: IProductMongo) => product._id == id_prod
                )
            }
        })
        return deletedProduct
    }
}
