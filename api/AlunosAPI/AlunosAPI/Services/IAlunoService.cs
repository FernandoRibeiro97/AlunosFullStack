using AlunosAPI.Models;

namespace AlunosAPI.Services
{
    public interface IAlunoService
    {
        Task<IEnumerable<Aluno>> ObterAlunos();
        Task<Aluno> ObterAluno(int id);
        Task<IEnumerable<Aluno>> ObterAlunosPorNome(string nome);
        Task CriarAluno(Aluno aluno);
        Task AtualizarAluno(Aluno aluno);
        Task DeletarAluno(Aluno aluno);
    }
}
