import FileContainer from '../../containers/FileContainer'
import { IProductFile } from '../../interfaces/Product'
import { ICartFile } from '../../interfaces/Cart'

export default class FileDaoCarts extends FileContainer {
  constructor(config: string) {
    super(config)
  }

  public async getCarts() {
    const products = await this.createIfNotExist()
    if (products) {
      return JSON.parse(products.toString())
    }
    return products
  }

  public async getCart(id: string) {
    const carts: ICartFile[] = await this.getCarts()
    const parseId: number = parseInt(id)

    return carts.find((cart) => cart.id === parseId)
  }

  public async postCart(newProducts: IProductFile[]) {
    const carts: ICartFile[] = await this.getCarts()
    const newCart: any = {
      timestamp: new Date().toString(),
      products: newProducts
    }

    if (!carts.length) {
      newCart.id = 1
    } else {
      newCart.id = carts[carts.length - 1].id + 1
    }
    carts.push(newCart)
    await this.fs.writeFile(this.config, JSON.stringify(carts))
    return newCart
  }

  public async deleteCart({ id }: { id: string }) {
    const carts: ICartFile[] = await this.getCarts()
    const parseId: number = parseInt(id)

    const filteredCarts = carts.filter((cart) => cart.id !== parseId)
    this.fs.writeFile(this.config, JSON.stringify(filteredCarts))
  }

  public async postProduct(cart: ICartFile, newProduct: IProductFile | any) {
    const carts: ICartFile[] = await this.getCarts()
    const foundCart = carts.find((elem) => elem.id === cart.id)
    if (foundCart) {
      foundCart.products.push(newProduct)
      await this.fs.writeFile(this.config, JSON.stringify(carts))
      newProduct = cart.products.find((product) => product.id === newProduct.id)
      return newProduct
    }
    return null
  }

  public async deleteProduct(cart: ICartFile, id_prod: string) {
    const carts: ICartFile[] = await this.getCarts()
    const parseId_prod: number = parseInt(id_prod)

    const foundCart = carts.find((elem) => elem.id === cart.id)

    if (foundCart) {
      foundCart.products.filter((product) => product.id !== parseId_prod)
      this.fs.writeFile(this.config, JSON.stringify(carts))
      return true
    }
    return false
  }
}
