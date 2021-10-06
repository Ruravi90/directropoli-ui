import { DirectoryImages } from "./directory_images";
import { Member } from "./member";

export class Directory {
  id?: string;
  name?: string;
  description?: string;
  user_id?: string;
  role_id?: string;
  created_at?: string;
  updated_at?: string;
  images?: Array<DirectoryImages>;
  members?: Array<Member>;
}
