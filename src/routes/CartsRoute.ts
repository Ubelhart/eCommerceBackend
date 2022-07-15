import { Router, json, urlencoded } from 'express'
import CartsController from '../controller/CartsController'
const router = Router()

export default class CartsRoute {
    public router = router
    private cartsController = new CartsController()
    constructor() {
        router.use(json())
        router.use(urlencoded({ extended: true }))

        router.post('/', this.cartsController.postCart)
        router.delete('/:id', this.cartsController.deleteCart)
        router.get('/:id/productos', this.cartsController.getCart)
        router.post('/:id/productos', this.cartsController.postProduct)
        router.delete(
            '/:id/productos/:id_prod',
            this.cartsController.deleteProduct
        )
    }
}
