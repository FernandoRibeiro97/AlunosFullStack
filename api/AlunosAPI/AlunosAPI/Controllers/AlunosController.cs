using AlunosAPI.Models;
using AlunosAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace AlunosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunosController : ControllerBase
    {
        private IAlunoService _alunoService;
        public AlunosController(IAlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> ObterAlunos()
        {
            try
            {
                var alunos = await _alunoService.ObterAlunos();
                return Ok(alunos);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao obter alunos ! ({ex.Message})");
            }
        }

        [HttpGet]
        [Route("PorNome")]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> ObterAlunosPorNome([FromQuery] string nome)
        {
            try
            {
                var alunos = await _alunoService.ObterAlunosPorNome(nome);

                if (alunos == null || !alunos.Any())
                    return NotFound($"Não existem alunos com o nome '{nome}'");

                return Ok(alunos);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao obter alunos por nome ! ({ex.Message})");
            }
        }

        [HttpGet("{id:int}", Name = "ObterAluno")]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> ObterAluno(int id)
        {
            try
            {
                var aluno = await _alunoService.ObterAluno(id);

                if (aluno == null)
                    return NotFound($"Não existe aluno com o id = {id}");

                return Ok(aluno);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao obter aluno por id ! ({ex.Message})");
            }
        }

        [HttpPost]
        public async Task<ActionResult> CriarAluno(Aluno aluno)
        {
            try
            {
                await _alunoService.CriarAluno(aluno);
                return CreatedAtRoute(nameof(ObterAluno), new { id = aluno.Id }, aluno);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> AtualizarAluno(int id, [FromBody] Aluno aluno)
        {
            try
            {
                var alunoExistente = await _alunoService.ObterAluno(id);

                if (alunoExistente == null)
                {
                    return NotFound("Aluno não existe !");
                }

                if (id == aluno.Id)
                {
                    await _alunoService.AtualizarAluno(aluno);
                    return Ok($"Aluno com id= {aluno.Id} atualizado com sucesso!");
                }
                else
                {
                    return BadRequest("Dados inconsistentes !");
                }
            }
            catch
            {
                return BadRequest("Request inválido!");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeletarAluno(int id)
        {
            try
            {
                var aluno = await _alunoService.ObterAluno(id);

                if (aluno == null)
                {
                    return NotFound("Aluno não existe !");
                }
                else
                {
                    await _alunoService.DeletarAluno(aluno);
                    return Ok($"O Aluno com id = {aluno.Id} excluído com sucesso !");
                }
            }
            catch
            {
                return BadRequest("Request inválido!");
            }
        }
    }
}
