import { Response } from 'express'
import { daoCarts } from '../daos/'
import {
  sendWhatsappMessageToAdmin,
  sendWhatsappMessageToCustomer
} from '../utils/twilio'

export default class CartsController {
  constructor() {
    this.postCart = this.postCart.bind(this)
    this.deleteCart = this.deleteCart.bind(this)
    this.getCart = this.getCart.bind(this)
    this.postProduct = this.postProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  public async postCart(req: any, res: Response) {
    if (req.user) {
      try {
        const newCart = await daoCarts.postCart(req.body, req.user)
        if (newCart) {
          await sendWhatsappMessageToAdmin(req.user.username)
          await sendWhatsappMessageToCustomer(req.user.phoneNumber)
          return res.json(`El carrito con el id:${newCart.id} ha sido agregado`)
        }
        return res.json({ error: 'no se pudo agregar el carrito' })
      } catch (error: any) {
        return res.status(500).json({ error: error.message })
      }
    }
    return res.json({ error: 'debes iniciar sesión para agregar al carrito' })
  }

  public async deleteCart(req: any, res: Response) {
    if (req.user) {
      try {
        const cart = await daoCarts.getCart(req.params.id, req.user)
        if (cart) {
          await daoCarts.deleteCart(cart, req.user)
          return res.json(`El carrito con el id:${cart.id} ha sido eliminado`)
        }
        return res.json({
          error: `el carrito con el id:${req.params.id} no existe`
        })
      } catch (error: any) {
        return res.status(500).json({ error: error.message })
      }
    }
    return res.json({ error: 'debes iniciar sesión para eliminar el carrito' })
  }

  public async getCart(req: any, res: Response) {
    if (req.user) {
      try {
        const cart = await daoCarts.getCart(req.params.id, req.user)
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
    return res.json({ error: 'debes iniciar sesión para ver el carrito' })
  }

  public async postProduct(req: any, res: Response) {
    if (req.user) {
      try {
        const cart = await daoCarts.getCart(req.params.id, req.user)
        if (cart) {
          const newProduct = await daoCarts.postProduct(
            cart,
            req.body,
            req.user
          )
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
    return res.json({ error: 'debes iniciar sesión para agregar un producto' })
  }

  public async deleteProduct(req: any, res: Response) {
    if (req.user) {
      try {
        const cart = await daoCarts.getCart(req.params.id, req.user)
        if (cart) {
          const deletedProduct = await daoCarts.deleteProduct(
            cart,
            req.params.id_prod,
            req.user
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
    return res.json({ error: 'debes iniciar sesión para eliminar un producto' })
  }
}
