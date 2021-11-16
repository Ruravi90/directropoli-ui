import { NULL_EXPR } from "@angular/compiler/src/output/output_ast";
import { MemberImages } from "./member_images";
import { Promotion } from "./promotion";
export class Member {
  id?: number|null;
  name?: string;
  short_description?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  whatsapp?: string;
  description?: string;
  manager?: string;
  job_possion?: string;
  address?: string;
  email?: string;
  phone?: string;
  directory_id?: number;
  category_id?: number;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  shared_code?: string;
  images?: Array<MemberImages>;
  promotions?: Array<Promotion>;
}
