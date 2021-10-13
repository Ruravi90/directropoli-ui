import { CategoryImages } from "./category_images";

export interface Category {
  id?: string;
  name?: string;
  description?: string
  created_at?: string;
  updated_at?: string;
  category_images?: Array<CategoryImages>;
}
