import axios from 'axios';

let apiInstance = axios.create({
  baseURL: "https://whispering-bastion-31600.herokuapp.com/api/",
  headers: {
    "Authorization": "Bearer",
    // "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ1YWIyM2VlZmIwZWYwMDE3MWE4MjZiIn0sImlhdCI6MTU2NjU1MTIwNiwiZXhwIjoxNTY2NTU0ODA2fQ.fu8pMfSzmocDUvBtAvqNpkGtuGnO6NB_eSCZmcTC3tI"
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ1YWIyM2VlZmIwZWYwMDE3MWE4MjZiIn0sImlhdCI6MTU2NjQyMTg4MywiZXhwIjoxNTY2NDI1NDgzfQ.hi-8aPatPpxF-CF77Q7PB_SntnmE6JviXahOpoZuHco"
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ1YWIyM2VlZmIwZWYwMDE3MWE4MjZiIn0sImlhdCI6MTU2NjI0MjU2NSwiZXhwIjoxNTY2NjAyNTY1fQ.KSbn-GNq_XToFykTzxL9fgUrGI4FFlt3YqWRsFEOvCs"
  }
});

export const setHeader = (AUTH_TOKEN) => {
  if(apiInstance.defaults.headers.common["x-auth-token"]){
    apiInstance.defaults.headers.common["x-auth-token"] = '';
    delete apiInstance.defaults.headers.common["x-auth-token"];
  }
  apiInstance.defaults.headers.common["x-auth-token"] = AUTH_TOKEN;
};

export const getHeaders = (AUTH_TOKEN) => {
  return {
    'x-auth-token': AUTH_TOKEN
  }
}

// export default axios.create({
//   baseURL: "https://whispering-bastion-31600.herokuapp.com/api/",
//   headers: {
//     "Authorization": "Bearer",
//     "x-auth-token": ""
//       // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ1YWIyM2VlZmIwZWYwMDE3MWE4MjZiIn0sImlhdCI6MTU2NjI0MjU2NSwiZXhwIjoxNTY2NjAyNTY1fQ.KSbn-GNq_XToFykTzxL9fgUrGI4FFlt3YqWRsFEOvCs"
//   }
// });

export default apiInstance;