
import './styleHome.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { Login } from './Login'
import Register from './Register'
import { AllApartments } from './AllApartments'

export const Routing = () => {
    return <>
        <Routes>
            <Route path={'/'} element={<Home></Home>}></Route>
            <Route path={'Home'} element={<Home></Home>}></Route>
            <Route path={'Login'} element={<Login></Login>}></Route>
            <Route path={'Register'} element={<Register></Register>}></Route>
            <Route path={'AllApartments'} element={<AllApartments></AllApartments>}></Route>
        </Routes>
    </>
}