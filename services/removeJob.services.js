import { Types } from "mongoose";
import chooseCollection from "../utils/chooseCollection.js";

const markJobFalse = async (mongoJobId, collectionName) => {
  try {
    const collection = chooseCollection(collectionName);

    await collection.updateOne(
      { _id: new Types.ObjectId(mongoJobId) },
      { $set: { flag: false } }
    );
  } catch (err) {
    console.log(err);
  }
};

export default markJobFalse;
