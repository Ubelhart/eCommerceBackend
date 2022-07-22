import { mongoDbKey, mariadb, sqlite3, serviceAccount } from '../config'
import FileDaoCarts from '../daos/carts/FileDaoCarts'
import FileDaoProducts from '../daos/products/FileDaoProducts'
import FirebaseDaoCarts from '../daos/carts/FirebaseDaoCarts'
import FirebaseDaoProducts from '../daos/products/FirebaseDaoProducts'
import MongoDbDaoCarts from '../daos/carts/MongoDbDaoCarts'
import MongoDbDaoProducts from '../daos/products/MongoDbDaoProducts'
import Sqlite3DaoCarts from '../daos/carts/Sqlite3DaoCarts'
import MariaDbDaoProducts from '../daos/products/MariaDbDaoProducts'
let dao
let instance

export class Factory {
    create(name: string | undefined, type: string) {
        switch (name) {
            case 'mongoDb':
                switch (type) {
                    case 'carts':
                        dao = new MongoDbDaoCarts(mongoDbKey)
                        break
                    case 'products':
                        dao = new MongoDbDaoProducts(mongoDbKey)
                }
                return dao
            case 'firebase':
                switch (type) {
                    case 'carts':
                        dao = new FirebaseDaoCarts(serviceAccount)
                        break
                    case 'products':
                        dao = new FirebaseDaoProducts(serviceAccount)
                }
                return dao
            case 'mariaSql':
                switch (type) {
                    case 'carts':
                        dao = new Sqlite3DaoCarts(sqlite3)
                        break
                    case 'products':
                        dao = new MariaDbDaoProducts(mariadb)
                }
                return dao
            default:
                switch (type) {
                    case 'carts':
                        dao = new FileDaoCarts('carts.json')
                        break
                    case 'products':
                        dao = new FileDaoProducts('products.json')
                }
                return dao
        }
    }

    static getInstance() {
        if (!instance) {
            instance = new Factory()
        }
        return instance
    }
}

export default Factory
