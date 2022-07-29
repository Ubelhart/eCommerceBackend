const axios = require('axios')
const chai = require('chai')
const assert = chai.assert

async function getProduct(id) {
    const response = await axios.get(
        `http://localhost:8080/api/productos/${id}`
    )
    console.log(response.data)
    return response.data
}

async function getProducts() {
    const response = await axios.get(`http://localhost:8080/api/productos`)
    console.log(response.data)

    return response.data
}

async function postProduct(id) {
    const response = await axios.post(`http://localhost:8080/api/productos`, {
        title: 'Globo Terráqueo',
        description: 'Globo terráqueo de plástico',
        thumbnail:
            'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
        price: 345.67,
        stock: 30
    })
    console.log(response.data)
}

async function putProduct(id) {
    try {
        const response = await axios.put(
            `http://localhost:8080/api/productos/${id}`,
            {
                title: 'Escuadr',
                description: 'Escuadra de madera',
                thumbnail:
                    'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
                price: 123.45,
                stock: 10
            }
        )
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

async function deleteProduct(id) {
    try {
        const response = await axios.delete(
            `http://localhost:8080/api/productos/${id}`
        )
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

describe('Testeando get en la ruta de productos', () => {
    it('Debería devolver un array de productos', async () => {
        const products = await getProducts()
        assert.isArray(products)
    })
})

describe('Testeando get en la ruta de productos:id?', () => {
    it('Debería devolver un producto', async () => {
        const product = await getProduct('62e20cc028ad071a02499401')
    })
})
