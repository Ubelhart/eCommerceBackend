import admin from "firebase-admin";

export default class FirebaseContainer {
  private config;
  public db;
  public admin;
  public query;
  constructor(config) {
    this.config = config;
    this.admin = admin;
  }
  public connect() {
    admin.initializeApp({
      credential: admin.credential.cert(this.config),
    });

    console.log("Firebase connected");
  }
}
