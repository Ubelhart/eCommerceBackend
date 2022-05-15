export const mongoDbKey =
  'mongodb+srv://juanpablo:020694@cluster0.qspzf.mongodb.net/ecommerce?retryWrites=true&w=majority'
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
