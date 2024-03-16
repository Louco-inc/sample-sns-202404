export type User = {
	id: string,
	createdAt: Date,
	updatedAt: Date,
	nickname: string,
	email: string;
	password: string;
	uuid: string;
}

export type Post = {
	id: string,
	createdAt: Date,
	updatedAt: Date,
	content: string;
}