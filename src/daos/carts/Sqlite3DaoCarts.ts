import MariaDbAndSqliteContainer from '../../containers/MariaDbAndSqliteContainer'
import { ICartSql } from '../../interfaces/Cart'
import { IProductSql } from '../../interfaces/Product'

export default class Sqlite3DaoCarts extends MariaDbAndSqliteContainer {
  constructor(config) {
    super(config)
  }

  private async createIfNotExists() {
    try {
      await this.knex.schema.createTable('carts', (table) => {
        table.increments('id')
        table.string('title')
        table.timestamp('timestamp')
      })
    } catch (error: any) {
      console.log(error.sqlMessage)
    }
  }

  private async createIfNotExistsProducts() {
    try {
      await this.knex.schema.createTable('carts_products', (table) => {
        table.integer('id')
        table.integer('cart_id')
        table.string('title')
        table.string('description')
        table.string('thumbnail')
        table.float('price')
        table.integer('stock')
        table.string('timestamp')
      })
    } catch (error: any) {
      console.log(error.sqlMessage)
    }
  }

  public async postCart(newCart: IProductSql[]) {
    await this.createIfNotExists()
    await this.createIfNotExistsProducts()

    const response = await this.knex('carts').insert({
      title: 'Carrito'
    })
    newCart.forEach((product) => {
      product.cart_id = response[0]
    })
    await this.knex('carts_products').insert(newCart)
    return this.getCart(response[0].toString())
  }

  public async deleteCart({ id }: { id: string }) {
    await this.knex('carts_products').where('cart_id', id).del()
    await this.knex('carts').where('id', id).del()
  }

  public async getCart(id: string) {
    try {
      const response = await this.knex.from('carts').select('*').where('id', id)
      const cart: ICartSql = response[0]
      cart.products = await this.knex
        .from('carts_products')
        .select('*')
        .where('cart_id', id)
      return cart
    } catch (error: any) {
      console.log(error.sqlMessage)
      return false
    }
  }

  public async postProduct(cart: ICartSql, newProduct: IProductSql) {
    if (cart.products) {
      newProduct.cart_id = cart.id
    }
    await this.knex('carts_products').insert(newProduct)
    return newProduct
  }

  public async deleteProduct(cart: ICartSql, id_prod: string) {
    const deletedProduct = await this.knex
      .from('carts_products')
      .select('*')
      .where('id', id_prod)
      .andWhere('cart_id', cart.id)
    await this.knex('carts_products')
      .where('id', id_prod)
      .andWhere('cart_id', cart.id)
      .del()

    return deletedProduct[0]
  }
}
