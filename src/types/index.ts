export type User = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  nickname: string;
  email: string;
  password: string;
  uuid: string;
};

export type Post = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  userId: number;
  user: User;
  comments: Comment[];
  favorites: Favorite[];
};

export type Comment = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  userId: number;
  user: User;
  postId: number;
  post: Post;
  favorites: CommentFavorite[];
};

export type Favorite = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: User;
  postId: number;
  post: Post;
};

export type CommentFavorite = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: User;
  commentId: number;
  comment: Comment;
}

export type AlertType = {
  title: string;
  description: string;
  status: "error" | "info" | "success" | "warning" | "loading" | undefined;
};
