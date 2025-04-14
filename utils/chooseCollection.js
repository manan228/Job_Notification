import Orion from "../models/orion.model.js";
import Saviynt from "../models/saviynt.model.js";
import FloRecruit from "../models/floRecruit.model.js";

const chooseCollection = (collection) => {
  switch (collection) {
    case "orion":
      return Orion;
    case "saviynt":
      return Saviynt;
    case "floRecruit":
      return FloRecruit;
    default:
      throw new Error("Invalid collection name");
  }
};

export default chooseCollection;
