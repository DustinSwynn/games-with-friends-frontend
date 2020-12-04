import axios from "axios";

const baseProfileServerAddress = 'http://localhost:8080'; // "http://backend-dot-second-folio-294223.nn.r.appspot.com"

export const postLogin = ( name, nickname, email, id ) => {

  let body = {
    name: name,
    nickname: nickname,
    email: email,
    id: id
  };

  let p = axios.post(baseProfileServerAddress + "/api/profile", body, {
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

export const getUser = ( id ) => {

  let p = axios.get(baseProfileServerAddress + "/api/profile/history", {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      id: id
    }
  });

  return p
    .then(res => {
      console.log("Match history reponse:", res);
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const postFriend = ( id ) => {

  let body = {
    id: id
  };

  console.log("ID", id);

  let p = axios.post(baseProfileServerAddress + "/api/profile/friend", body, {
    headers: {
      "Content-Type": "application/json",
    }
  });

  return p
    .then(res => {
      console.log("Post Friend Response", res);
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};