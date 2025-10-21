import axios from "axios";
import type { LoginDto } from "../dto/LoginDto";
import type { RegisterDto } from "../dto/RegisterDto";
import type { ChangePasswordDto } from "../dto/ChangePasswordDto";

const AUTH_BACKEND_URL = 'http://localhost:8080/api/auth';


// /localhost:8080/api/auth/change-password
export const changePasswordApiCall = (changePasswordDto:ChangePasswordDto)=>
    axios.put(`${AUTH_BACKEND_URL}/change-password`,changePasswordDto);


export const registerApiCall = (registerDto:RegisterDto,accountType:string)=>
    axios.post(`${AUTH_BACKEND_URL}/register/${accountType}`,registerDto);

export const loginApiCall = (logindto:LoginDto)=>
    axios.post(`${AUTH_BACKEND_URL}/login`,logindto);
 

export const setToken = (token:string)=>{
    localStorage.setItem('token',token);
}

export const getToken = ()=>{
    return localStorage.getItem('token');
}

export const setLoggedInUser = (username:string)=>{
    sessionStorage.setItem('username',username);
}
export const getLoggedInUser = ()=>{
    return sessionStorage.getItem('username');
}

export const getLoggedInUserRole = ()=>{
    return sessionStorage.getItem('role');
}

export const setLoggedInUserRole = (role:string)=>{
    sessionStorage.setItem('role',role);
}

export const logoutApiCall = ()=>{
    localStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
}

export const isTraveller = ()=>{
    const role = getLoggedInUserRole();
    if(role){
        return role.trim() === 'ROLE_TRAVELLER';
    }
    return false;
}

export const isGuide = () => {
  const role = getLoggedInUserRole();
  console.log("Current role =>", role); 
  if (role) {
    return role.trim().toUpperCase() === "ROLE_GUIDE";
  }
  return false;
};


export const isSiteOwner = ()=>{
    const role = getLoggedInUserRole();
    
    if(role){
        return role.trim() === 'ROLE_SITE_OWNER';
    }
    return false;
}

export const isLogin = ()=> getLoggedInUser() !== null;
console.log(isLogin());



