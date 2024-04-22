import { Routes, Route, Link } from "react-router-dom";
import Assignment3 from "./a3";
import Assignment4 from "./a4";
import Assignment5 from "./a5";
import Nav from "../Nav";
import store from "./store";
import { Provider } from "react-redux";


function Labs() {
    return (

        <Provider store={store}>

        <div className="container-fluid">
            <Nav />
            <Routes>
                <Route path="/a3" element={<Assignment3 />} />
                <Route path="/a4"
                       element={<Assignment4/>}/>
                <Route path="/a5"
                       element={<Assignment5/>}/>


            </Routes>
        </div>
        </Provider>

    );
}
export default Labs;