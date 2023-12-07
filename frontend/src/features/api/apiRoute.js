import axios from 'axios';

// Create an Axios instance with a baseURL
const API = axios.create({
  baseURL: 'http://localhost:7000',
});

API.interceptors.request.use( (req) =>{

    const user = JSON.parse(localStorage.getItem("user"));
    req.headers["Content-Type"] ="application/json";

    if(user){
        req.headers["Authorization"] =`bearer ${user.token}`;
    }

    return req;

 
 });
  

API.interceptors.response.use( (res) => res);


export const apiShowTasks = (payload) => API.get("api/tasks");
export const apiAddTask = (payload) => API.post("api/tasks", payload);
export const apiDeleteTask = (payload) => API.delete(`api/tasks/${payload}`);
export const apiUpdateTask = (payload) => API.patch(`api/tasks/${payload._id}`, payload);


 export const apiLogin = (payload) => API.post("/api/user/login", payload);
 export const apiSignup = (payload) => API.post("/api/user/signup", payload);


 export default API