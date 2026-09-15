import { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        setMessage('')
        setLoading(true)

        try {
            const response = await api.post('/auth/login', {
                email,
                password
            })

            sessionStorage.setItem(
                'accessToken',
                response.data.accessToken
            )

            navigate('/tickets')
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                'E-mail ou senha inválidos'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 lg:flex">

            {/* PAINEL ESQUERDO */}
            <section className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-700 to-blue-900 lg:flex lg:w-[52%]">

                {/* Decorações */}
                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
                <div className="absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-indigo-400/20 blur-3xl" />

                <div className="relative z-10 flex w-full flex-col justify-between p-14 xl:p-20">

                    {/* LOGO */}
                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-6 w-6 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 13a8 8 0 0116 0v3a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h1M4 13v3a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H4"
                                />
                            </svg>
                        </div>

                        <span className="text-2xl font-bold tracking-tight text-white">
                            Help Desk
                        </span>

                    </div>

                    {/* CONTEÚDO */}
                    <div className="max-w-xl">

                        <div className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                                Central de atendimento
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-6xl">
                            Resolva chamados.
                            <br />
                            <span className="text-blue-200">
                                Organize seu atendimento.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-lg text-base leading-7 text-blue-100 xl:text-lg">
                            Tenha controle dos seus chamados, acompanhe
                            solicitações e mantenha sua equipe conectada
                            em um único lugar.
                        </p>

                        {/* CARDS */}
                        <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">

                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="h-5 w-5 text-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v6l4 2"
                                        />
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="9"
                                        />
                                    </svg>
                                </div>

                                <p className="font-semibold text-white">
                                    Agilidade
                                </p>

                                <p className="mt-1 text-xs text-blue-200">
                                    Resolva mais rápido
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="h-5 w-5 text-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h10"
                                        />
                                    </svg>
                                </div>

                                <p className="font-semibold text-white">
                                    Organização
                                </p>

                                <p className="mt-1 text-xs text-blue-200">
                                    Tudo em um só lugar
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="h-5 w-5 text-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 12l4 4L19 6"
                                        />
                                    </svg>
                                </div>

                                <p className="font-semibold text-white">
                                    Controle
                                </p>

                                <p className="mt-1 text-xs text-blue-200">
                                    Acompanhe cada chamado
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* RODAPÉ */}
                    <p className="text-sm text-blue-200">
                        © 2026 Help Desk
                    </p>

                </div>
            </section>

            {/* PAINEL DIREITO */}
            <section className="flex min-h-screen w-full items-center justify-center px-6 py-12 lg:w-[48%]">

                <div className="w-full max-w-md">

                    {/* LOGO MOBILE */}
                    <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-6 w-6 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 13a8 8 0 0116 0v3a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h1M4 13v3a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H4"
                                />
                            </svg>
                        </div>

                        <span className="text-2xl font-bold text-white">
                            Help Desk
                        </span>

                    </div>

                    {/* CABEÇALHO */}
                    <div className="mb-9">

                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
                            Bem-vindo de volta
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight text-white">
                            Entre na sua conta
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-slate-400">
                            Informe seus dados para acessar o sistema
                            de atendimento.
                        </p>

                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* EMAIL */}
                        <div>

                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                E-mail
                            </label>

                            <div className="relative">

                                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="h-5 w-5 text-slate-500"
                                    >
                                        <rect
                                            width="20"
                                            height="16"
                                            x="2"
                                            y="4"
                                            rx="2"
                                        />
                                        <path
                                            d="M22 7l-10 6L2 7"
                                        />
                                    </svg>
                                </div>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="seu@email.com"
                                    required
                                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3.5 pl-12 pr-4 text-white placeholder-slate-600 outline-none transition duration-200 focus:border-blue-500 focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10"
                                />

                            </div>

                        </div>

                        {/* SENHA */}
                        <div>

                            <div className="mb-2 flex items-center justify-between">

                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Senha
                                </label>

                                <button
                                    type="button"
                                    className="text-xs font-medium text-blue-500 transition hover:text-blue-400"
                                >
                                    Esqueceu a senha?
                                </button>

                            </div>

                            <div className="relative">

                                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="h-5 w-5 text-slate-500"
                                    >
                                        <rect
                                            width="18"
                                            height="11"
                                            x="3"
                                            y="11"
                                            rx="2"
                                        />
                                        <path
                                            d="M7 11V7a5 5 0 0110 0v4"
                                        />
                                    </svg>
                                </div>

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="Digite sua senha"
                                    required
                                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3.5 pl-12 pr-24 text-white placeholder-slate-600 outline-none transition duration-200 focus:border-blue-500 focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 transition hover:text-white"
                                >
                                    {showPassword
                                        ? 'Ocultar'
                                        : 'Mostrar'}
                                </button>

                            </div>

                        </div>

                        {/* ERRO */}
                        {message && (
                            <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="mt-0.5 h-5 w-5 shrink-0 text-red-400"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="9"
                                    />
                                    <path d="M12 8v4M12 16h.01" />
                                </svg>

                                <p className="text-sm text-red-400">
                                    {message}
                                </p>

                            </div>
                        )}

                        {/* BOTÃO */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-600/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {loading ? (
                                <>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Entrando...
                                </>
                            ) : (
                                <>
                                    Entrar

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 12h14M13 6l6 6-6 6"
                                        />
                                    </svg>
                                </>
                            )}

                        </button>

                    </form>

                    {/* SEGURANÇA */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4"
                        >
                            <rect
                                width="18"
                                height="11"
                                x="3"
                                y="11"
                                rx="2"
                            />
                            <path
                                d="M7 11V7a5 5 0 0110 0v4"
                            />
                        </svg>

                        <span>
                            Conexão segura e dados protegidos
                        </span>

                    </div>

                </div>

            </section>

        </div>
    )
}