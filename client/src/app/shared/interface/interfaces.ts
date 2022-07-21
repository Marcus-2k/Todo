export interface User {
  email: string;
  password: string;
}
export interface Category {
  name: string;
  imageSrc?: string;
  user?: string;
  _id?: string;
}
export interface Todo {
  name: string;
  condition: boolean;
  update: boolean;
  category: number;
  user?: string;
  _id?: string;
}
