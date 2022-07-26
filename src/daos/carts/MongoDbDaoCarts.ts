import MongoDbContainer from '../../containers/MongoDbContainer'
import { Cart } from '../../models/carts'
import { IProductMongo } from '../../interfaces/Product'
export default class MongoDbDaoCarts extends MongoDbContainer {
    constructor(config: string) {
        super(config)
        this.connect()
    }

    public async postCart(newCart) {
        const newCartModel = new Cart()
        return await newCartModel.save(newCart)
    }

    public async deleteCart(id, username) {
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
        return await Cart.findOneAndUpdate(
            { _id: id, username },
            { $push: { products: newProduct } },
            { new: true }
        )
    }

    public async deleteProduct(
        { id }: { id: string },
        id_prod: string,
        { username }: { username: string }
    ) {
        return await Cart.findOneAndUpdate(
            { _id: id, username },
            {
                $pull: { products: { _id: id_prod } }
            }
        )
    }
}
