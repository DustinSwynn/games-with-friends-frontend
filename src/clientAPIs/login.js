import axios from "axios";

export const postLogin = ( name, nickname, email, id ) => {

  let body = {
    name: name,
    nickname: nickname,
    email: email,
    id: id
  };

  let p = axios.post("/api/login", body, {
    headers: {
      "Content-Type": "application/json",
    }
  });

  return p
    .then(res => {
      console.log("Login Response:", res);
      return res;
    })
    .catch(err => {
      console.log("Error", err);
    });
};