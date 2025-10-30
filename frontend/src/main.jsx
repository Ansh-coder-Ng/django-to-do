
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage  from './page/LoginPage.jsx'
import App from './App.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <Routes>

            <Route path='/' element={<LoginPage/>}></Route>


            <Route element={<ProtectedRoutes/>}>
                <Route path='/main' element={<App/>}></Route>     
            </Route>
          

        </Routes>
    </BrowserRouter>
   
)
