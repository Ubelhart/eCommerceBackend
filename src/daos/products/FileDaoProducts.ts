import FileContainer from '../../containers/FileContainer'
import { IProductFile } from '../../interfaces/Product'

export default class FileDaoProducts extends FileContainer {
    constructor(config: string) {
        super(config)
    }

    public async getProducts() {
        const products = await this.createIfNotExist()
        if (products) {
            return JSON.parse(products.toString())
        }
        return products
    }

    public async postProduct(newProduct: IProductFile) {
        const products: IProductFile[] = await this.getProducts()

        if (!products.length) {
            newProduct.id = 1
        } else {
            newProduct.id = products[products.length - 1].id + 1
        }
        newProduct.timestamp = new Date().toString()
        products.push(newProduct)
        await this.fs.writeFile(this.config, JSON.stringify(products))
        return newProduct
    }

    public async getProduct(id: string) {
        const parseId: number = parseInt(id)
        const products: IProductFile[] = await this.getProducts()

        return products.find((product) => product.id === parseId)
    }

    public async putProduct(id: string, updatedProduct: IProductFile) {
        const parseId: number = parseInt(id)
        const products: IProductFile[] = await this.getProducts()
        const filteredProducts = products.filter(
            (product) => product.id !== parseId
        )

        updatedProduct.id = parseId
        filteredProducts.push(updatedProduct)

        await this.fs.writeFile(this.config, JSON.stringify(filteredProducts))

        return updatedProduct
    }

    public async deleteProduct({ id }: { id: string }) {
        const parseId: number = parseInt(id)
        const products: IProductFile[] = await this.getProducts()

        const filteredProducts = products.filter(
            (product) => product.id !== parseId
        )

        this.fs.writeFile(this.config, JSON.stringify(filteredProducts))
    }
}
