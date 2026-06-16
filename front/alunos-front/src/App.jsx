import './App.css'
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function App() {

  const baseUrl = "https://localhost:7005/api/alunos";

  const [data, setData] = useState([]);
  const [modalIncluir, setModalIncluir] = useState(false);

  const obterAlunos = async()=>{
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    obterAlunos();
  });

  const [alunoSelecionado, setAlunoSelecionado] = useState({
    id: '',
    nome: '',
    email: '',
    idade: ''
  })

  const abrirModal = ()=> {
    setModalIncluir(!modalIncluir);
  }

  const alunoPreenchido = e=>{
    const {name, value} = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado, [name]:value
    });
    console.log(alunoSelecionado);
  }

  const inserirAluno = async()=>{
    delete alunoSelecionado.id;
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);

    await axios.post(baseUrl, alunoSelecionado)
    .then(response => {
      setData(data.concat(response.data));
      abrirModal();
    }).catch(error=>{
      console.log(error);
    })
  }

  return (
    <>
      <h3>Cadastro de Alunos</h3>
      <header>
        <button className='btn btn-success' onClick={() => abrirModal()}>Incluir Novo Aluno</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(aluno=>(
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button className='btn btn-primary'>Editar</button> { " " }
                <button className='btn btn-danger'>Excluir</button>
              </td>
            </tr>
          ))         
          }
        </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Aluno</ModalHeader>
        <ModalBody>

          <div className='form-group'>
            <label>Nome: </label>
            <br />
            <input type="text" className='form-control' name='nome' onChange={alunoPreenchido}/>
            <label>Email: </label>
            <br />
            <input type="text" className='form-control' name='email' onChange={alunoPreenchido}/>
            <label>Idade: </label>
            <br />
            <input type="text" className='form-control' name='idade' onChange={alunoPreenchido}/>
            <br />
          </div>
        </ModalBody>

        <ModalFooter>
          <button className='btn btn-primary' onClick={() => inserirAluno()}>Incluir</button>
          <button className='btn btn-danger' onClick={() => abrirModal()}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default App
