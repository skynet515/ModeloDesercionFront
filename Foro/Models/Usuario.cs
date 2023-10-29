using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Foro.Models
{
    public class Usuario
    {
        public int idUsuario { get; set; }
        public string nombreUsuario { get; set; }
        public string clave { get; set; }
        public int estado { get; set; }
        public int idRol { get; set; }
       
    }
}