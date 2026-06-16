using System.ComponentModel.DataAnnotations;

namespace AlunosAPI.Models
{
    public class Aluno
    {
        public int Id { get; set; }
        [Required]
        [StringLength(80, ErrorMessage = "O tamanho máximo para {0} é de 80 caracteres!")]
        public string Nome { get; set; }
        [Required]
        [EmailAddress]
        [StringLength(100, ErrorMessage = "O tamanho máximo para {0} é de 100 caracteres!")]
        public string Email { get; set; }
        [Required]
        public int Idade { get; set; }
    }
}
