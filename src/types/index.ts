export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  nickname: string;
  email: string;
  password: string;
  uuid: string;
};

export type Post = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  userId: number;
  user: User;
  comments: Comment[];
  favorites: Favorite[];
};

export type Comment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  userId: number;
  user: User;
  postId: number;
  post: Post;
};

export type Favorite = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: User;
  postId: number;
  post: Post;
};

export type AlertType = {
  title: string;
  description: string;
  status: "error" | "info" | "success" | "warning" | "loading" | undefined;
};
