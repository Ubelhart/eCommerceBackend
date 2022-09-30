(()=>{"use strict";var e={5505:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(8665)),o=n(r(5001)),s=r(4274);if("CLUSTER"===s.mode._[0])if(o.default.isPrimary){console.log("Master cluster setting up");for(let e=0;e<s.numCPUs;e++)o.default.fork();o.default.on("exit",(e=>{console.log(`worker ${e.process.pid} died`)}))}else i.default.listen(s.PORT,(()=>{console.log(`Servidor corriendo en http://localhost:${s.PORT}`)})),console.log(`Worker ${process.pid} started`);else i.default.listen(s.PORT,(()=>{console.log(`Servidor corriendo en http://localhost:${s.PORT}`)}))},6752:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),r(1081);const i=n(r(3114)),o=n(r(6422)),s=n(r(7455)),u=n(r(6860)),d=n(r(6508)),c=n(r(6687)),a=n(r(3582)),l=(0,u.default)();l.use(u.default.static("public")),l.use(u.default.json()),l.use(u.default.urlencoded({extended:!0})),l.use((0,d.default)({secret:"secreto",cookie:{httpOnly:!1,secure:!1,maxAge:6e5},rolling:!0,resave:!0,saveUninitialized:!1})),l.use(c.default.initialize()),l.use(c.default.session()),l.use((0,s.default)()),l.use((0,a.default)()),l.use("/api/carrito",(new i.default).router),l.use("/api/productos",(new o.default).router),l.set("views","./views"),l.set("view engine","ejs"),t.default=l},8913:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.serviceAccount=t.sqlite3=t.mariadb=t.mongoDbKey=void 0,r(1081),t.mongoDbKey=process.env.MONGO||"mongodb://localhost:27017/ecommerce",t.mariadb={client:"mysql",connection:{host:"127.0.0.1",user:"root",password:"",database:"ecommerce"}},t.sqlite3={client:"sqlite3",connection:{filename:"./src/db/mydb.sqlite"},useNullAsDefault:!0},t.serviceAccount={type:process.env.FIREBASE_type,project_id:process.env.FIREBASE_project_id,private_key_id:process.env.FIREBASE_private_key_id,private_key:process.env.FIREBASE_private_key,client_email:process.env.FIREBASE_client_email,client_id:process.env.FIREBASE_client_id,auth_uri:process.env.FIREBASE_auth_uri,token_uri:process.env.FIREBASE_token_uri,auth_provider_x509_cert_url:process.env.FIREBASE_auth_provider_x509_cert_url,client_x509_cert_url:process.env.FIREBASE_client_x509_cert_url}},3089:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const i=r(7147);t.default=class{constructor(e){this.fileName=e,this.config=`./db/${e}`,this.fs=i.promises}createIfNotExist(){return n(this,void 0,void 0,(function*(){try{return yield i.promises.readFile(this.config)}catch(e){if("ENOENT"===e.code)return yield i.promises.writeFile(this.config,"[]").then((()=>{console.log(`No existe ${this.fileName}. Archivo creado.`)})),yield i.promises.readFile(this.config);console.log("Hubo un error",e)}return null}))}}},1179:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(2509));t.default=class{constructor(e){this.config=e,this.admin=i.default}connect(){i.default.initializeApp({credential:i.default.credential.cert(this.config)}),console.log("Firebase connected")}}},3231:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(514));t.default=class{constructor(e){this.knex=(0,i.default)(e)}}},135:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(1185));t.default=class{constructor(e){this.config=e}connect(){return n(this,void 0,void 0,(function*(){try{yield o.default.connect(this.config),console.log("MongoDB connected")}catch(e){console.log("MongoDB connection error",e)}}))}}},8318:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),r(1081);const o=r(8216),s=new(i(r(9066)).default);t.default=class{constructor(){this.postCart=this.postCart.bind(this),this.deleteCart=this.deleteCart.bind(this),this.getCart=this.getCart.bind(this),this.postProduct=this.postProduct.bind(this),this.deleteProduct=this.deleteProduct.bind(this)}postCart(e,t){return n(this,void 0,void 0,(function*(){if(e.user)try{const r=yield s.postCart(e.body,e.user);return r?(yield(0,o.sendWhatsappMessageToAdmin)(e.user.username),yield(0,o.sendWhatsappMessageToCustomer)(e.user.phoneNumber),t.json(`El carrito con el id:${r.id} ha sido agregado`)):t.json({error:"no se pudo agregar el carrito"})}catch(e){return t.status(500).json({error:e.message})}return t.json({error:"debes iniciar sesión para agregar al carrito"})}))}deleteCart(e,t){return n(this,void 0,void 0,(function*(){if(e.user)try{const r=yield s.deleteCart(e.params,e.user);return r?t.json(`El carrito con el id:${r.id} ha sido eliminado`):t.json({error:`el carrito con el id:${e.params.id} no existe`})}catch(e){return t.status(500).json({error:e.message})}return t.json({error:"debes iniciar sesión para eliminar el carrito"})}))}getCart(e,t){return n(this,void 0,void 0,(function*(){if(e.user)try{const r=yield s.getCart(e.params,e.user);return r?t.json(r):t.json({error:`el carrito con el id:${e.params.id} no existe`})}catch(e){return t.status(500).json({error:e.message})}return t.json({error:"debes iniciar sesión para ver el carrito"})}))}postProduct(e,t){return n(this,void 0,void 0,(function*(){if(e.user)try{const r=yield s.postProduct(e.params,e.body,e.user);return r?t.json(`El producto con el id:${r.id} ha sido agregado`):t.json({error:`el producto no pudo ser agregado al carrito con el id:${e.params.id}`})}catch(e){return t.status(500).json({error:e.message})}return t.json({error:"debes iniciar sesión para agregar un producto"})}))}deleteProduct(e,t){return n(this,void 0,void 0,(function*(){if(e.user)try{const r=yield s.deleteProduct(e.params,e.user);return r?t.json(`El producto con el id:${r.id} ha sido eliminado`):t.json({error:`el producto con el id:${e.params.id_prod} no existe en el carrito con el id:${e.params.id}`})}catch(e){return t.status(500).json({error:e.message})}return t.json({error:"debes iniciar sesión para eliminar un producto"})}))}}},3767:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),r(1081);const o=i(r(6645)),s=new(i(r(3153)).default);t.default=class{constructor(){this.getProduct=this.getProduct.bind(this),this.postProduct=this.postProduct.bind(this),this.putProduct=this.putProduct.bind(this),this.deleteProduct=this.deleteProduct.bind(this)}getProduct(e,t){return n(this,void 0,void 0,(function*(){try{const r=yield s.getProduct(e.params.id);return r?t.json(r):t.json({error:`el producto con el id:${e.params.id} no existe`})}catch(e){return o.default.error(e.message),t.status(500).json({message:e.message})}}))}postProduct(e,t){return n(this,void 0,void 0,(function*(){try{const r=yield s.postProduct(e.body);return r?t.json(`El producto con el id:${r.id} ha sido creado`):t.json({error:"no se pudo crear el producto"})}catch(e){return o.default.error(e.message),t.status(500).json({message:e.message})}}))}putProduct(e,t){return n(this,void 0,void 0,(function*(){try{const r=yield s.putProduct(e.params.id,e.body);return r?t.json(`El producto con el id:${r.id} ha sido actualizado`):t.json({error:`el producto con el id:${e.params.id} no existe`})}catch(e){return o.default.error(e.message),t.status(500).json({message:e.message})}}))}deleteProduct(e,t){return n(this,void 0,void 0,(function*(){try{const r=yield s.deleteProduct(e.params.id);return r?t.json(`El producto con el id:${r.id} ha sido eliminado`):t.json({error:`el producto con el id:${e.params.id} no existe`})}catch(e){return o.default.error(e.message),t.status(500).json({message:e.message})}}))}}},4808:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(3089));class s extends o.default{constructor(e){super(e)}getCarts(){return n(this,void 0,void 0,(function*(){const e=yield this.createIfNotExist();return e?JSON.parse(e.toString()):e}))}getCart(e){return n(this,void 0,void 0,(function*(){const t=yield this.getCarts(),r=parseInt(e);return t.find((e=>e.id===r))}))}postCart(e){return n(this,void 0,void 0,(function*(){const t=yield this.getCarts(),r={timestamp:(new Date).toString(),products:e};return t.length?r.id=t[t.length-1].id+1:r.id=1,t.push(r),yield this.fs.writeFile(this.config,JSON.stringify(t)),r}))}deleteCart({id:e}){return n(this,void 0,void 0,(function*(){const t=yield this.getCarts(),r=parseInt(e),n=t.filter((e=>e.id!==r));this.fs.writeFile(this.config,JSON.stringify(n))}))}postProduct(e,t){return n(this,void 0,void 0,(function*(){const r=yield this.getCarts(),n=r.find((t=>t.id===e.id));return n?(n.products.push(t),yield this.fs.writeFile(this.config,JSON.stringify(r)),t=e.products.find((e=>e.id===t.id))):null}))}deleteProduct(e,t){return n(this,void 0,void 0,(function*(){const r=yield this.getCarts(),n=parseInt(t),i=r.find((t=>t.id===e.id));return!!i&&(i.products.filter((e=>e.id!==n)),this.fs.writeFile(this.config,JSON.stringify(r)),!0)}))}}t.default=s},3792:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(1179));class s extends o.default{constructor(e){super(e),this.connect(),this.db=this.admin.firestore(),this.query=this.db.collection("carts")}postCart(e){return n(this,void 0,void 0,(function*(){const t={timestamp:(new Date).toString(),products:[]};e&&!e.length?t.products.push(e):e.length&&(t.products=e);const r=this.query.doc(),n=r._path.segments[1];yield r.create(t);const i=yield this.getCart(n);if(i.products)return i}))}deleteCart(e){return n(this,void 0,void 0,(function*(){const t=this.query.doc(e.id);e.products&&(yield t.delete())}))}getCart(e){return n(this,void 0,void 0,(function*(){const t=yield this.query.doc(e),r=yield t.get(),n=Object.assign({id:t.id},r.data());if(n.title)return n}))}postProduct(e,t){return n(this,void 0,void 0,(function*(){const r=this.admin.firestore.FieldValue.arrayUnion,n=this.query.doc(e.id);return e.products?(yield n.update({products:r(t)}),t):t}))}deleteProduct(e,t){return n(this,void 0,void 0,(function*(){const r=this.query.doc(e.id);let n;if(e.products&&(n=e.products.find((e=>e.id===t))),n){const e=this.admin.firestore.FieldValue.arrayRemove;return yield r.update({products:e(n)}),n}return n}))}}t.default=s},9303:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(135)),s=r(5794);class u extends o.default{constructor(e){super(e),this.connect()}postCart(e){return n(this,void 0,void 0,(function*(){const t=new s.Cart(e);return yield t.save()}))}deleteCart(e,t){return n(this,void 0,void 0,(function*(){yield s.Cart.findOneAndDelete({_id:e,username:t})}))}getCart(e,t){return n(this,void 0,void 0,(function*(){return yield s.Cart.findOne({_id:e,username:t})}))}postProduct({id:e},t,r){return n(this,void 0,void 0,(function*(){return yield s.Cart.findOneAndUpdate({_id:e,username:r},{$push:{products:t}},{new:!0})}))}deleteProduct({id:e},t,r){return n(this,void 0,void 0,(function*(){return yield s.Cart.findOneAndUpdate({_id:e,username:r},{$pull:{products:{_id:t}}})}))}}t.default=u},5526:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(3231));class s extends o.default{constructor(e){super(e)}createIfNotExists(){return n(this,void 0,void 0,(function*(){try{yield this.knex.schema.createTable("carts",(e=>{e.increments("id"),e.string("title"),e.timestamp("timestamp")}))}catch(e){console.log(e.sqlMessage)}}))}createIfNotExistsProducts(){return n(this,void 0,void 0,(function*(){try{yield this.knex.schema.createTable("carts_products",(e=>{e.integer("id"),e.integer("cart_id"),e.string("title"),e.string("description"),e.string("thumbnail"),e.float("price"),e.integer("stock"),e.string("timestamp")}))}catch(e){console.log(e.sqlMessage)}}))}postCart(e){return n(this,void 0,void 0,(function*(){yield this.createIfNotExists(),yield this.createIfNotExistsProducts();const t=yield this.knex("carts").insert({title:"Carrito"});return e.forEach((e=>{e.cart_id=t[0]})),yield this.knex("carts_products").insert(e),this.getCart(t[0].toString())}))}deleteCart({id:e}){return n(this,void 0,void 0,(function*(){yield this.knex("carts_products").where("cart_id",e).del(),yield this.knex("carts").where("id",e).del()}))}getCart(e){return n(this,void 0,void 0,(function*(){try{const t=(yield this.knex.from("carts").select("*").where("id",e))[0];return t.products=yield this.knex.from("carts_products").select("*").where("cart_id",e),t}catch(e){return console.log(e.sqlMessage),!1}}))}postProduct(e,t){return n(this,void 0,void 0,(function*(){return e.products&&(t.cart_id=e.id),yield this.knex("carts_products").insert(t),t}))}deleteProduct(e,t){return n(this,void 0,void 0,(function*(){const r=yield this.knex.from("carts_products").select("*").where("id",t).andWhere("cart_id",e.id);return yield this.knex("carts_products").where("id",t).andWhere("cart_id",e.id).del(),r[0]}))}}t.default=s},2154:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(135)),s=r(6200);class u extends o.default{constructor(e){super(e)}getMessage(e){return n(this,void 0,void 0,(function*(){return console.log(e),yield s.Message.findOne({email:e})}))}getMessages(){return n(this,void 0,void 0,(function*(){return yield s.Message.find({})}))}postMessage(e){return n(this,void 0,void 0,(function*(){const t=new s.Message(e);return yield t.save()}))}putMessage(e,t){return n(this,void 0,void 0,(function*(){return yield s.Message.findByIdAndUpdate(e,t)}))}deleteMessage(e){return n(this,void 0,void 0,(function*(){return yield s.Message.findByIdAndRemove(e)}))}}t.default=u},5722:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(3089));class s extends o.default{constructor(e){super(e)}getProducts(){return n(this,void 0,void 0,(function*(){const e=yield this.createIfNotExist();return e?JSON.parse(e.toString()):e}))}postProduct(e){return n(this,void 0,void 0,(function*(){const t=yield this.getProducts();return t.length?e.id=t[t.length-1].id+1:e.id=1,e.timestamp=(new Date).toString(),t.push(e),yield this.fs.writeFile(this.config,JSON.stringify(t)),e}))}getProduct(e){return n(this,void 0,void 0,(function*(){const t=parseInt(e);return(yield this.getProducts()).find((e=>e.id===t))}))}putProduct(e,t){return n(this,void 0,void 0,(function*(){const r=parseInt(e),n=(yield this.getProducts()).filter((e=>e.id!==r));return t.id=r,n.push(t),yield this.fs.writeFile(this.config,JSON.stringify(n)),t}))}deleteProduct({id:e}){return n(this,void 0,void 0,(function*(){const t=parseInt(e),r=(yield this.getProducts()).filter((e=>e.id!==t));this.fs.writeFile(this.config,JSON.stringify(r))}))}}t.default=s},1593:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(1179));class s extends o.default{constructor(e){super(e),this.db=this.admin.firestore(),this.query=this.db.collection("products")}getProducts(){return n(this,void 0,void 0,(function*(){return(yield this.query.get()).docs.map((e=>Object.assign({id:e.id},e.data())))}))}postProduct(e){return n(this,void 0,void 0,(function*(){e.timestamp=(new Date).toString();const t=this.query.doc(),r=t._path.segments[1];yield t.create(e);const n=yield this.getProduct(r);if(n.title)return n}))}getProduct(e){return n(this,void 0,void 0,(function*(){const t=this.query.doc(e),r=yield t.get(),n=Object.assign({id:t.id},r.data());if(n.title)return n}))}putProduct(e,t){return n(this,void 0,void 0,(function*(){const r=this.query.doc(e);yield r.update(t);const n=yield this.getProduct(e);if(n.title)return n}))}deleteProduct(e){return n(this,void 0,void 0,(function*(){const t=this.query.doc(e.id);return!!e.title&&(yield t.delete(),!0)}))}}t.default=s},1470:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(3231));class s extends o.default{constructor(e){super(e)}createIfNotExists(){return n(this,void 0,void 0,(function*(){try{yield this.knex.schema.createTable("products",(e=>{e.increments("id"),e.string("title"),e.string("description"),e.string("thumbnail"),e.float("price"),e.integer("stock"),e.timestamp("timestamp")}))}catch(e){console.log(e.sqlMessage)}}))}getProducts(){return n(this,void 0,void 0,(function*(){return yield this.knex.from("products").select("*")}))}postProduct(e){return n(this,void 0,void 0,(function*(){yield this.createIfNotExists();const t=yield this.knex("products").insert(e);return yield this.getProduct(t[0].toString())}))}getProduct(e){return n(this,void 0,void 0,(function*(){return(yield this.knex.from("products").select("*").where("id",e))[0]}))}putProduct(e,t){return n(this,void 0,void 0,(function*(){return yield this.knex("products").where("id",e).update(t),yield this.getProduct(e)}))}deleteProduct({id:e}){return n(this,void 0,void 0,(function*(){yield this.knex("products").where("id",e).del()}))}}t.default=s},4179:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(135)),s=r(6489);class u extends o.default{constructor(e){super(e)}getProduct(e){return n(this,void 0,void 0,(function*(){return yield s.Product.findById(e)}))}getProducts(){return n(this,void 0,void 0,(function*(){return yield s.Product.find({})}))}getProductsByCategory(e){return n(this,void 0,void 0,(function*(){return yield s.Product.find({category:e})}))}postProduct(e){return n(this,void 0,void 0,(function*(){const t=new s.Product(e);return yield t.save()}))}putProduct(e,t){return n(this,void 0,void 0,(function*(){return yield s.Product.findByIdAndUpdate(e,t)}))}deleteProduct(e){return n(this,void 0,void 0,(function*(){return yield s.Product.findByIdAndRemove(e)}))}}t.default=u},9022:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Factory=void 0;const i=r(8913),o=n(r(4808)),s=n(r(5722)),u=n(r(3792)),d=n(r(1593)),c=n(r(9303)),a=n(r(4179)),l=n(r(5526)),f=n(r(1470)),h=n(r(2154));let p,v;class _{create(e,t){switch(e){case"mongoDb":switch(t){case"carts":p=new c.default(i.mongoDbKey);break;case"products":p=new a.default(i.mongoDbKey);break;case"messages":p=new h.default(i.mongoDbKey)}return p;case"firebase":switch(t){case"carts":p=new u.default(i.serviceAccount);break;case"products":p=new d.default(i.serviceAccount)}return p;case"mariaSql":switch(t){case"carts":p=new l.default(i.sqlite3);break;case"products":p=new f.default(i.mariadb)}return p;default:switch(t){case"carts":p=new o.default("carts.json");break;case"products":p=new s.default("products.json")}return p}}static getInstance(){return v||(v=new _),v}}t.Factory=_,t.default=_},5794:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Cart=void 0;const i=n(r(1185)),o=r(6489),s=new i.default.Schema({username:{type:String,require:!0},products:[o.productSchema],timestamp:{type:String,default:(new Date).toString()}});t.Cart=i.default.model("carts",s)},6200:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Message=t.messageSchema=void 0;const i=n(r(1185));t.messageSchema=new i.default.Schema({email:{type:String,required:!0},text:{type:String,required:!0},timestamp:{type:String,default:(new Date).toString()}}),t.Message=i.default.model("messages",t.messageSchema)},6489:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Product=t.productSchema=void 0;const i=n(r(1185));t.productSchema=new i.default.Schema({title:{type:String,required:!0},description:{type:String,required:!0},category:{type:String,required:!0},thumbnail:{type:String,required:!0},price:{type:Number,required:!0},timestamp:{type:String,default:(new Date).toString()},stock:{type:Number,required:!0}}),t.Product=i.default.model("products",t.productSchema)},7012:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=r(1185),i=new n.Schema({username:{type:String,required:!0},password:{type:String,required:!0},name:{type:String,required:!0},address:{type:String,required:!0},age:{type:Number,required:!0},phoneNumber:{type:String,required:!0},avatar:{type:String,required:!0}}),o=(0,n.model)("users",i);t.default=o},9123:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),r(1081);const o=i(r(9022)).default.getInstance().create(process.env.DB,"carts");t.default=class{postCart(e){return n(this,void 0,void 0,(function*(){return yield o.postCart(e)}))}deleteCart(e,t){return n(this,void 0,void 0,(function*(){return yield o.deleteCart(e,t)}))}getCart(e,t){return n(this,void 0,void 0,(function*(){return yield o.getCart(e,t)}))}postProduct(e,t,r){return n(this,void 0,void 0,(function*(){return(yield o.postProduct(e,t,r)).products.find((e=>e._id==t._id))}))}deleteProduct(e,t,r){return n(this,void 0,void 0,(function*(){return(yield o.deleteProduct(e,t,r)).products.find((e=>e._id==t))}))}}},546:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),r(1081);const o=i(r(9022)).default.getInstance().create(process.env.DB,"products");t.default=class{constructor(){}getProduct(e){return n(this,void 0,void 0,(function*(){return["Madera","Plástico"].includes(e)?yield o.getProductsByCategory(e):e?yield o.getProduct(e):yield o.getProducts()}))}postProduct(e){return n(this,void 0,void 0,(function*(){return yield o.postProduct(e)}))}putProduct(e,t){return n(this,void 0,void 0,(function*(){return yield o.putProduct(e,t)}))}deleteProduct(e){return n(this,void 0,void 0,(function*(){return yield o.deleteProduct(e)}))}}},8114:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(6752)),o=n(r(6687)),s=n(r(6645));i.default.get("/register",((e,t)=>{t.render("register")})),i.default.post("/register",o.default.authenticate("signup",{successRedirect:"/login",failureRedirect:"/failregister"})),i.default.get("/failregister",((e,t)=>{s.default.info("Fallo al registrar usuario"),t.render("failregister")})),i.default.get("/login",((e,t)=>{t.render("login")})),i.default.post("/login",o.default.authenticate("login",{successRedirect:"/",failureRedirect:"/faillogin"})),i.default.get("/faillogin",((e,t)=>{s.default.info("Fallo al iniciar sesión"),t.render("faillogin")})),i.default.get("/logout",((e,t)=>{if(e.user){const{username:r}=e.user;return e.logOut((e=>e?(s.default.error(e),t.redirect("/login")):t.render("logout",{username:r})))}t.redirect("/login")})),t.default=i.default},3114:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(6860),o=n(r(8318)),s=(0,i.Router)();t.default=class{constructor(){this.router=s,this.cartsController=new o.default,s.use((0,i.json)()),s.use((0,i.urlencoded)({extended:!0})),s.post("/",this.cartsController.postCart),s.delete("/:id",this.cartsController.deleteCart),s.get("/:id/productos",this.cartsController.getCart),s.post("/:id/productos",this.cartsController.postProduct),s.delete("/:id/productos/:id_prod",this.cartsController.deleteProduct)}}},6422:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(6860),o=n(r(3767)),s=(0,i.Router)();t.default=class{constructor(){this.router=s,this.productsController=new o.default,s.use((0,i.json)()),s.use((0,i.urlencoded)({extended:!0})),s.get("/:id?",this.productsController.getProduct),s.post("/",this.productsController.postProduct),s.put("/:id",this.productsController.putProduct),s.delete("/:id",this.productsController.deleteProduct)}}},4274:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.PORT=t.mode=t.numCPUs=void 0;const o=i(r(1566)),s=i(r(2037)),u=i(r(8114)),d=i(r(6645));t.numCPUs=s.default.cpus().length;const c=(0,o.default)(process.argv.slice(2));t.mode=(0,o.default)(process.argv.slice(3));const a=i(r(9022)).default.getInstance().create(process.env.DB,"messages");t.PORT=process.env.PORT||c._[0]||8080,u.default.get("/",((e,t)=>e.user?t.redirect("/api/productos"):t.redirect("/login"))),u.default.get("/chat",((e,t)=>{t.render("chat")})),u.default.get("/chat/:email",((e,t)=>n(void 0,void 0,void 0,(function*(){t.json(yield a.getMessage(e.params.email))})))),u.default.get("/api/randoms",((e,t)=>{const{cant:r}=e.query,n=Number(r)||1e5,i=[];for(let e=0;e<n;e++)i.push(Math.floor(1e3*Math.random()));t.json(i)}));const l={"Argumentos de entrada":process.argv,"Nombre de la plataforma: ":process.platform,"Versión de Node: ":process.version,"Memoria total reservada":process.memoryUsage().heapTotal,"Path de ejecución":process.execPath,"Process id":process.pid,"Número de procesadores presentes en el servidor":"CLUSTER"===t.mode._[0]?t.numCPUs:1,"Carpeta del proyecto":__dirname,Port:t.PORT};u.default.get("/info",((e,t)=>{t.json(l)})),u.default.get("*",((e,t)=>{d.default.warn("Ruta no existente"),t.send("Ruta no existente")}))},9066:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=new(i(r(9123)).default);t.default=class{postCart(e,{username:t}){return n(this,void 0,void 0,(function*(){const r={username:t,products:e};return yield o.postCart(r)}))}deleteCart({id:e},{username:t}){return n(this,void 0,void 0,(function*(){const r=yield this.getCart(e,t);if(r)return yield o.deleteCart(e,t),r}))}getCart({id:e},{username:t}){return n(this,void 0,void 0,(function*(){return yield o.getCart(e,t)}))}postProduct({id:e},t,{username:r}){return n(this,void 0,void 0,(function*(){if(yield this.getCart(e,r))return yield o.postProduct(t,e,r)}))}deleteProduct({id:e,id_prod:t},{username:r}){return n(this,void 0,void 0,(function*(){if(yield this.getCart(e,r))return yield o.deleteProduct(e,t,r)}))}}},3153:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=new(i(r(546)).default);t.default=class{getProduct(e){return n(this,void 0,void 0,(function*(){return e?yield o.getProduct(e):yield o.getProduct(null)}))}postProduct(e){return n(this,void 0,void 0,(function*(){return yield o.postProduct(e)}))}putProduct(e,t){return n(this,void 0,void 0,(function*(){return yield o.putProduct(e,t)}))}deleteProduct(e){return n(this,void 0,void 0,(function*(){return yield o.deleteProduct(e)}))}}},8665:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(3685),s=r(3952),u=i(r(6752)),d=new o.Server(u.default),c=new s.Server(d),a=i(r(9022)).default.getInstance().create(process.env.DB,"messages");c.on("connection",(e=>n(void 0,void 0,void 0,(function*(){console.log("Un cliente se ha conectado"),e.emit("messages",yield a.getMessages()),e.on("new-message",(e=>n(void 0,void 0,void 0,(function*(){a.postMessage(e),c.sockets.emit("messages",yield a.getMessages())}))))})))),t.default=d},6645:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(7773)),o=i.default.createLogger({transports:[new i.default.transports.Console({level:"info"}),new i.default.transports.File({filename:"warn.log",level:"warn"}),new i.default.transports.File({filename:"error.log",level:"error"})]});t.default=o},2918:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(5184),s=i(r(6645)),u=(0,o.createTransport)({service:"gmail",auth:{user:process.env.MAIL,pass:process.env.MAIL_PASSWORD}});t.default=function(e){return n(this,void 0,void 0,(function*(){const t=yield u.sendMail({from:"Servidor de Tienda",port:587,to:process.env.MAIL,subject:"Nuevo registro",html:`<h1>${e}</h1>`});s.default.info(t)}))}},6687:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(3511)),s=r(7055),u=i(r(7096)),d=i(r(7012)),c=i(r(6645)),a=i(r(2918));function l(e){return u.default.hashSync(e,u.default.genSaltSync(10),null)}o.default.use("login",new s.Strategy(((e,t,r)=>{d.default.findOne({username:e},((e,n)=>e?r(e):n?function(e,t){return u.default.compareSync(t,e.password)}(n,t)?r(null,n):(c.default.info("Contraseña incorrecta"),r(null,!1)):(c.default.info("Email no encontrado"),r(null,!1))))}))),o.default.use("signup",new s.Strategy({passReqToCallback:!0},(({body:e},t,r,i)=>{d.default.findOne({username:t},((o,s)=>{if(o)return i(o);if(s)return c.default.info("Email ya existe"),i(null,!1);const u=new d.default({username:t,password:l(r),name:e.name,address:e.address,age:e.age,phoneNumber:e.phoneNumber,avatar:e.avatar});u.save((e=>n(void 0,void 0,void 0,(function*(){return e?i(e):(yield(0,a.default)(u),i(null,u))}))))}))}))),o.default.serializeUser((({_id:e},t)=>{t(null,e)})),o.default.deserializeUser(((e,t)=>{d.default.findById(e,((e,r)=>e?t(e):t(null,r)))})),t.default=o.default},8216:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{d(n.next(e))}catch(e){o(e)}}function u(e){try{d(n.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}d((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.sendWhatsappMessageToCustomer=t.sendWhatsappMessageToAdmin=void 0;const o=i(r(7202)),s=i(r(6645)),u=process.env.TWILIO_ACCOUNT_SID,d=process.env.TWILIO_AUTH_TOKEN,c=(0,o.default)(u,d);t.sendWhatsappMessageToAdmin=e=>n(void 0,void 0,void 0,(function*(){try{const t=yield c.messages.create({body:`Nuevo pedido de ${e}!`,from:`whatsapp:${process.env.TWILIO_NUMBER}`,to:`whatsapp:${process.env.MY_PHONE}`});s.default.info(t)}catch(e){s.default.error(e)}})),t.sendWhatsappMessageToCustomer=e=>n(void 0,void 0,void 0,(function*(){try{const t=yield c.messages.create({body:"Su pedido ha sido recibido y se encuentra en proceso!",from:`whatsapp:${process.env.TWILIO_NUMBER}`,to:`whatsapp:${e}`});s.default.info(t)}catch(e){s.default.error(e)}}))},7096:e=>{e.exports=require("bcrypt")},7455:e=>{e.exports=require("compression")},3582:e=>{e.exports=require("cors")},1081:e=>{e.exports=require("dotenv/config")},6860:e=>{e.exports=require("express")},6508:e=>{e.exports=require("express-session")},2509:e=>{e.exports=require("firebase-admin")},514:e=>{e.exports=require("knex")},1566:e=>{e.exports=require("minimist")},1185:e=>{e.exports=require("mongoose")},5184:e=>{e.exports=require("nodemailer")},3511:e=>{e.exports=require("passport")},7055:e=>{e.exports=require("passport-local")},3952:e=>{e.exports=require("socket.io")},7202:e=>{e.exports=require("twilio")},7773:e=>{e.exports=require("winston")},5001:e=>{e.exports=require("cluster")},7147:e=>{e.exports=require("fs")},3685:e=>{e.exports=require("http")},2037:e=>{e.exports=require("os")}},t={};!function r(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}(5505)})();