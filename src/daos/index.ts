import 'dotenv/config'
import { mongoDbKey, mariadb, sqlite3, serviceAccount } from '../config'
let daoCarts
let daoProducts
switch (process.env.DB) {
  case 'mariaSql':
    import('./carts/Sqlite3DaoCarts').then(({ default: Sqlite3DaoCarts }) => {
      daoCarts = new Sqlite3DaoCarts(sqlite3)
    })
    import('./products/MariaDbDaoProducts').then(
      ({ default: MariaDbDaoProducts }) => {
        daoProducts = new MariaDbDaoProducts(mariadb)
      }
    )
    break

  case 'mongoDb':
    import('./carts/MongoDbDaoCarts').then(({ default: MongoDbDaoCarts }) => {
      daoCarts = new MongoDbDaoCarts(mongoDbKey)
    })
    import('./products/MongoDbDaoProducts').then(
      ({ default: MongoDbDaoProducts }) => {
        daoProducts = new MongoDbDaoProducts(mongoDbKey)
      }
    )
    break

  case 'firebase':
    import('./carts/FirebaseDaoCarts').then(({ default: FirebaseDaoCarts }) => {
      daoCarts = new FirebaseDaoCarts(serviceAccount)
    })
    import('./products/FirebaseDaoProducts').then(
      ({ default: FirebaseDaoProducts }) => {
        daoProducts = new FirebaseDaoProducts(serviceAccount)
      }
    )
    break

  default:
    import('./carts/FileDaoCarts').then(({ default: FileDaoCarts }) => {
      daoCarts = new FileDaoCarts('carts.json')
    })
    import('./products/FileDaoProducts').then(
      ({ default: FileDaoProducts }) => {
        daoProducts = new FileDaoProducts('products.json')
      }
    )
    break
}

export { daoCarts, daoProducts }
