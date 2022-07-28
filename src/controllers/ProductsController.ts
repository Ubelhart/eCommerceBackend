import 'dotenv/config'
import { Request, Response } from 'express'
import logger from '../utils/logger'
import ProductsService from '../services/ProductsService'
const productsService = new ProductsService()

export default class ProductsController {
    constructor() {
        this.getProduct = this.getProduct.bind(this)
        this.postProduct = this.postProduct.bind(this)
        this.putProduct = this.putProduct.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
    }

    public async getProduct(req: Request, res: Response) {
        try {
            const product = await productsService.getProduct(req.params.id)
            if (product) {
                return res.json(product)
            }
            return res.json({
                error: `el producto con el id:${req.params.id} no existe`
            })
        } catch (error: any) {
            logger.error(error.message)
            return res.status(500).json({ message: error.message })
        }
    }

    public async postProduct(req: Request, res: Response) {
        try {
            const postedProduct = await productsService.postProduct(req.body)

            if (postedProduct) {
                return res.json(
                    `El producto con el id:${postedProduct.id} ha sido creado`
                )
            }
            return res.json({ error: 'no se pudo crear el producto' })
        } catch (error: any) {
            logger.error(error.message)
            return res.status(500).json({ message: error.message })
        }
    }

    public async putProduct(req: Request, res: Response) {
        try {
            const updatedProduct = await productsService.putProduct(
                req.params.id,
                req.body
            )
            if (updatedProduct) {
                return res.json(
                    `El producto con el id:${updatedProduct.id} ha sido actualizado`
                )
            }
            return res.json({
                error: `el producto con el id:${req.params.id} no existe`
            })
        } catch (error: any) {
            logger.error(error.message)
            return res.status(500).json({ message: error.message })
        }
    }

    public async deleteProduct(req: Request, res: Response) {
        try {
            const product = await productsService.deleteProduct(req.params.id)
            if (product) {
                return res.json(
                    `El producto con el id:${product.id} ha sido eliminado`
                )
            }
            return res.json({
                error: `el producto con el id:${req.params.id} no existe`
            })
        } catch (error: any) {
            logger.error(error.message)
            return res.status(500).json({ message: error.message })
        }
    }
}
