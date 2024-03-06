
import axios from "axios"
//שליפות

export const GetMyApartments = (id) => {
    const token = localStorage.getItem('token')
    return axios.get(`http://localhost:3001/apartment/getByAdvertiser/${id}`,{headers:{'Authorization': token}})
}

export const getByCity = (id) => {
    const token = localStorage.getItem('token')
    return axios.get(`http://localhost:3001/apartment/getByCity/${id}`,{headers:{'Authorization': token}})
}

export const getByCategory = (id) => {
    const token = localStorage.getItem('token')
    return axios.get(`http://localhost:3001/apartment/getByCategory/${id}`, {headers:{'Authorization': token}})
}

export const getByPrice = (x) => {
    const token = localStorage.getItem('token')
    return axios.get(`http://localhost:3001/apartment/getByPriceLittle/${x}`, {headers:{'Authorization': token}})
}

export const getByBed = (x) => {
    const token = localStorage.getItem('token')
    return axios.get(`http://localhost:3001/apartment/getByNumerBedBig/${x}`, {headers:{'Authorization': token}})
}

//פונקציות על דירה

export const deleteApartment = (id, idApartment) => {
    debugger
    const token = localStorage.getItem('token')
    return axios.delete(`http://localhost:3001/apartment/remove/${id}/${idApartment}`, {headers:{'Authorization': token}})//,Headers[{'authorization':token}]
}

export const updateApartment = (id, idApartment) => {
    const token = localStorage.getItem('token')
    return axios.patch(`http://localhost:3001/apartment/update/${id}/${idApartment}`, {headers:{'Authorization': token}})//,Headers[{'authorization':token}]
}

export const addApartment = (id, apartment) => {
    debugger
    const token = localStorage.getItem('token')

    const formData = new FormData();
    formData.append('name', apartment.name);
    formData.append('decreption', apartment.decreption);
    formData.append('image', apartment.image);
    formData.append('codeCategory', apartment.codeCategory);
    formData.append('codeCity', apartment.codeCity);
    formData.append('address', apartment.address);
    formData.append('numberBed', apartment.numberBed);
    formData.append('addition', apartment.addition);
    formData.append('price', apartment.price);
    formData.append('codeAdvertiser', apartment.codeAdvertiser);
    return axios.post(`http://localhost:3001/apartment/add/${id}`,formData,{headers:{'Authorization': token,'Content-Type':'application/x-www-form-urlencoded'}})//,Headers[{'authorization':token}]
}

//הוספת קטגוריה

export const addCategory = (id, category) => {
    debugger
    const token = localStorage.getItem('token')
    return axios.post(`http://localhost:3001/category/add/${id}`,category, {headers:{'Authorization': token}})
}
// הוספת עיר
export const addCity = (id, city) => {
    debugger
    const token = localStorage.getItem('token')
    return axios.post(`http://localhost:3001/city/add/${id}`,city, {headers:{'Authorization': token}})
}
// סיסמה חד פעמית
export const password2 = (email,p) => {
    debugger
    const token = localStorage.getItem('token')
    const pass2={
        email:email,
        pass:p
    }
    return axios.post(`http://localhost:3001/advertiser/getPass`,pass2, {headers:{'Authorization': token}})
}
// הזמנת דירה
export const order2 = (email,a) => {
    debugger
    const token = localStorage.getItem('token')
    const pass2={
        email:email,
        apartment:a
    }
    return axios.post(`http://localhost:3001/customer/order`,pass2,{headers:{'Authorization': token}})
}
// קבלת טוקן לסיסמה חד פעמית
export const token =()=>{
    return axios.get(`http://localhost:3001/advertiser/token`)
}
// כל המפרסמים
export const allAdvertiser= () => {
    return axios.get(`http://localhost:3001/advertiser/getAll`)
}
// מזג אויר
export const tempe= (id) => {
    return axios.get(`http://localhost:3001/city/temp/${id}`)
}