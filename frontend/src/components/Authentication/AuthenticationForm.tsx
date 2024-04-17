import InputElement from '@/components/UI/InputElement/InputElement';
import IErrors from '@/interfaces/IErrors';
import { Box, Button, Typography } from '@mui/material';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

interface Props {
  authMethod: "register" | "login";
  submitCallback: (inputValues: InputsState) => Promise<void>;
  errors: IErrors[];
};

interface InputsState {
  username: string,
  password: string,
  confirmPassword: string;
};

const initialAuthInputs: InputsState = {
  username: "",
  password: "",
  confirmPassword: "",
};

const AuthenticationForm = ({ authMethod, errors, submitCallback }: Props) => {
  const [inputs, setInputs] = useState<InputsState>(initialAuthInputs);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const getErrorsBy = (name: string) => {
    const error = errors.find(({ type }) => type === name);
    return error?.messages.join(",");
  };

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));

    if (name === "confirmPassword") {
      setConfirmPasswordError("");
    }
  };

  const submitFormHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      const formData: InputsState = {
        username: inputs.username.trim(),
        password: inputs.password.trim(),
        confirmPassword: inputs.confirmPassword.trim(),
      };

      if (authMethod === "register" && formData.password !== formData.confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        return;
      }

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
      {authMethod === "register" && (
        <>
          <InputElement
            required
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={inputs.confirmPassword}
            onChange={inputChangeHandler}
            error={getErrorsBy("password")}
          />
          {confirmPasswordError && (
            <Typography color="error">{confirmPasswordError}</Typography>
          )}
        </>
      )}
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