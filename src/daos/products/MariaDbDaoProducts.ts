import MariaDbAndSqliteContainer from '../../containers/MariaDbAndSqliteContainer'
import { IProductSql } from '../../interfaces/Product'

export default class MariaDbDaoProducts extends MariaDbAndSqliteContainer {
  constructor(config) {
    super(config)
  }

  private async createIfNotExists() {
    try {
      await this.knex.schema.createTable('products', (table) => {
        table.increments('id')
        table.string('title')
        table.string('description')
        table.string('thumbnail')
        table.float('price')
        table.integer('stock')
        table.timestamp('timestamp')
      })
    } catch (error: any) {
      console.log(error.sqlMessage)
    }
  }

  public async getProducts() {
    return await this.knex.from('products').select('*')
  }

  public async postProduct(newProduct: IProductSql) {
    await this.createIfNotExists()
    const response = await this.knex('products').insert(newProduct)
    return await this.getProduct(response[0].toString())
  }

  public async getProduct(id: string) {
    const product = await this.knex.from('products').select('*').where('id', id)
    return product[0]
  }

  public async putProduct(id: string, updatedProduct: IProductSql) {
    await this.knex('products').where('id', id).update(updatedProduct)
    return await this.getProduct(id)
  }

  public async deleteProduct({ id }: { id: number }) {
    await this.knex('products').where('id', id).del()
  }
}
