import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

// React 

function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    // const usersFromApi = await api.get
    //users = await api.get('/usuarios/todos')
    const usersFromApi = await api.get('/usuarios/todos')

    setUsers(usersFromApi.data)

    console.log(users)
  }

  async function createtUsers() {
    await api.post('/usuarios/cadastro',{
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    })

    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/deletar/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name='nome' type='text' ref={inputName}></input>
        <input placeholder="Idade" name='idade' type='number' ref={inputAge}></input>
        <input placeholder="E-mail" name='email' type='email' ref={inputEmail}></input>
        <button type='button' onClick={createtUsers}>Cadastrar</button>
      </form>


      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash}/>
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home
