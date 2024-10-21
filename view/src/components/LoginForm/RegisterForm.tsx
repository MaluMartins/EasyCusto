import { useState } from 'react';
import { useRegisterDataMutate } from "../../hooks/useRegisterDataMutate";
import "./login.css";
import { LoginData } from '../../interface/LoginData';

export function RegisterForm() {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const registerMutation = useRegisterDataMutate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        const loginData: LoginData = { username, senha };
        registerMutation.mutate(loginData, {
            onError: (error) => {
                if (error.response.data == "Nome de usuário já está sendo usado.") {
                    setErrorMessage('Esse e-mail já está sendo usado.');
                }
                if (error.response.data == "A senha deve ter pelo menos 8 caracteres") {
                    setErrorMessage("A senha deve ter pelo menos 8 caracteres.");
                }
                // if (error.response.status == 403) {
                //     setErrorMessage("Preencha todos os campos para continuar.");
                // }
            },
        });
    };

    return (
        <div className="login-page">
            <div className="login-content">
                <h1>Crie uma conta</h1>
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
                        value="Criar conta"
                        onClick={handleRegister}
                    />
                </form>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
}