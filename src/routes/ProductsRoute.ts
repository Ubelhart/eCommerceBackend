import { Router, json, urlencoded } from 'express'
import ProductsController from '../controllers/ProductsController'
import isAdmin from '../utils/auth'
const router = Router()

export default class ProductsRoute {
    public router = router
    private productsController = new ProductsController()
    constructor() {
        router.use(json())
        router.use(urlencoded({ extended: true }))

        router.get('/:id?', this.productsController.getProducts)
        router.post('/', isAdmin, this.productsController.postProduct)
        router.put('/:id', isAdmin, this.productsController.putProduct)
        router.delete('/:id', isAdmin, this.productsController.deleteProduct)
    }
}
