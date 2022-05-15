import MongoDbContainer from '../../containers/MongoDbContainer'
import { Cart } from '../../models/carts'
import { IProductMongo } from '../../interfaces/Product'

export default class MongoDbDaoCarts extends MongoDbContainer {
  constructor(config: string) {
    super(config)
    this.connect()
  }

  public async postCart(newProducts: IProductMongo[]) {
    const newCartModel = new Cart()
    await newCartModel.save((err, cart) => {
      if (err) {
        console.log(err)
      }
      cart.products = newProducts
      cart.save()
    })
    return newCartModel
  }

  public async deleteCart({ id }: { id: string }) {
    await Cart.findByIdAndRemove(id)
  }

  public async getCart(id: string) {
    return await Cart.findById(id)
  }

  public async postProduct({ id }: { id: string }, newProduct: IProductMongo) {
    let product
    await Cart.findByIdAndUpdate(
      id,
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

  public async deleteProduct({ id }: { id: string }, id_prod: string) {
    let deletedProduct
    await Cart.findByIdAndUpdate(id, {
      $pull: { products: { _id: id_prod } }
    }).then((cart) => {
      if (cart) {
        deletedProduct = cart.products.find(
          (product: IProductMongo) => product._id == id_prod
        )
      }
    })
    return deletedProduct
  }
}
