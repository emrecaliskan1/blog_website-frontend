export const PostWithAuth = async (url,body) => {
    const response = await fetch(url, {
        method:'POST',
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("tokenKey")
        },
        body: JSON.stringify(body)
    })
    return response
}

export const PostWithoutAuth = async (url,body) => {
    const response = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    })
    return response
}

export const PutWithAuth = async (url,body) => {
    const response = await fetch(url,{
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("tokenKey")
        },
        body: JSON.stringify(body)
    })
    return response
}

export const GetWithAuth = async (url) => {
    const response = await fetch(url,{
        method : "GET",
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("tokenKey")
        }
    })
    return response
}

export const RefreshToken = async () => {
    const response = await fetch("http://localhost:8080/auth/refresh",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            userId: localStorage.getItem("currentUser"),
            refreshToken : localStorage.getItem("refreshKey")
        })
    })
    return response;
}