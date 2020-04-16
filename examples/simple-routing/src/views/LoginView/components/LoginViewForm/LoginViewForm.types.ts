export type LoginViewFormProps = {
  onSubmit: () => void;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  username: string;
};
