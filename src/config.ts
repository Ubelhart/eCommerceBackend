import 'dotenv/config'
export const mongoDbKey: string =
    process.env.MONGO || 'mongodb://localhost:27017/ecommerce'

export const mariadb = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce'
    }
}

export const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: './src/db/mydb.sqlite'
    },
    useNullAsDefault: true
}

export const serviceAccount = {
    type: process.env.FIREBASE_type,
    project_id: process.env.FIREBASE_project_id,
    private_key_id: process.env.FIREBASE_private_key_id,
    private_key: process.env.FIREBASE_private_key,
    client_email: process.env.FIREBASE_client_email,
    client_id: process.env.FIREBASE_client_id,
    auth_uri: process.env.FIREBASE_auth_uri,
    token_uri: process.env.FIREBASE_token_uri,
    auth_provider_x509_cert_url:
        process.env.FIREBASE_auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.FIREBASE_client_x509_cert_url
}
