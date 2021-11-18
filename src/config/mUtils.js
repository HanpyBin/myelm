export const getLocal = (name)=>{
    if (!name)
        return;
    return window.localStorage.getItem(name);
}



export const setLocal = (key, value) => {
    if (!key)
        return;
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
}

export const removeLocal = (name) => {
    if (!name)
        return;
    window.localStorage.removeItem(name);
}