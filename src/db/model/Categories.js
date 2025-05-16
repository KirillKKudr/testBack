import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

const Category = model('Category', categorySchema);

export default Category;
