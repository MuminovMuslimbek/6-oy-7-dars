import { Routes, Route, NavLink, Link } from 'react-router-dom';
import NumberOne from './pages/NumberOne'
import NumberTwo from './pages/NumberTwo'
import NumberThree from './pages/NumberThree'
import ErrorPage from './pages/ErrorPage'

const App = () => {
    return (
        <div>
            <header className=' bg-blue-500'>
                <div className='max-w-[1200px] w-full mx-auto flex justify-between items-center py-4'>
                    <h1 className='text-white text-[28px] cursor-pointer select-none'>LOGO</h1>
                    <ul className='flex justify-between max-w-[450px] w-full capitalize text-white text-[17px]'>
                        <NavLink to='/' className='hover:underline'>Birinchi vazifa</NavLink>
                        <NavLink to='/NumberTwo' className='hover:underline'>Ikkinchi vazifa</NavLink>
                        <NavLink to='/NumberThree' className='hover:underline'>Uchinchi vazifa</NavLink>
                    </ul>
                    <button className='text-blue-500 text-[18px] rounded-md capitalize bg-white px-[10px] py-[5px]'>Sing up</button>
                </div>
            </header>
            <Routes>
                <Route path='/' element={<NumberOne />}></Route>
                <Route path='/NumberTwo' element={<NumberTwo />}></Route>
                <Route path='/NumberThree' element={<NumberThree />}></Route>
                <Route path='*' element={<ErrorPage />}></Route>
            </Routes>
        </div>
    )
}

export default App
