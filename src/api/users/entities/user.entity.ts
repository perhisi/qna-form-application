export class User {
  id: number;
  email: string;
  password?: string;
  username?: string;
  createdAt: Date;

  // relations
  threads?: any[]; // Thread[]
}
