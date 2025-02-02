import { model, Schema } from "mongoose";

const orionSchema = new Schema({
  id: Number,
  title: String,
  link: String,
  flag: { type: Boolean, default: true },
});

const Orion = model("Orion", orionSchema);

export default Orion;
