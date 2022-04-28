import { promises as fs } from "fs";

export default class FileContainer {
  public config;
  public fs;
  public products;

  constructor(config) {
    this.config = config;
    this.fs = fs;
    this.products = [];
  }
  public async createIfNotExist() {
    let file;
    try {
      file = await fs.readFile(this.config);
    } catch (error: unknown) {
      const err = error as any;
      if (err.code === "ENOENT") {
        await fs.writeFile(this.config, "[]").then(() => {
          console.log(`No existe ${this.config}. Archivo creado.`);
        });
        return (file = await fs.readFile(this.config));
      }
      console.log("Hubo un error", error);
    }
    return file;
  }
}
