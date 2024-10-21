import { useState } from 'react';
import { useLoginDataMutate } from "../../hooks/useLoginDataMutate";
import "./login.css";
import { LoginData } from '../../interface/LoginData';

export function LoginForm() {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const loginMutation = useLoginDataMutate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        const loginData: LoginData = { username, senha };
        loginMutation.mutate(loginData, {
            onError: () => {
                setErrorMessage('E-mail ou senha incorretos.');
            },
        });
    };

    return (
        <div className="login-page">
            <div className="login-content">
                <h1>Login</h1>
                <form id="login-form">
                    <label htmlFor="username">E-mail</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Seu e-mail"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="button"
                        id="login-btn"
                        value="Fazer login"
                        onClick={handleLogin}
                    />
                </form>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
}