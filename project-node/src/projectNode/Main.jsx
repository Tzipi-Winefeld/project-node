
import { Provider} from 'react-redux'
import { Routing } from "./Routing"
import { Nav } from "./Nav"
import { BrowserRouter } from "react-router-dom";
import store from "./redux/Store";
import './styleHome.css'

export const Main = () => {

    return <>
        <Provider store={store}>
            <BrowserRouter>
                <Nav></Nav>
                <Routing></Routing>
            </BrowserRouter>
        </Provider>
    </>
}