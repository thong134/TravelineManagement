import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/images/logo_traveline.png'
import './Auth.css'

export default function Auth() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleLogin = () => {
        console.log(username, password)
        window.electron.ipcRenderer.send('resize-window')
        navigate('/dashboard')
    }
    return (
        <>
            <div className="auth">
                <div className="auth__form">
                    <h1 className="auth__title">Đăng nhập</h1>
                    <div className="auth__form-content">
                        <div className="auth__form-group">
                            <label htmlFor="username">Tên đăng nhập</label>
                            <div className="auth__form-input">
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Tên đăng nhập"
                                />
                            </div>
                        </div>
                        <div className="auth__form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <div className="auth__form-input">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mật khẩu"
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    color={showPassword ? '#5030e5' : '#7D848D'}
                                    className="auth__form-icon"
                                    onClick={handleShowPassword}
                                />
                            </div>
                        </div>
                    </div>
                    <button className="auth__button" onClick={handleLogin}>
                        <p>Đăng nhập</p>
                    </button>
                </div>
                <div className="auth__image-container">
                    <div className="auth__image-content">
                        <img src={logo} alt="logo" className="auth__image" />
                        <h1 className="auth__image-title">Traveline</h1>
                        <p className="auth__image-subtitle">Vietnam in your mind</p>
                    </div>
                </div>
            </div>
        </>
    )
}
