using AlunosAPI.Data;
using AlunosAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AlunosAPI.Services
{
    public class AlunosService : IAlunoService
    {
        private readonly AppDbContext _context;
        public AlunosService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Aluno>> ObterAlunos()
        {
            return await _context.Alunos.ToListAsync();
        }
        public async Task<Aluno> ObterAluno(int id)
        {
            var aluno = await _context.Alunos.FindAsync(id);

            if (aluno != null)
            {
                return aluno;
            }
        }
        public async Task<IEnumerable<Aluno>> ObterAlunosPorNome(string nome)
        {
            IEnumerable<Aluno> alunos;

            if (!string.IsNullOrEmpty(nome))
                alunos = await _context.Alunos.Where(a => a.Nome.Contains(nome)).ToListAsync();
            else
                alunos = await ObterAlunos();

            return alunos;
        }
        public async Task CriarAluno(Aluno aluno)
        {
            _context.Alunos.Add(aluno);
            await _context.SaveChangesAsync();
        }
        public async Task AtualizarAluno(Aluno aluno)
        {
            _context.Entry(aluno).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task DeletarAluno(Aluno aluno)
        {
            _context.Alunos.Remove(aluno);
            await _context.SaveChangesAsync();
        }
    }
}
