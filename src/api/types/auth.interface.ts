export interface IRegisterUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface ILoginUset {
  email: string;
  password: string;
}

export interface IForgetPassword {
  email: string;
}
