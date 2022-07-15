import { Request, Response } from 'express'
import { daoProducts } from '../daos'
import logger from '../utils/logger'

export default class ProductsController {
    constructor() {
        this.getProducts = this.getProducts.bind(this)
        this.postProduct = this.postProduct.bind(this)
        this.getProduct = this.getProduct.bind(this)
        this.putProduct = this.putProduct.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
    }

    public async getProducts(req: Request, res: Response) {
        if (req.params.id) {
            try {
                const product = await daoProducts.getProduct(req.params.id)

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
        } else {
            try {
                const products = await daoProducts.getProducts()

                if (products) {
                    return res.json(products)
                }
                return res.json({ error: 'no hay productos' })
            } catch (error: any) {
                logger.error(error.message)
                return res.status(500).json({ message: error.message })
            }
        }
    }

    public async getProduct(req: Request, res: Response) {
        try {
            const product = await daoProducts.getProduct(req.params.id)

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
            const newProduct = await daoProducts.postProduct(req.body)
            const postedProduct = await daoProducts.getProduct(newProduct.id)

            if (postedProduct) {
                return res.json(
                    `El producto con el id:${newProduct.id} ha sido creado`
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
            const product = await daoProducts.getProduct(req.params.id)

            if (product) {
                const updatedProduct = await daoProducts.putProduct(
                    req.params.id,
                    req.body
                )
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
            const product = await daoProducts.getProduct(req.params.id)

            if (product) {
                await daoProducts.deleteProduct(product)
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
