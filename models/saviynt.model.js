import { model, Schema } from "mongoose";

const saviyntSchema = new Schema({
  id: String,
  position: String,
  hostedURL: String,
  flag: { type: Boolean, default: true },
});

const Saviynt = model("Saviynt", saviyntSchema);

export default Saviynt;
