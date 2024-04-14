export class UserDTO {
  id: number|null;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;


  constructor(id: number | null, username: string, email: string, password: string, firstName: string, lastName: string, address: string, phoneNumber: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }
}

