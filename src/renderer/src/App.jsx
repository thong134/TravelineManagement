import { HashRouter, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'
import MainLayout from './layout/MainLayout'

function App() {
    const ipcHandle = () => window.electron.ipcRenderer.send('ping')

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/dashboard" element={<MainLayout />}>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </HashRouter>
        </>
    )
}

export default App
