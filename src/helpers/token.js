
export const setToken = (token) => {
    if (token) window.sessionStorage.setItem('token', token)
}

export const getToken = () => window.sessionStorage.getItem('token')
export const deleteToken = () => window.sessionStorage.removeItem('token')