import { Request, Response } from 'express'
import { daoCarts } from '../daos/'

export default class CartsController {
  constructor() {
    this.postCart = this.postCart.bind(this)
    this.deleteCart = this.deleteCart.bind(this)
    this.getCart = this.getCart.bind(this)
    this.postProduct = this.postProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  public async postCart(req: Request, res: Response) {
    try {
      const newCart = await daoCarts.postCart(req.body)
      const postedCart = await daoCarts.getCart(newCart.id)
      if (postedCart) {
        return res.json(`El carrito con el id:${newCart.id} ha sido agregado`)
      }
      return res.json({ error: 'no se pudo agregar el carrito' })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async deleteCart(req: Request, res: Response) {
    try {
      const cart = await daoCarts.getCart(req.params.id)
      if (cart) {
        await daoCarts.deleteCart(cart)
        return res.json(`El carrito con el id:${cart.id} ha sido eliminado`)
      }
      return res.json({
        error: `el carrito con el id:${req.params.id} no existe`
      })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async getCart(req: Request, res: Response) {
    try {
      const cart = await daoCarts.getCart(req.params.id)
      if (cart) {
        return res.json(cart)
      }
      return res.json({
        error: `el carrito con el id:${req.params.id} no existe`
      })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async postProduct(req: Request, res: Response) {
    try {
      const cart = await daoCarts.getCart(req.params.id)
      if (cart) {
        const newProduct = await daoCarts.postProduct(cart, req.body)
        if (newProduct) {
          return res.json(
            `El producto con el id:${newProduct.id} ha sido agregado`
          )
        }
        return res.json({
          error: `el producto no pudo ser agregado al carrito con el id:${req.params.id}`
        })
      }
      return res.json({
        error: `el carrito con el id:${req.params.id} no existe`
      })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  public async deleteProduct(req: Request, res: Response) {
    try {
      const cart = await daoCarts.getCart(req.params.id)
      if (cart) {
        const deletedProduct = await daoCarts.deleteProduct(
          cart,
          req.params.id_prod
        )
        if (deletedProduct) {
          return res.json(
            `El producto con el id:${deletedProduct.id} ha sido eliminado`
          )
        }
        return res.json({
          error: `el producto con el id:${req.params.id_prod} no existe en el carrito con el id:${req.params.id}`
        })
      }
      return res.json({ error: `el carrito con el id:${req.params.id}` })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}
