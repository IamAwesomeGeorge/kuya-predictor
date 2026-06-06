import type { AuthRequest } from "../../models/User";
import type { UserLoggedIn } from "../../models/User";
import { supabase } from "../../utils/supabase";

const USER_COLUMNS = "id, created_at, username, name, pfp_url";

async function getUserDetails(authRequest: AuthRequest) {
  const { data, error } = await supabase
    .from("users")
    .select(USER_COLUMNS)
    .eq("username", authRequest.username)
    .eq("password", authRequest.password);

  if (error) {
    console.error(error);
    throw new Error("Login failed");
  }

  if (!data || data.length === 0) {
    console.error("No user found with the provided credentials");
    throw new Error("Login failed");
  }

  return data[0];
}

// Log in user
export async function requestLogIn(authRequest: AuthRequest, setUser: (user: UserLoggedIn | null) => void) {
  const userDetails = await getUserDetails(authRequest);
  if (userDetails) {
    const user = { ...userDetails, password: authRequest.password };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    return user;
  }
}

export async function refreshUserData(user: UserLoggedIn | null, setUser: (user: UserLoggedIn | null) => void) {
  try {
    if (!user) return;
    await requestLogIn({ username: user.username, password: user.password }, setUser);
  } catch {
    console.log("needs to log out");
    // logOut(setUser, navigate);
  }
}
