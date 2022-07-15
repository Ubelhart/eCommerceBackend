import FirebaseContainer from '../../containers/FirebaseContainer'
import { IProductFire } from '../../interfaces/Product'

export default class FirebaseDaoProducts extends FirebaseContainer {
    constructor(config) {
        super(config)
        this.db = this.admin.firestore()
        this.query = this.db.collection('products')
    }

    public async getProducts() {
        const querySnapshot = await this.query.get()
        let docs = querySnapshot.docs
        return docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
        })
    }

    public async postProduct(newProduct: IProductFire) {
        newProduct.timestamp = new Date().toString()
        const doc = this.query.doc()
        const id = doc._path.segments[1]
        await doc.create(newProduct)
        const product = await this.getProduct(id)
        if (product.title) {
            return product
        }
    }

    public async getProduct(id: string) {
        const doc = this.query.doc(id)
        const response = await doc.get()
        const product = { id: doc.id, ...response.data() }
        if (product.title) {
            return product
        }
    }

    public async putProduct(id: string, updatedProduct: IProductFire) {
        const doc = this.query.doc(id)
        await doc.update(updatedProduct)
        const product = await this.getProduct(id)
        if (product.title) {
            return product
        }
    }

    public async deleteProduct(product: IProductFire) {
        const doc = this.query.doc(product.id)
        if (product.title) {
            await doc.delete()
            return true
        }
        return false
    }
}
