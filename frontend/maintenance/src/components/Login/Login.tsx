import { Box, Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { COLORS, GRADIENT } from "../../shared/common/constants";

type Props = {
  setToken: any; //React.Dispatch<React.SetStateAction<undefined>>;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

async function loginUser(credentials: LoginFormValues) {
  /* return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());*/
}

const Login = ({ setToken }: Props) => {
  const { handleSubmit, control } = useForm<LoginFormValues>();

  const onSubmit = async (values: LoginFormValues) => {
    /*const token = await loginUser({
      username: values.username,
      password: values.password,
    });
    */
    setToken(values);
  };

  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        verticalAlign: "center",
        background: GRADIENT,
      }}
    >
      <Box
        style={{
          marginTop: "20%",
          background: COLORS.white,
          height: 180,
          width: 300,
          borderRadius: 20,
          textAlign: "center",
          padding: 20,
        }}
      >
        <Box style={{ textAlign: "center", width: "30%", marginBottom: 10 }}>
          <Typography
            style={{
              width: "100%",
              fontWeight: 400,
              fontSize: 22,
              background: GRADIENT,
              color: COLORS.white,
              borderRadius: 10,
            }}
          >
            {"Sign in"}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Controller
            control={control}
            name="email"
            defaultValue={""}
            rules={{
              required: true,
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={"username"}
                error={!!fieldState.error}
                InputLabelProps={{ required: true }}
                // onChange={(e) => setUserName(e.target.value)}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            defaultValue={""}
            rules={{
              required: "A mező kitöltése kötelező!",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={"password"}
                type="password"
                error={!!fieldState.error}
                InputLabelProps={{ required: true }}
                // onChange={(e) => setPassword(e.target.value)}
              />
            )}
          />
          <Box
            style={{
              textAlign: "center",
              width: "100%",
              marginTop: 40,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" type="submit">
              {"Login"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
