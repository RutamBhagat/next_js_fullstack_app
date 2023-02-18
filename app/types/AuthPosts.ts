import { type PostType } from "./Posts";

export type AuthPostsType = {
  id: string;
  name: string;
  image: string;
  email: string;
  posts: PostType[];
};
