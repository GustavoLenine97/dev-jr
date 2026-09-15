import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../services/api'
import '../Tickets.css'
import socket from '../services/socket'

export default function Tickets() {
    const [tickets, setTickets] = useState([])
    const [message, setMessage] = useState('')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category_id, setCategory_id] = useState('')
    const [priority, setPriority] = useState('medium')
    const [editingId, setEditingId] = useState(null)

    const token = sessionStorage.getItem('accessToken')
    const user = jwtDecode(token)

    const [comments, setComments] = useState([])
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [comment, setComment] = useState('')

    async function loadTickets() {
        try {
            const response = await api.get('/tickets')

            setTickets(response.data)
        } catch (error) {
            console.error(error)

            setMessage(
                error.response?.data?.message ||
                'Erro ao carregar tickets'
            )
        }
    }

    function getStatusId(status) {
        const statuses = {
            'aberto': 1,
            'em andamento': 3,
            'resolvido': 4,
            'fechado': 5
        }

        return statuses[status?.toLowerCase()] || ''
    }

    function getTicketStats() {
        return {
            total: tickets.length,

            open: tickets.filter(
                (ticket) => ticket.status?.toLowerCase() === 'aberto'
            ).length,

            progress: tickets.filter(
                (ticket) => ticket.status?.toLowerCase() === 'em andamento'
            ).length,

            resolved: tickets.filter(
                (ticket) => ticket.status?.toLowerCase() === 'resolvido'
            ).length,

            closed: tickets.filter(
                (ticket) => ticket.status?.toLowerCase() === 'fechado'
            ).length
        }
    }

    const stats = getTicketStats()

    async function handleCreateTicket(event) {
        event.preventDefault()

        try {
            const response = await api.post('/tickets', {
                title,
                description,
                category_id,
                priority
            })

            setTitle('')
            setDescription('')
            setCategory_id('')
            setPriority('medium')
            setMessage('Ticket criado com sucesso!')

            await loadTickets()
        } catch (error) {
            console.error(error)

            setMessage(
                error.response?.data?.message ||
                'Erro ao criar ticket'
            )
        }
    }

    async function handleDeleteTicket(id) {
        try {
            await api.delete(`/tickets/${id}`)

            setMessage('Ticket excluído com sucesso!')

            await loadTickets()
        } catch (error) {
            console.log(error)

            setMessage(
                error.response?.data?.message ||
                'Erro ao excluir ticket'
            )
        }
    }

    function handleEditTicket(ticket) {
        console.log('Ticket para editar', ticket)
        setEditingId(ticket.id)
        setTitle(ticket.title)
        setDescription(ticket.description)
        setCategory_id(ticket.category_id)
        setPriority(ticket.priority)

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

        async function handleUpdateTicket(event) {
            event.preventDefault()

            try {
                await api.put(`/tickets/${editingId}`, {
                    title,
                    description,
                    priority,
                    category_id
                })

                setTitle('')
                setDescription('')
                setCategory_id('')
                setPriority('medium')
                setEditingId(null)

                setMessage('Ticket atualizado com sucesso!')

                await loadTickets()
            } catch (error) {
                console.error(error)

                setMessage(
                    error.response?.data?.message ||
                    'Erro ao atualizar ticket'
                )
            }
        }

    const handleSelectTicket = async (ticket) => {
        if (selectedTicket?.id === ticket.id) {
            setSelectedTicket(null)
            setComments([])
            return
        }
        setSelectedTicket(ticket)
        try {
            const response = await api.get(`/tickets/${ticket.id}/comments`)
            setComments(response.data)
        } catch (error) {
            console.error('Erro ao buscar comentários:', error)
        }
    }

    const handleCreateComment = async (event) => {
        event.preventDefault()

        if (!comment.trim()) {
            return
        }

        try {
            await api.post(
                `/tickets/${selectedTicket.id}/comments`,
                {
                    content: comment
                }
            )

            setComment('')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleUpdateStatus(id, statusId) {
        try {
            await api.patch(`/tickets/${id}/status`, {
                status_id: Number(statusId)
            })

            setMessage('Status atualizado com sucesso!')

            await loadTickets()
        } catch (error) {
            console.error(error)

            setMessage(
                error.response?.data?.message ||
                'Erro ao atualizar status'
            )
        }
    }

    function handleLogout() {
        sessionStorage.removeItem('accessToken')

        window.location.href = '/login'
    }

    function getStatusClass(status) {
        const normalizedStatus = status?.toLowerCase()

        if (normalizedStatus === 'aberto') {
            return 'status-open'
        }

        if (normalizedStatus === 'em andamento') {
            return 'status-progress'
        }

        if (normalizedStatus === 'resolvido') {
            return 'status-resolved'
        }

        if (normalizedStatus === 'fechado') {
            return 'status-closed'
        }

        return 'status-default'
    }

    function getStatusId(status) {
        const statuses = {
            'aberto': 1,
            'em andamento': 3,
            'resolvido': 4,
            'fechado': 5
        }

        return statuses[status?.toLowerCase()] || ''
    }

    useEffect(() => {
        loadTickets()
    }, [])

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Conectado ao Socket.IO:', socket.id)
        })

        return () => {
            socket.off('connect')
        }
    }, [])

    useEffect(() => {
        const handleTicketStatusUpdated = (updatedTicket) => {
            setTickets((currentTickets) =>
                currentTickets.map((ticket) =>
                    ticket.id === updatedTicket.id
                        ? updatedTicket
                        : ticket
                )
            )
        }

        const handleTicketCreated = (newTicket) => {
            setTickets((currentTickets) => [
                ...currentTickets,
                newTicket
            ])
        }

        const handleTicketDeleted = (deletedTicket) => {
            setTickets((currentTickets) =>
                currentTickets.filter(
                    (ticket) => ticket.id !== deletedTicket.id
                )
            )
        }

        const handleTicketUpdated = (updatedTicket) => {
            console.log('RECEBI ticket:updated:', updatedTicket)

            setTickets((currentTickets) =>
                currentTickets.map((ticket) =>
                    ticket.id === updatedTicket.id
                        ? updatedTicket
                        : ticket
                )
            )
        }

        const handleCommentCreated = (newComment) => {
            if (selectedTicket?.id !== newComment.ticket_id) {
                return
            }

            setComments((currentComments) => [
                ...currentComments,
                newComment
            ])
        }

        socket.on('ticket:statusUpdated', handleTicketStatusUpdated)
        socket.on('ticket:created', handleTicketCreated)
        socket.on('ticket:deleted', handleTicketDeleted)
        socket.on('ticket:updated', handleTicketUpdated)
        socket.on('comment:created', handleCommentCreated)

        return () => {
            socket.off('ticket:statusUpdated', handleTicketStatusUpdated)
            socket.off('ticket:created', handleTicketCreated)
            socket.off('ticket:deleted', handleTicketDeleted)
            socket.off('ticket:updated', handleTicketUpdated)
            socket.off('comment:created', handleCommentCreated)
        }
    }, [selectedTicket])

    console.log('selectedTicket:', selectedTicket)
    console.log('comments:', comments)

    return (
        <div className="tickets-page">

            <header className="topbar">

                <div className="brand">
                    <div className='brand-icon'>
                        HD
                    </div>

                    <div>
                        <h1> Help Desk</h1>
                        <span>Sistema de chamados</span>
                    </div>
                </div>

                <div className="user-area">
                    <div className="user-info">
                        <strong>{user.email}</strong>
                        <span>{user.role === 'admin' ? 'Administrador' : 'Cliente'}</span>
                    </div>

                    <button className='logout-button' type='button' onClick={handleLogout}>
                        Sair
                    </button>
                </div>

            </header>

            <main className='tickets-container'>

                <section className='welcome'>
                    <div>
                        <h2> Olá, {user.name}</h2>

                        <p>Gerencie seus chamados de suporte</p>
                    </div>

                    <div className='ticket-counter'>
                        <span>{tickets.length}</span>
                        <small>{tickets.length === 1 ? 'ticket' : 'tickets'}</small>
                    </div>
                </section>

                <div className="dashboard-stats">

                    <div className="stat-card">
                        <div className="stat-card-header">
                            <span>Total</span>
                            <div className="stat-icon">🎫</div>
                        </div>

                        <strong>{stats.total}</strong>

                        <small>Todos os chamados</small>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-header">
                            <span>Abertos</span>
                            <div className="stat-icon">📂</div>
                        </div>

                        <strong>{stats.open}</strong>

                        <small>Aguardando atendimento</small>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-header">
                            <span>Em andamento</span>
                            <div className="stat-icon">⚙️</div>
                        </div>

                        <strong>{stats.progress}</strong>

                        <small>Em atendimento</small>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-header">
                            <span>Resolvidos</span>
                            <div className="stat-icon">✓</div>
                        </div>

                        <strong>{stats.resolved}</strong>

                        <small>Problemas resolvidos</small>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-header">
                            <span>Fechados</span>
                            <div className="stat-icon">🔒</div>
                        </div>

                        <strong>{stats.closed}</strong>

                        <small>Chamados encerrados</small>
                    </div>

                </div>

                {message && (
                    <div className='message'>
                        {message}
                    </div>
                )}

                <div className='dashboard-grid'>
                    <section className='ticket-form-card'>
                        <div className='section-header'>
                            <div>
                                <span className='section-label'>
                                    {editingId ? 'EDITANDO' : 'NOVO CHAMADO'}
                                </span>

                                <h2>
                                    {editingId
                                        ? 'Editar Ticket'
                                        : 'Criar Ticket'
                                    }
                                </h2>
                            </div>
                        </div>

                        <form onSubmit={editingId ? handleUpdateTicket : handleCreateTicket} className='ticket-form'>
                            <div className='form-group'>
                                <label htmlFor="title">Título</label>

                                <input id="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder='Ex: Computador não liga' required />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='description'>
                                    Descrição
                                </label>

                                <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder='Descreva detalhadamente o problema...' rows="6" required />
                            </div>

                            <div className='form-group'>
                                <label className="status-select" htmlFor="category_id">Categoria</label>
                                <select className="status-select" name="category_id" id="category_id" value={category_id} onChange={(event) => setCategory_id(event.target.value)} required>
                                    <option value="" >Selecione uma categoria</option>
                                    <option value="5">Hardware</option>
                                    <option value="6">Software</option>
                                    <option value="7">Rede</option>
                                    <option value="8">Acesso</option>
                                    <option value="9">Impressora</option>
                                    <option value="10">Outro</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="status-select" htmlFor="priority">Prioridade</label>
                                <select className="status-select" id="priority" value={priority} onChange={(event) => setPriority(event.target.value)} required>
                                    <option value="low">Baixa</option>
                                    <option value="medium">Média</option>
                                    <option value="high">Alta</option>
                                    <option value="critical">Crítica</option>
                                </select>
                            </div>

                            <div className="form-buttons">
                                <button
                                    className="primary-button"
                                    type="submit"
                                >
                                    {editingId
                                        ? 'Salvar Alterações'
                                        : '+ Criar Ticket'}
                                </button>

                                {editingId && (
                                    <button
                                        className="cancel-button"
                                        type="button"
                                        onClick={() => {
                                            setEditingId(null)
                                            setTitle('')
                                            setDescription('')
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>

                        </form>

                    </section>

                    <section className="tickets-section">

                        <div className="section-header tickets-header">

                            <div>
                                <span className="section-label">
                                    CHAMADOS
                                </span>

                                <h2>Meus Tickets</h2>
                            </div>

                            <span className="total-tickets">
                                {tickets.length}
                            </span>

                        </div>

                        {tickets.length === 0 ? (

                            <div className="empty-state">

                                <div className="empty-icon">
                                    🎫
                                </div>

                                <h3>Nenhum ticket encontrado</h3>

                                <p>
                                    Crie seu primeiro chamado usando o formulário ao lado.
                                </p>

                            </div>

                        ) : (

                            <div className="tickets-list">

                                {tickets.map((ticket) => (

                                    <article className="ticket-card" key={ticket.id}>
                                        <div className="ticket-card-top">
                                            <span className="ticket-number">
                                                Ticket #{ticket.id}
                                            </span>

                                            <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                        </div>

                                        <div className="ticket-content">
                                            <h3>{ticket.title}</h3>

                                            <p className="ticket-description">
                                                {ticket.description}
                                            </p>

                                            <div className="ticket-info">
                                                <div className="ticket-info-item">
                                                    <span>Categoria</span>
                                                    <strong>{ticket.category}</strong>
                                                </div>

                                                <div className="ticket-info-item">
                                                    <span>Prioridade</span>
                                                    <strong>{ticket.priority}</strong>
                                                </div>

                                                <div className="ticket-info-item">
                                                    <span>Solicitante</span>
                                                    <strong>{ticket.user}</strong>
                                                </div>

                                                <div className="ticket-info-item">
                                                    <span>Comentários</span>
                                                    <button type="button" onClick={() => handleSelectTicket(ticket)}>{selectedTicket?.id === ticket.id ? 'Ocultar comentários' : 'Ver comentários'}</button>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="ticket-footer">
                                            {user.role === 'admin' && (
                                                <select className="status-select" value={getStatusId(ticket.status)} onChange={(event) => handleUpdateStatus(
                                                            ticket.id,
                                                            event.target.value
                                                        )}>
                                                    <option value="1">
                                                        Aberto
                                                    </option>

                                                    <option value="3">
                                                        Em andamento
                                                    </option>

                                                    <option value="4">
                                                        Resolvido
                                                    </option>

                                                    <option value="5">
                                                        Fechado
                                                    </option>
                                                </select>

                                            )}

                                            {selectedTicket?.id === ticket.id && (
                                                <div className="comments-section">

                                                    <h3>Comentários</h3>

                                                    {comments.length === 0 ? (
                                                        <p>Nenhum comentário neste ticket.</p>
                                                    ) : (
                                                        comments.map((comment) => (
                                                            <div className="comment">

                                                                <div className="comment-header">

                                                                    <div className="comment-avatar">
                                                                        {comment.user?.charAt(0).toUpperCase()}
                                                                    </div>

                                                                    <span className="comment-user">
                                                                        {comment.user}
                                                                    </span>

                                                                    <span className="comment-date">
                                                                        {new Date(
                                                                            comment.created_at
                                                                        ).toLocaleString('pt-BR')}
                                                                    </span>

                                                                </div>

                                                                <p>
                                                                    {comment.content}
                                                                </p>

                                                            </div>
                                                        ))
                                                    )}

                                                    <form
                                                        className="comment-form"
                                                        onSubmit={handleCreateComment}
                                                    >
                                                        <input
                                                            type="text"
                                                            value={comment}
                                                            onChange={(event) =>
                                                                setComment(event.target.value)
                                                            }
                                                            placeholder="Escreva um comentário..."
                                                        />

                                                        <button type="submit">
                                                            Comentar
                                                        </button>
                                                    </form>

                                                </div>
                                            )}

                                            <div className="ticket-actions">

                                                <button
                                                    className="edit-button"
                                                    type="button"
                                                    onClick={() =>
                                                        handleEditTicket(ticket)
                                                    }
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="delete-button"
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeleteTicket(ticket.id)
                                                    }
                                                >
                                                    Excluir
                                                </button>

                                            </div>

                                        </div>

                                    </article>

                                ))}

                            </div>

                        )}

                    </section>

                </div>

            </main>

        </div>

    )
}