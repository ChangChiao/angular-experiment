export interface ApiResponse {
  todos: Book[];
  total: number;
  skip: number;
  limit: number;
}

export interface Book {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
