export interface IUsers {
  _id?: string;
  name: string;
  age: number;
}

export interface IEmployees {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  education: string;
  dob: Date;
  experience: number;
}

export interface IAdmin {
  username: string;
  password: string;
}
