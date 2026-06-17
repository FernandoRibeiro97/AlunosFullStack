import './App.css'
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function App() {

  const baseUrl = "https://localhost:7005/api/alunos";

  const [data, setData] = useState([]);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

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

  const abrirModalInserir = ()=> {
    setModalIncluir(!modalIncluir);
  }

  const abrirModalEditar = () => {
    setModalEditar(!modalEditar)
  }

  const abrirModalExcluir = () =>{
    setModalExcluir(!modalExcluir)
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

  const selecionarAluno=(aluno, opcao)=>{
    setAlunoSelecionado(aluno);
    (opcao === "Editar") ? abrirModalEditar() : abrirModalExcluir();
  }

  const atualizarAluno = async()=>{
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);
    
    await axios.put(baseUrl+"/"+alunoSelecionado.id, alunoSelecionado)
    .then(response => {
      var resposta = response.data;
      var dadosAuxiliar = data;
      dadosAuxiliar.map(aluno=>{
        if(aluno.id === alunoSelecionado.id){
          aluno.nome = resposta.nome;
          aluno.email = resposta.email;
          aluno.idade = resposta.idade;
        }
      });
      abrirModalEditar();
    }).catch(error => {
      console.log(error)
    });
  }

  const excluirAluno = async()=>{
    await axios.delete(baseUrl+"/"+alunoSelecionado.id)
    .then(response =>{
      setData(data.filter(aluno=> aluno.id !== response.data));
      abrirModalExcluir();
    }).catch(error=>{
      console.log(error);
    })
  }

  return (
    <>
      <h3>Cadastro de Alunos</h3>
      <header>
        <button className='btn btn-success' onClick={() => abrirModalInserir()}>Incluir Novo Aluno</button>
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
                <button className='btn btn-primary' onClick={() => selecionarAluno(aluno, "Editar")}>Editar</button> { " " }
                <button className='btn btn-danger'onClick={() => selecionarAluno(aluno, "Excluir")} >Excluir</button>
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
          <button className='btn btn-danger' onClick={() => abrirModalInserir()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Aluno</ModalHeader>
          <ModalBody>
          <div className='form-group'>
            <label>ID:</label>
            <input type='text' className='form-control' readOnly value = {alunoSelecionado && alunoSelecionado.id}/>
            <br />
            <input type="text" className='form-control' name='nome' onChange={alunoPreenchido}
                    value={alunoSelecionado && alunoSelecionado.nome}/>
            <label>Email: </label>
            <br />
            <input type="text" className='form-control' name='email' onChange={alunoPreenchido}
                    value={alunoSelecionado && alunoSelecionado.email}/>
            <label>Idade: </label>
            <br />
            <input type="text" className='form-control' name='idade' onChange={alunoPreenchido}
                    value={alunoSelecionado && alunoSelecionado.idade}/>
          </div>
        </ModalBody>

        <ModalFooter>
          <button className='btn btn-primary' onClick={() => atualizarAluno()}>Atualizar</button>
          <button className='btn btn-danger' onClick={() => abrirModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão deste(a) aluno(a) : {alunoSelecionado && alunoSelecionado.nome} ?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => excluirAluno()}> Sim </button>
          <button className='btn btn-secondary' onClick={() => abrirModalExcluir()}> Não </button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default App
