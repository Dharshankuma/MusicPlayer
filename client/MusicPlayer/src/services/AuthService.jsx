import axios from 'axios';

const baseURL = "http://localhost:3000/api/musicPlayer/";

const getHeaders = (body = null) => {
    const headers = {
        "Content-Type": "application/json"
    };
    if (body) {
        headers["Content-Type"] = "multipart/form-data";
    }
    return headers;
}


const handleErrors = (error) => {
    console.log(error)
    if (error.response) {
        return {
            success: false,
            message: error.response.data?.message || "Something went wrong",
            errors: error.response.data?.errors || null,
            status: error.response.status
        }

    }

    else if (error.request) {
        return {
            success: false,
            message: "No response received from the server. Please check your network connection.",
            errors: null,
            status: null
        };
    }
    else {
        return {
            success: false,
            message: error.message || "An unexpected error occured"
        };
    }
}

const PostServiceCall = async (apiName, postData) => {
    try {
        const response = await axios.post(baseURL + apiName, postData, {
            headers: getHeaders(postData)
        });
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return handleErrors(error);
    }
}


const GetServiceCall = async (apiName) => {
    try {
        const response = await axios.get(baseURL + apiName, {
            headers: getHeaders()
        });
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return handleErrors(error);
    }
}

const AuthService = {
    PostServiceCall,
    GetServiceCall
}

export default AuthService;
