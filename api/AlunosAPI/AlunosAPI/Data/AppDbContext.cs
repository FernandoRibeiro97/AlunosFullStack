using AlunosAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AlunosAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        public DbSet<Aluno> Alunos { get; set; }


    }
}
