type gender = 'male' | 'female';

interface IUser {
  username: string;
  email: string;
  password: string;
  sex: gender;
  newsletter: boolean;
}


export {
  gender,
  IUser
}