using AlunosAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace AlunosAPI.Controllers
{
    [ApiController]
    [Route("api/alunos")]
    public class AlunosController
    {
        private IAlunoService _alunosService;
        public AlunosController(IAlunoService alunoService)
        {
            _alunosService = alunoService;
        }
    }
}
