import { Router, json, urlencoded } from 'express'
import ProductsController from '../controllers/ProductsController'
const router = Router()

export default class ProductsRoute {
    public router = router
    private productsController = new ProductsController()
    constructor() {
        router.use(json())
        router.use(urlencoded({ extended: true }))

        router.get('/:id?', this.productsController.getProduct)
        router.post('/', this.productsController.postProduct)
        router.put('/:id', this.productsController.putProduct)
        router.delete('/:id', this.productsController.deleteProduct)
    }
}
