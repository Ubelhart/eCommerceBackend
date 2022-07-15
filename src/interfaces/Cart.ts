import {
    IProductFile,
    IProductSql,
    IProductFire,
    IProductMongo
} from './Product'

export interface ICartFile {
    id: number
    timestamp: string
    products: IProductFile[]
}

export interface ICartSql extends Omit<ICartFile, 'products'> {
    products: IProductSql[]
}

export interface ICartFire {
    id: string
    timestamp: string
    products: IProductFire[]
}

export interface ICartMongo {
    username: string
    _id: string
    timestamp: string
    products: IProductMongo[]
}
