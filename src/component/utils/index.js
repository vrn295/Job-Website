import axios from "axios"
import { toast } from "react-toastify";

const TOKEN_KEY = 'jwt';
export const BASE_URL="https://jobs-api.squareboat.info/api/v1/"

export const login = (values, func) => {
	const data = values
	axios.post(BASE_URL + "/auth/login", data)
	.then((res)=>{
        toast.success("Login successfully")
		localStorage.setItem(TOKEN_KEY, res.data.data.token);
		func()
	})
    .catch((err) => {
        toast.error(err.response.data.message)
        console.log(err.response)
    })
}

export const setToken = (data) => {
    localStorage.setItem(TOKEN_KEY, data);
}
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}
export const AUTH_TOKEN = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return localStorage.getItem(TOKEN_KEY);
    }
    return false;
}