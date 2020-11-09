import axios from "axios";

export const postHint = (hint, number) => {
  console.log("Posting Hint:", hint);

  let body = {
    hint: hint,
    number: number
  };

  let p = axios.post("/api/codenames", body, {
    headers: {
      "Content-Type": "application/json",
    }
  });

  return p
    .then(res => {
      console.log("Posted hint to to the backend!");
      console.log("RESPONSE", res);
      return res;
    })
    .catch(err => {
      console.log("Error", err);
    });
}