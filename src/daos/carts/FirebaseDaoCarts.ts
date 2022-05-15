import FirebaseContainer from '../../containers/FirebaseContainer'
import { IProductFire } from '../../interfaces/Product'
import { ICartFire } from '../../interfaces/Cart'

export default class FirebaseDaoCarts extends FirebaseContainer {
  constructor(config) {
    super(config)
    this.connect()
    this.db = this.admin.firestore()
    this.query = this.db.collection('carts')
  }

  public async postCart(newProducts: IProductFire[]) {
    const newCart = {
      timestamp: new Date().toString(),
      products: [] as any
    }

    if (newProducts && !newProducts.length) {
      newCart.products.push(newProducts)
    } else if (newProducts.length) {
      newCart.products = newProducts
    }

    const doc = this.query.doc()
    const id: string = doc._path.segments[1]
    await doc.create(newCart)
    const cart = await this.getCart(id)
    if (cart.products) {
      return cart
    }
  }

  public async deleteCart(cart: ICartFire) {
    const doc = this.query.doc(cart.id)
    if (cart.products) {
      await doc.delete()
    }
  }

  public async getCart(id: string) {
    const doc = await this.query.doc(id)
    const response = await doc.get()

    const cart = { id: doc.id, ...response.data() }
    if (cart.title) {
      return cart
    }
  }

  public async postProduct(cart: ICartFire, newProduct: IProductFire) {
    const arrayUnion = this.admin.firestore.FieldValue.arrayUnion
    const doc = this.query.doc(cart.id)
    if (cart.products) {
      await doc.update({ products: arrayUnion(newProduct) })
      return newProduct
    }
    return newProduct
  }

  public async deleteProduct(cart: ICartFire, id_prod: string) {
    const doc = this.query.doc(cart.id)
    let product
    if (cart.products) {
      product = cart.products.find((product) => product.id === id_prod)
    }
    if (product) {
      const arrayRemove = this.admin.firestore.FieldValue.arrayRemove
      await doc.update({
        products: arrayRemove(product)
      })
      return product
    }
    return product
  }
}
