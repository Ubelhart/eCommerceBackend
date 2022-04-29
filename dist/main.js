(()=>{"use strict";var t={505:function(t,e,o){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(o(752)),n=process.env.PORT||8080;i.default.listen(n,(()=>{console.log(`Servidor corriendo en http://localhost:${n}`)}))},752:function(t,e,o){var r=this&&this.__createBinding||(Object.create?function(t,e,o,r){void 0===r&&(r=o);var i=Object.getOwnPropertyDescriptor(e,o);i&&!("get"in i?!e.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return e[o]}}),Object.defineProperty(t,r,i)}:function(t,e,o,r){void 0===r&&(r=o),t[r]=e[o]}),i=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),n=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o in t)"default"!==o&&Object.prototype.hasOwnProperty.call(t,o)&&r(e,t,o);return i(e,t),e},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const d=s(o(860));o(81);const c=o(913),a=s(o(351)),u=(0,d.default)();switch(process.env.DB){case"mariaSql":Promise.resolve().then((()=>n(o(971)))).then((({Sqlite3DaoCarts:t,MariaDbDaoProducts:e})=>{u.use("/api/carrito",new t(c.sqlite3).router),u.use("/api/productos",new e(c.mariadb).router)}));break;case"mongoDb":Promise.resolve().then((()=>n(o(971)))).then((({MongoDbDaoCarts:t,MongoDbDaoProducts:e})=>{u.use("/api/carrito",new t(c.mongoDbKey).router),u.use("/api/productos",new e(c.mongoDbKey).router)}));break;case"firebase":Promise.resolve().then((()=>n(o(971)))).then((({FirebaseDaoCarts:t,FirebaseDaoProducts:e})=>{u.use("/api/carrito",new t(a.default).router),u.use("/api/productos",new e(a.default).router)}));break;default:Promise.resolve().then((()=>n(o(971)))).then((({FileDaoCarts:t,FileDaoProducts:e})=>{u.use("/api/carrito",new t("carts.txt").router),u.use("/api/productos",new e("products.txt").router)}))}e.default=u},802:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e,o){"true"===t.headers.admin?o():e.status(401).json({error:"No autorizado"})}},913:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.sqlite3=e.mariadb=e.mongoDbKey=void 0,e.mongoDbKey="mongodb+srv://juanpablo:020694@cluster0.qspzf.mongodb.net/ecommerce?retryWrites=true&w=majority",e.mariadb={client:"mysql",connection:{host:"127.0.0.1",user:"root",password:"",database:"ecommerce"}},e.sqlite3={client:"sqlite3",connection:{filename:"./src/db/mydb.sqlite"},useNullAsDefault:!0}},89:function(t,e,o){var r=this&&this.__awaiter||function(t,e,o,r){return new(o||(o=Promise))((function(i,n){function s(t){try{c(r.next(t))}catch(t){n(t)}}function d(t){try{c(r.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(s,d)}c((r=r.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const i=o(147);e.default=class{constructor(t){this.config=t,this.fs=i.promises,this.products=[]}createIfNotExist(){return r(this,void 0,void 0,(function*(){let t;try{t=yield i.promises.readFile(this.config)}catch(t){if("ENOENT"===t.code)return yield i.promises.writeFile(this.config,"[]").then((()=>{console.log(`No existe ${this.config}. Archivo creado.`)})),yield i.promises.readFile(this.config);console.log("Hubo un error",t)}return t}))}}},627:function(t,e,o){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(o(509));e.default=class{constructor(t){this.config=t,this.admin=i.default}connect(){i.default.initializeApp({credential:i.default.credential.cert(this.config)}),console.log("Firebase connected")}}},231:function(t,e,o){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(o(514));e.default=class{constructor(t){this.config=t,this.knex=(0,i.default)(t)}}},135:function(t,e,o){var r=this&&this.__awaiter||function(t,e,o,r){return new(o||(o=Promise))((function(i,n){function s(t){try{c(r.next(t))}catch(t){n(t)}}function d(t){try{c(r.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(s,d)}c((r=r.apply(t,e||[])).next())}))},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(o(185));e.default=class{constructor(t){this.config=t}connect(){return r(this,void 0,void 0,(function*(){try{yield n.default.connect(this.config),console.log("MongoDB connected")}catch(t){console.log("MongoDB connection error",t)}}))}}},808:function(t,e,o){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=o(860),n=r(o(89)),s=(0,i.Router)();class d extends n.default{constructor(t){super(t),s.use((0,i.json)()),s.use((0,i.urlencoded)({extended:!0})),this.postCart(),this.deleteCart(),this.getCart(),this.deleteProduct(),this.router=s}postCart(){s.route("/").post(((t,e)=>{const o={timestamp:(new Date).toString(),products:t.body};this.createIfNotExist().then((t=>{if(this.products=JSON.parse(t.toString()),!this.products.length)return o.id=1;o.id=this.products.at(-1).id+1})).finally((()=>{this.products.push(o),this.fs.writeFile("./carts.txt",JSON.stringify(this.products)),e.json(`El carrito con el id:${o.id} ha sido agregado`)}))}))}deleteCart(){s.route("/:id").delete(((t,e)=>{const o=parseInt(t.params.id);let r;this.createIfNotExist().then((t=>{this.products=JSON.parse(t.toString()),r=this.products.find((t=>t.id===o))})).finally((()=>{if(r)return this.products=this.products.filter((t=>t.id!==o)),this.fs.writeFile("./carts.txt",JSON.stringify(this.products)),e.json(`El carrito con el id:${t.params.id} ha sido eliminado`);e.json({error:"carrito no encontrado"})}))}))}getCart(){s.route("/:id/productos").get(((t,e)=>{const o=parseInt(t.params.id);this.createIfNotExist().then((t=>{this.products=JSON.parse(t.toString())})).finally((()=>{const t=this.products.find((t=>t.id===o));if(t)return e.json(t);e.json({error:"carrito no encontrado"})}))})).post(((t,e)=>{const o=parseInt(t.params.id);let r;this.createIfNotExist().then((t=>{this.products=JSON.parse(t.toString()),r=this.products.find((t=>t.id===o))})).finally((()=>{if(r)return r.products.push(t.body),this.fs.writeFile("./carts.txt",JSON.stringify(this.products)),e.json(r);e.json({error:"carrito no encontrado"})}))}))}deleteProduct(){s.route("/:id/productos/:id_prod").delete(((t,e)=>{const o=parseInt(t.params.id),r=parseInt(t.params.id_prod);let i;this.createIfNotExist().then((t=>{this.products=JSON.parse(t.toString()),i=this.products.find((t=>t.id===o&&t.products))})).finally((()=>{if(i)return i.products.find((t=>t.id===r))?(i.products=i.products.filter((t=>t.id!==r)),this.fs.writeFile("./carts.txt",JSON.stringify(this.products)),e.json(`El producto con el id:${r} ha sido eliminado`)):e.json({error:"producto no encontrado"});e.json({error:"carrito no encontrado"})}))}))}}e.default=d},792:function(t,e,o){var r=this&&this.__awaiter||function(t,e,o,r){return new(o||(o=Promise))((function(i,n){function s(t){try{c(r.next(t))}catch(t){n(t)}}function d(t){try{c(r.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(s,d)}c((r=r.apply(t,e||[])).next())}))},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=o(860),s=i(o(627)),d=(0,n.Router)();class c extends s.default{constructor(t){super(t),d.use((0,n.json)()),d.use((0,n.urlencoded)({extended:!0})),this.connect(),this.db=this.admin.firestore(),this.query=this.db.collection("carts"),this.postCart(),this.deleteCart(),this.getCart(),this.deleteProduct(),this.router=d}postCart(){d.route("/").post(((t,e)=>r(this,void 0,void 0,(function*(){try{const o={timestamp:(new Date).toString(),products:[]};t.body&&!t.body.length?o.products.push(t.body):t.body.length&&(o.products=t.body);const r=this.query.doc(),i=r._path.segments[1];yield r.create(o),e.json(`El carrito con el id:${i} ha sido insertado`)}catch(t){console.log(t),e.json({error:"no se pudo insertar carrito"})}}))))}deleteCart(){d.route("/:id").delete(((t,e)=>r(this,void 0,void 0,(function*(){try{const o=this.query.doc(t.params.id),r=yield o.get(),i=Object.assign({id:o.id},r.data());try{if(i.products)return yield o.delete(),e.json(`El carrito con el id:${t.params.id} ha sido eliminado`);e.json({error:"carrito no encontrado"})}catch(t){console.log("Error al eliminar el carrito",t)}}catch(t){console.log("Error al obtener los datos del carrito",t)}}))))}getCart(){d.route("/:id/productos").get(((t,e)=>r(this,void 0,void 0,(function*(){try{const o=yield this.query.doc(t.params.id),r=yield o.get(),i=Object.assign({id:o.id},r.data());if(!i.products)return e.json({error:"carrito no encontrado"});if(i.products.length)return e.json(i);e.json("El carrito esta vació")}catch(t){console.log("Error al obtener los datos del carrito",t)}})))).post(((t,e)=>r(this,void 0,void 0,(function*(){try{const o=this.admin.firestore.FieldValue.arrayUnion,r=this.query.doc(t.params.id),i=yield r.get(),n=Object.assign({id:r.id},i.data());try{if(n.products)return yield r.update({products:o(t.body)}),e.json("Producto insertado con éxito");e.json({error:"carrito no encontrado"})}catch(t){console.log("Error insertar el producto",t)}}catch(t){console.log("Error al obtener los datos del carrito",t)}}))))}deleteProduct(){d.route("/:id/productos/:id_prod").delete(((t,e)=>r(this,void 0,void 0,(function*(){try{const o=this.query.doc(t.params.id),r=yield o.get(),i=Object.assign({id:o.id},r.data());let n;i.products&&(n=i.products.find((e=>e.id===t.params.id_prod)));try{if(n){const r=this.admin.firestore.FieldValue.arrayRemove;return yield o.update({products:r(n)}),e.json(`El producto con el id:${t.params.id_prod} ha sido eliminado del carrito con el id:${t.params.id}`)}if(i.products)return e.json(`El producto con el id:${t.params.id_prod} no existe en el carrito con el id:${t.params.id}`);e.json({error:"carrito no encontrado"})}catch(t){console.log("Error al eliminar el producto",t)}}catch(t){console.log("Error al obtener los datos del carrito",t)}}))))}}e.default=c},303:function(t,e,o){var r=this&&this.__awaiter||function(t,e,o,r){return new(o||(o=Promise))((function(i,n){function s(t){try{c(r.next(t))}catch(t){n(t)}}function d(t){try{c(r.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(s,d)}c((r=r.apply(t,e||[])).next())}))},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=o(860),s=i(o(135)),d=o(794),c=(0,n.Router)();class a extends s.default{constructor(t){super(t),c.use((0,n.json)()),c.use((0,n.urlencoded)({extended:!0})),this.connect(),this.postCart(),this.deleteCart(),this.getCart(),this.deleteProduct(),this.router=c}postCart(){c.route("/").post(((t,e)=>r(this,void 0,void 0,(function*(){const o=new d.Cart;yield o.save(((o,r)=>{if(o)console.log("Error al crear el carrito",o);else if(0===Object.keys(t.body).length)return e.json({error:"no puedes crear un carrito vació"});r.products=t.body,r.save(),e.json(`El carrito con el id:${r._id} ha sido creado`)}))}))))}deleteCart(){c.route("/:id").delete(((t,e)=>{d.Cart.findByIdAndRemove(t.params.id,((o,r)=>{if(r)return e.json(`El carrito con el id:${t.params.id} ha sido eliminado`);o&&console.log("Error al eliminar el carrito",o),e.json({error:"carrito no encontrado"})}))}))}getCart(){c.route("/:id/productos").get(((t,e)=>{d.Cart.findById(t.params.id,((t,o)=>{if(t)return console.log(t),e.json({error:"carrito no encontrado"});e.json(o.products)}))})).post(((t,e)=>{d.Cart.findById(t.params.id,((o,r)=>{if(o)return console.log(o),e.json({error:"carrito no encontrado"});r.products.push(t.body),r.save(),e.json(r.products)}))}))}deleteProduct(){c.route("/:id/productos/:id_prod").delete(((t,e)=>{d.Cart.findByIdAndUpdate(t.params.id,{$pull:{products:{_id:t.params.id_prod}}},((o,r)=>o?(console.log(o),e.json({error:"carrito no encontrado"})):r.products.find((e=>e._id==t.params.id_prod))?e.json(`El producto con el id:${t.params.id_prod} ha sido eliminado del carrito con el id:${t.params.id}`):void e.json(`El producto con el id:${t.params.id_prod} no existe en el carrito con el id:${t.params.id}`)))}))}}e.default=a},526:function(t,e,o){var r=this&&this.__awaiter||function(t,e,o,r){return new(o||(o=Promise))((function(i,n){function s(t){try{c(r.next(t))}catch(t){n(t)}}function d(t){try{c(r.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(s,d)}c((r=r.apply(t,e||[])).next())}))},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=o(860),s=i(o(231)),d=(0,n.Router)();class c extends s.default{constructor(t){super(t),d.use((0,n.json)()),d.use((0,n.urlencoded)({extended:!0})),this.postCart(),this.deleteCart(),this.getCart(),this.deleteProduct(),this.router=d}createIfNotExists(){return r(this,void 0,void 0,(function*(){try{yield this.knex.schema.createTable("carts",(t=>{t.increments("id"),t.string("title"),t.timestamp("timestamp")}))}catch(t){console.log(t.sqlMessage)}}))}createIfNotExistsProducts(){return r(this,void 0,void 0,(function*(){try{yield this.knex.schema.createTable("carts_products",(t=>{t.integer("id"),t.integer("cart_id"),t.string("title"),t.string("description"),t.string("thumbnail"),t.float("price"),t.integer("stock"),t.string("timestamp")}))}catch(t){console.log(t.sqlMessage)}}))}postCart(){d.route("/").post(((t,e)=>r(this,void 0,void 0,(function*(){yield this.createIfNotExists(),yield this.createIfNotExistsProducts();try{const o=yield this.knex("carts").insert({title:"Carrito"});try{t.body.forEach((t=>{t.cart_id=o[0]})),yield this.knex("carts_products").insert(t.body),e.json(`Se agrego el carrito con id ${o}`)}catch(t){console.log(t)}}catch(t){console.log(t)}}))))}deleteCart(){d.route("/:id").delete(((t,e)=>r(this,void 0,void 0,(function*(){try{yield this.knex("carts_products").where("cart_id",t.params.id).del()}catch(t){console.log(t)}try{yield this.knex("carts").where("id",t.params.id).del(),e.json("carrito eliminado")}catch(t){console.log(t)}}))))}getCart(){d.route("/:id/productos").get(((t,e)=>r(this,void 0,void 0,(function*(){try{const o=yield this.knex.from("carts_products").select("*").where("cart_id",t.params.id);e.json(o)}catch(t){console.log(t)}})))).post(((t,e)=>r(this,void 0,void 0,(function*(){let o;try{o=yield this.knex.from("carts").select("*").where("id",t.params.id)}catch(t){console.log(t)}try{if(o.length){const o=Object.assign({cart_id:{type:Number}},t.body);return o.cart_id=t.params.id,yield this.knex("carts_products").insert(o),e.json("Producto insertado correctamente")}e.json({error:"carrito no existe"})}catch(t){console.log(t)}}))))}deleteProduct(){d.route("/:id/productos/:id_prod").delete(((t,e)=>r(this,void 0,void 0,(function*(){try{yield this.knex("carts_products").where("id",t.params.id_prod).andWhere("cart_id",t.params.id).del(),e.json("producto eliminado")}catch(t){console.log(t)}}))))}}e.default=c},971:function(t,e,o){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.MariaDbDaoProducts=e.Sqlite3DaoCarts=e.FirebaseDaoProducts=e.FirebaseDaoCarts=e.MongoDbDaoProducts=e.MongoDbDaoCarts=e.FileDaoProducts=e.FileDaoCarts=void 0;const i=r(o(808));e.FileDaoCarts=i.default;const n=r(o(722));e.FileDaoProducts=n.default;const s=r(o(303));e.MongoDbDaoCarts=s.default;const d=r(o(179));e.MongoDbDaoProducts=d.default;const c=r(o(792));e.FirebaseDaoCarts=c.default;const a=r(o(593));e.FirebaseDaoProducts=a.default;const u=r(o(526));e.Sqlite3DaoCarts=u.default;const l=r(o(470));e.MariaDbDaoProducts=l.default},722:function(t,e,o){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=o(860),n=r(o(89)),s=r(o(802)),d=(0,i.Router)();class c extends n.default{constructor(t){super(t),d.use((0,i.json)()),d.use((0,i.urlencoded)({extended:!0})),this.getProducts(),this.getProduct(),this.router=d}getProducts(){d.route("/").get(((t,e)=>{this.createIfNotExist().then((t=>{this.products=JSON.parse(t.toString())})).finally((()=>{e.json(this.products)}))})).post(s.default,((t,e)=>{const o=t.body;this.createIfNotExist().then((t=>{if(this.products=JSON.parse(t.toString()),!this.products.length)return o.id=1;o.id=this.products.at(-1).id+1})).finally((()=>{o.timestamp=(new Date).toString(),this.products.push(o),this.fs.writeFile(this.config,JSON.stringify(this.products)),e.json(this.products)}))}))}getProduct(){d.route("/:id").get(((t,e)=>{const o=parseInt(t.params.id);let r;t.query.admin,this.createIfNotExist().then((t=>{this.products=JSON.parse(t.toString()),r=this.products.find((t=>t.id===o))})).finally((()=>{if(r)return e.json(r);e.json({error:"producto no encontrado"})}))})).put(s.default,((t,e)=>{const o=parseInt(t.params.id);let r;this.createIfNotExist().then((t=>{this.products=JSON.parse(t.toString()),r=this.products.find((t=>t.id===o))})).finally((()=>{if(r)return this.products=this.products.filter((t=>t.id!==o)),t.body.id=o,this.products.push(t.body),this.fs.writeFile(this.config,JSON.stringify(this.products)),e.json(`El producto con el id:${t.params.id} ha sido actualizado`);e.json({error:"producto no encontrado"})}))})).delete(s.default,((t,e)=>{const o=parseInt(t.params.id);let r;this.createIfNotExist().then((t=>{this.products=JSON.parse(t.toString()),r=this.products.find((t=>t.id===o))})).finally((()=>{if(r)return this.products=this.products.filter((t=>t.id!==o)),this.fs.writeFile(this.config,JSON.stringify(this.products)),e.json(`El producto con el id:${t.params.id} ha sido eliminado`);e.json({error:"producto no encontrado"})}))}))}}e.default=c},593:function(t,e,o){var r=this&&this.__awaiter||function(t,e,o,r){return new(o||(o=Promise))((function(i,n){function s(t){try{c(r.next(t))}catch(t){n(t)}}function d(t){try{c(r.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(s,d)}c((r=r.apply(t,e||[])).next())}))},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=o(860),s=i(o(627)),d=i(o(802)),c=(0,n.Router)();class a extends s.default{constructor(t){super(t),c.use((0,n.json)()),c.use((0,n.urlencoded)({extended:!0})),this.db=this.admin.firestore(),this.query=this.db.collection("products"),this.getProducts(),this.getProduct(),this.router=c}getProducts(){c.route("/").get(((t,e)=>r(this,void 0,void 0,(function*(){try{const t=(yield this.query.get()).docs.map((t=>Object.assign({id:t.id},t.data())));if(t.length)return e.json(t);e.json({error:"no se encontraron productos"})}catch(t){console.log("Error al obtener productos",t)}})))).post(d.default,((t,e)=>r(this,void 0,void 0,(function*(){try{t.body.timestamp=(new Date).toString();const o=this.query.doc(),r=o._path.segments[1];yield o.create(t.body),e.json(`El producto con el id:${r} ha sido insertado`)}catch(t){console.log(t),e.json({error:"no se pudo insertar producto"})}}))))}getProduct(){c.route("/:id").get(((t,e)=>r(this,void 0,void 0,(function*(){try{const o=this.query.doc(t.params.id),r=yield o.get(),i=Object.assign({id:o.id},r.data());if(i.title)return e.json(i);e.json({error:"producto no encontrado"})}catch(t){console.log("Error al obtener producto",t)}})))).put(d.default,((t,e)=>r(this,void 0,void 0,(function*(){try{const o=this.query.doc(t.params.id);return yield o.update(t.body),e.json(`El producto con el id:${t.params.id} ha sido actualizado`)}catch(t){console.log(t),e.json({error:"producto no encontrado"})}})))).delete(d.default,((t,e)=>r(this,void 0,void 0,(function*(){try{const o=this.query.doc(t.params.id),r=yield o.get(),i=Object.assign({id:o.id},r.data());try{i.title&&(yield o.delete(),e.json(`El producto con el id:${t.params.id} ha sido eliminado`)),e.json({error:"producto no encontrado"})}catch(t){console.log("Error al eliminar producto",t)}}catch(t){console.log("Error al obtener producto",t)}}))))}}e.default=a},470:function(t,e,o){var r=this&&this.__awaiter||function(t,e,o,r){return new(o||(o=Promise))((function(i,n){function s(t){try{c(r.next(t))}catch(t){n(t)}}function d(t){try{c(r.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(s,d)}c((r=r.apply(t,e||[])).next())}))},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=o(860),s=i(o(231)),d=i(o(802)),c=(0,n.Router)();class a extends s.default{constructor(t){super(t),c.use((0,n.json)()),c.use((0,n.urlencoded)({extended:!0})),this.getProducts(),this.getProduct(),this.router=c}createIfNotExists(){return r(this,void 0,void 0,(function*(){try{yield this.knex.schema.createTable("products",(t=>{t.increments("id"),t.string("title"),t.string("description"),t.string("thumbnail"),t.float("price"),t.integer("stock"),t.timestamp("timestamp")}))}catch(t){console.log(t.sqlMessage)}}))}getProducts(){c.route("/").get(((t,e)=>r(this,void 0,void 0,(function*(){try{const t=yield this.knex.from("products").select("*");e.json(t)}catch(t){e.json({error:"productos no encontrados"}),console.log(t)}})))).post(d.default,((t,e)=>r(this,void 0,void 0,(function*(){yield this.createIfNotExists();try{const o=yield this.knex("products").insert(t.body);e.json(`El producto con el id:${o} ha sido insertado`)}catch(t){console.log(t),e.json({error:"producto no insertado"})}}))))}getProduct(){c.route("/:id").get(((t,e)=>r(this,void 0,void 0,(function*(){try{const o=yield this.knex.from("products").select("*").where("id",t.params.id);e.json(o)}catch(t){console.log(t)}})))).put(d.default,((t,e)=>r(this,void 0,void 0,(function*(){try{yield this.knex("products").where("id",t.params.id).update(t.body),e.json(`El producto con el id:${t.params.id} ha sido actualizado`)}catch(t){console.log(t)}})))).delete(d.default,((t,e)=>r(this,void 0,void 0,(function*(){try{yield this.knex("products").where("id",t.params.id).del(),e.json(`El producto con el id:${t.params.id} ha sido eliminado`)}catch(t){console.log(t)}}))))}}e.default=a},179:function(t,e,o){var r=this&&this.__awaiter||function(t,e,o,r){return new(o||(o=Promise))((function(i,n){function s(t){try{c(r.next(t))}catch(t){n(t)}}function d(t){try{c(r.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(s,d)}c((r=r.apply(t,e||[])).next())}))},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=o(860),s=i(o(135)),d=o(489),c=i(o(802)),a=(0,n.Router)();class u extends s.default{constructor(t){super(t),a.use((0,n.json)()),a.use((0,n.urlencoded)({extended:!0})),this.getProducts(),this.getProduct(),this.router=a}getProducts(){a.route("/").get(((t,e)=>{d.Product.find({},((t,o)=>{t&&(console.log(t),e.send({error:"productos no encontrados"})),e.json(o)}))})).post(c.default,((t,e)=>r(this,void 0,void 0,(function*(){const o=new d.Product(t.body);yield o.save(),e.json(o)}))))}getProduct(){a.route("/:id").get(((t,e)=>{d.Product.findById(t.params.id,((t,o)=>{if(t)return e.json({error:"producto no encontrado"});e.json(o)}))})).put(c.default,((t,e)=>{d.Product.findByIdAndUpdate(t.params.id,t.body,(o=>{if(o)return e.json({error:"producto no encontrado"});e.json(`El producto con el id:${t.params.id} ha sido actualizado`)}))})).delete(c.default,((t,e)=>{d.Product.findByIdAndRemove(t.params.id,((o,r)=>{if(r)return e.json(`El producto con el id:${t.params.id} ha sido eliminado`);e.json({error:"producto no encontrado"})}))}))}}e.default=u},794:function(t,e,o){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Cart=void 0;const i=r(o(185)),n=o(489),s=new i.default.Schema({products:[n.productSchema],timestamp:{type:Date,default:Date.now}});e.Cart=i.default.model("carts",s)},489:function(t,e,o){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Product=e.productSchema=void 0;const i=r(o(185));e.productSchema=new i.default.Schema({title:{type:String,required:!0},description:{type:String,required:!0},thumbnail:{type:String,required:!0},price:{type:Number,required:!0},timestamp:{type:Date,default:Date.now},stock:{type:Number,required:!0}}),e.Product=i.default.model("products",e.productSchema)},81:t=>{t.exports=require("dotenv/config")},860:t=>{t.exports=require("express")},509:t=>{t.exports=require("firebase-admin")},514:t=>{t.exports=require("knex")},185:t=>{t.exports=require("mongoose")},147:t=>{t.exports=require("fs")},351:t=>{t.exports=JSON.parse('{"type":"service_account","project_id":"backendecommerce-dec6c","private_key_id":"aef48c2fd1f66e64f17a9a8143a5714f941a35fa","private_key":"-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCytu4K9Otec6Vj\\nMzrEnSCUP1Sbqa90up+uHbSp9Z/9Vd/e8YYVdiJqVzpy+R98UPz5rssfWigOHaHi\\n6kzm8a4OOlFXQdJ+57TBf1A8ZnSL9wZ3RVDYGk44hqa6xjlfD62tUC4mrrMWb/dA\\nEOZUM3RACE1xZ+g26xfvwMo5aJbRdtawJ1m0KfeR2bBiIZVqmm4aa8uJOCkdoLfU\\nBRNBhxPa/qgLKcYeJHF2OC3gCiW1875YFPiolNCBl9EzWZf/Nfb49aw5/VybKXg9\\nA61kwxKzwY0ctOBDxDnRFPppKQ7ZC+vH8s9COLNH+ns/UUgOubH08VsVDp9//6kh\\nAZHnjIRLAgMBAAECggEAAoL9hXfEQ98H8mtd5nnEMEAgaElBKTiv1dQ4P+1iNfqa\\nMLusyFj3n6gMUS4liyLNlgw36UQXYEpYMOjDrx+ABWdvnknKzSdkgVoU+lVnW8nS\\n2sYBSSHVg1TLzK7dk9GC/cOCL1bbnXwLwlcC/0riXk6uf2sgkFx+jVxTe0KJT0uA\\nYMR6j5P3gUvXLqjkTtxGlhfXYOK3GqF0Kf2JyzsZGL/0xLN7CY8gDZ7ejkh3I6Qz\\n3DUIDk5RrzWWkusF4xsup7JWH55nxdnpU/FIl4ZLC9OEN3vQFiGYL2yLo0WN02mQ\\n0OMbj1Pi6UF2oYY3rY831xtWUb/9YQR0iPDdc5dtQQKBgQDn3TG0zQXbiO9FbHkq\\nBU8Rgh5GjWMQVXG/CHYtHPPW3gc7Js9j0Q6D8/NNHhlnP6buDXgg2UEXVQhyBZpo\\nwCT6/25kPKVmi05Tufvaq8yVTXjLyp1wMWsENgDnShAKwhSeNjlLEkymwu8UnAwH\\n0orfKV32Le648ylVyNyAtHsdXQKBgQDFUWMnQkT5z/QRePj5nvGAGwmXA7MndCDH\\nqW+bhAMjT9VHuZetY5vthiBKDc/Ps6EmJzvAM9YsAErDPn+EQnmXtah/oHntd5iq\\nXuB3e3WNj5ikLJSEupJNfB3lhCiSbBK8p+go8HvOdnzU1agV0/wb5Tn7uaReCxFD\\nBWlntx9lxwKBgQCRyWOykeLn+X6wwRaiFDp2AMF2jPnH0GG3wuNDVFwBMxOK3skx\\nssYUs7O8PnusjrowHen1hYTG3eF0iA9hY8ccxrSrc/JvupGiVWOFR9ZX3iFgyeIa\\nJAhs2mPRCaFykjuSiveVO0lU5WacJ83ssTY+QO1il9jtE39e/++dQV3TxQKBgDqu\\nI5CvUpgAUhNIKLMDo8p3P/jbLtJS5NS7/OcA8XX07fawqPz1nI+czcl4Jg8c2pXg\\nIRLd15mqVJGP6phItKR7b6rU7K3EXXB9Wr/txV3eEITyhRCb85p7iOCS1wYEgeX9\\nATv7mLYj4qfhCmXDbzxUhVPpN4qIPA/0cg5YFUxNAoGADyLgrXEozVBIUUqsXwKc\\nzZwEDipHy+27GdY3fNqig//YdK/C8aw9hdNyiuQP4YGp9D1gtLdOK2WfxSvdx40n\\nwyJpEp+eiQIg/2Z/TYYfmqHsFR1YjiyO6MKsM/bBLSV4r64gZmkmc9QUFapklNBp\\nobFq9PEEZcIGB4JViUB2Tcs=\\n-----END PRIVATE KEY-----\\n","client_email":"firebase-adminsdk-hm6xm@backendecommerce-dec6c.iam.gserviceaccount.com","client_id":"111270348000462068536","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hm6xm%40backendecommerce-dec6c.iam.gserviceaccount.com"}')}},e={};!function o(r){var i=e[r];if(void 0!==i)return i.exports;var n=e[r]={exports:{}};return t[r].call(n.exports,n,n.exports,o),n.exports}(505)})();