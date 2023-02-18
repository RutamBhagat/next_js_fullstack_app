export type PostType = {
  id: string;
  title: string;
  createdAt: string;
  user: User;
  comments?: Comment[];
  published: boolean;
  updatedAt: string;
  userId: string;
};

type User = {
  id: string;
  name: string;
  image: string;
  email: string;
  emailVerified: string;
};

type Comment = {
  id: string;
  createdAt: string;
  postId: string;
  userId: string;
};
