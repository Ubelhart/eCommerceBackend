import ProductsRepository from '../repositories/ProductsRepository'
const productsRepository = new ProductsRepository()

class ProductsService {
    public async getProduct(id) {
        if (id) {
            return await productsRepository.getProduct(id)
        }
        return await productsRepository.getProduct(null)
    }

    public async postProduct(newProduct) {
        return await productsRepository.postProduct(newProduct)
    }

    public async putProduct(id, updatedProduct) {
        return await productsRepository.putProduct(id, updatedProduct)
    }

    public async deleteProduct(id) {
        return await productsRepository.deleteProduct(id)
    }
}

export default ProductsService
