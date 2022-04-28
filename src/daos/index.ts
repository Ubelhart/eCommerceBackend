import FileDaoCarts from "./carts/FileDaoCarts";
import FileDaoProducts from "./products/FileDaoProducts";
import MongoDbDaoCarts from "./carts/MongoDbDaoCarts";
import MongoDbDaoProducts from "./products/MongoDbDaoProducts";
import FirebaseDaoCarts from "./carts/FirebaseDaoCarts";
import FirebaseDaoProducts from "./products/FirebaseDaoProducts";
import { mongoDbKey } from "../config";
import serviceAccount from "../db/backendecommerce-dec6c-firebase-adminsdk-hm6xm-aef48c2fd1.json";

//export const mongoDbDaoCarts = new MongoDbDaoCarts(mongoDbKey);
//export const mongoDbDaoProducts = new MongoDbDaoProducts(mongoDbKey);
export const firebaseDaoCarts = new FirebaseDaoCarts(serviceAccount);
export const firebaseDaoProducts = new FirebaseDaoProducts(serviceAccount);
