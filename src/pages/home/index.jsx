import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'


function Home() {

  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    try {
      const usersFromApi = await api.get('/usuarios')
      setUsers(usersFromApi.data)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }
    async function createUser() {
      await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    });

    inputName.current.value = '';
    inputAge.current.value = '';
    inputEmail.current.value = '';

    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUsers();
  }, []);

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuário</h1>
        <input placeholder="Nome" name="Nome" type="text" ref={inputName} />
        <input placeholder="Idade" name="Idade" type="number" ref={inputAge} />
        <input placeholder="Email" name="Email" type="email" ref={inputEmail} />
        <button type="button" onClick={createUser}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="Excluir" />
          </button>
        </div>
      ))}
    </div>

  )
}

export default Home
