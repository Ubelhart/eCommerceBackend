export interface IProductFile {
  title: string
  description: string
  thumbnail: string
  price: number
  stock: number
  id: number
  timestamp: string
}

export interface IProductSql extends IProductFile {
  cart_id: number
}

export interface IProductFire extends Omit<IProductFile, 'id'> {
  id: string
}

export interface IProductMongo extends Omit<IProductFile, 'id'> {
  _id: string
}
