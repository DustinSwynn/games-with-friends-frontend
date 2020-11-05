import axios from "axios";

export const postLogin = ( name, nickname, email, id ) => {
  console.log(`name ${name}, nickname ${nickname}, email ${email}, id ${id}`);

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
      console.log("Posted login to to the backend!");
      console.log("RESPONSE", res);
      return res;
    })
    .catch(err => {
      console.log("Error", err);
    });
};