import { jwtDecode } from "jwt-decode";

export const getDecodedToken = () => {
  const token = localStorage.getItem("authToken").toString();
  if (token && token.startsWith("Bearer ")) {
    const jwtToken = token.split(" ")[1];
    try {
      return jwtDecode(jwtToken);
    } catch (error) {
      console.log("Invalid token", error);
      return null;
    }
  }
  return null;
};
