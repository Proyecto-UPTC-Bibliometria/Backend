import mongoose from "mongoose";

export default interface ModelDocument<T extends Document>
  extends mongoose.PaginateModel<T> {}
