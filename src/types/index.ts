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
};

export type AlertType = {
  title: string;
  description: string;
  status: "error" | "info" | "success" | "warning" | "loading" | undefined;
};
