import type { AuthRequest } from "../../models/User";
import { supabase } from "../../utils/supabase";

// Log in user
export async function RequestLogIn(authRequest: AuthRequest) {
  const { data, error } = await supabase
    .from("users")
    .select("id, created_at, username, name")
    .eq("username", authRequest.username)
    .eq("password", authRequest.password);

  if (error) {
    console.error(error);
    return;
  }

  if (data && data.length > 0) {
    const user = data[0];
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
}
