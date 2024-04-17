import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Box, Button, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import IErrors from "@/interfaces/IErrors";
import { Link } from "react-router-dom";

interface State {
  title: string;
  author: string;
  description: string;
  date: string;
}

interface Props {
  id: number;
  onSubmit: (id: number, data: FormData) => void;
  onCancel: () => void;
  errorFromForm: IErrors[];
  bookData: {
    id: number;
    title: string;
    author: string;
    description: string;
    date: string;
  };
}

const EditBookForm = (props: Props) => {
  const { bookData } = props;
  const [state, setState] = useState<State>({
    title: bookData.title,
    author: bookData.author,
    description: bookData.description,
    date: bookData.date,
  });

  useEffect(() => {
    setState({
      title: bookData.title,
      author: bookData.author,
      description: bookData.description,
      date: bookData.date,
    });
  }, [bookData]);

  const getErrorsBy = (name: string) => {
    const error = props.errorFromForm?.find(({ type }) => type === name);
    return error?.messages.join(",");
  };

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(state).forEach(([key, value]) => {
      formData.append(key, value);
    });

    props.onSubmit(props.id, formData);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleYearChange = (e: ChangeEvent<{ value: unknown }>) => {
    const selectedYear = e.target.value as string;
    setState((prevState) => ({
      ...prevState,
      date: selectedYear,
    }));
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
          />
        </Grid>

        <Grid item xs>
          <InputLabel id="year-label">Year</InputLabel>
          <Select
            labelId="year-label"
            id="year"
            value={state.date}
            onChange={handleYearChange}
            fullWidth
            variant="outlined"
            error={!!getErrorsBy("date")}
          >
            {Array.from({ length: 50 }, (_, index) => new Date().getFullYear() - index).map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">
            Update
          </Button>
          <Button component={Link} to={"/"}>Cancel</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditBookForm;