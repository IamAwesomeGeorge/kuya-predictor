import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Alert, Box, Card, FormControl, FormLabel, TextField } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import type { User } from "../models/User";
import { useNavigate } from "@tanstack/react-router";
import { RequestLogIn } from "../components/utils/LogInUtils";

export default function LogIn() {
  const [failed, setFailed] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current user:", user);
    if (user) {
      navigate({ to: "/" });
    }
  }, [user, navigate]);

  const { mutate: sendLogIn } = useMutation({
    mutationFn: async () => {
      setFailed(false);
      const usernameInput = document.getElementById("username") as HTMLInputElement;
      const passwordInput = document.getElementById("password") as HTMLInputElement;
      const authRequest = {
        username: usernameInput?.value || "",
        password: passwordInput?.value || "",
      };
      const user = await RequestLogIn(authRequest);
      if (!user) {
        throw new Error("Login failed");
      }
      return user;
    },
    onError: () => setFailed(true),
    onSuccess: (data: User) => {
      console.log("Login successful:", data);
      setUser(data);
      navigate({ to: "/" });
    },
  });

  return (
    <>
      <Card variant="outlined" sx={{ backgroundColor: "#666666", color: "black", padding: 3 }}>
        {/* <Logo height="4em" padding="0.5em" /> */}
        <h1>Login</h1>
        <h3>
          Welcome user!
          <br />
          Please log in to continue
        </h3>
        <Box
          component="form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            sendLogIn();
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              id="username"
              type="text"
              name="username"
              placeholder="john_smith"
              autoComplete="username"
              autoFocus
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Log in
          </Button>
        </Box>
        {failed && (
          <Alert data-testid="login-error" severity="error" sx={{ mt: 2 }}>
            Login failed. Please check your credentials and try again.
          </Alert>
        )}
      </Card>
    </>
  );
}
