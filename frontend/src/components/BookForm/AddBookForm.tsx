import { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import IErrors from "@/interfaces/IErrors";

interface State {
  title: string;
  author: string;
  description: string;
  date: string;
}

interface Props {
  onSubmit: (data: FormData) => void;
  errorFromForm: IErrors[];
}

const AddBookForm = (props: Props) => {
  const [state, setState] = useState<State>({
    title: "",
    author: "",
    description: "",
    date: "",
  });

  const getErrorsBy = (name: string) => {
    const error = props.errorFromForm.find(({ type }) => type === name);
    return error?.messages.join(",");
  };

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(state).forEach(([key, value]) => {
      formData.append(key, value);
    });

    props.onSubmit(formData);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <Box
      component={"form"}
      autoComplete="off"
      onSubmit={submitFormHandler}
      paddingY={2}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            id="title"
            label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            error={!!getErrorsBy("title")}
            helperText={getErrorsBy("title")}
          />
        </Grid>

        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            id="author"
            label="Author"
            value={state.author}
            onChange={inputChangeHandler}
            name="author"
            error={!!getErrorsBy("author")}
            helperText={getErrorsBy("author")}
          />
        </Grid>

        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            id="description"
            label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
            error={!!getErrorsBy("description")}
            helperText={getErrorsBy("description")}
          />
        </Grid>

        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            id="date"
            label="Date"
            value={state.date}
            onChange={inputChangeHandler}
            name="date"
            error={!!getErrorsBy("date")}
            helperText={getErrorsBy("date")}
            inputProps={{ pattern: "[0-9]*" }}
            InputProps={{ inputComponent: "input" as "input" }}
          />
        </Grid>

        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddBookForm;
