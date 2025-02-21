import { model, Schema } from "mongoose";

const floRecruitSchema = new Schema({
  id: Number,
  title: String,
  openDate: Date,
  flag: { type: Boolean, default: true },
});

const FLORECRUIT = model("FLORECRUIT", floRecruitSchema);

export default FLORECRUIT;
