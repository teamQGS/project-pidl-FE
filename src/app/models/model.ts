export class UserDTO {
  id: number|null;
  username: string;
  email: string;
  password: string;


  constructor(id: number | null, username: string, email: string, password: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
