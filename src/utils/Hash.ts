import * as bcrypt from "bcrypt";

export class Hash {
  static async make(plainText) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hashSync(plainText, salt);
  }

  static async compare(plainText, hash) {
    return await bcrypt.compare(plainText, hash);
  }
}
