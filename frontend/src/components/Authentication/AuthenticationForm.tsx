import InputElement from '@/components/UI/InputElement/InputElement';
import IErrors from '@/interfaces/IErrors';
import { Box, Button } from '@mui/material';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

interface Props {
  authMethod: "register" | "login";
  submitCallback: (inputValues: InputsState) => Promise<void>;
  errors: IErrors[];
};

interface InputsState {
  username: string,
  password: string,
};

const initialAuthInputs: InputsState = {
  username: "",
  password: "",
};

const AuthenticationForm = ({ authMethod, errors, submitCallback }: Props) => {
  const [inputs, setInputs] = useState<InputsState>(initialAuthInputs);

  const getErrorsBy = (name: string) => {
    const error = errors.find(({ type }) => type === name);
    return error?.messages.join(",");
  };

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      const formData: InputsState = {
        username: inputs.username.trim(),
        password: inputs.password.trim(),
      };
      await submitCallback(formData);

      setInputs(initialAuthInputs);
    } catch (err) { }
  };

  return (
    <Box
      component="form"
      onSubmit={submitFormHandler}
      noValidate
      sx={{ mt: 1 }}
    >
      <InputElement
        autoFocus
        required
        label="Login"
        name="username"
        value={inputs.username}
        onChange={inputChangeHandler}
        error={getErrorsBy("username")}
      />
      <InputElement
        required
        name="password"
        label="Password"
        type="password"
        value={inputs.password}
        onChange={inputChangeHandler}
        error={getErrorsBy("password")}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {authMethod === "register" ? "Sign up" : "Sign in"}
      </Button>
    </Box>
  )
};

export default AuthenticationForm;