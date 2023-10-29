using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Foro.Models;


namespace Foro.App_Code
{
    public class SessionHelperEnLinea
    {
        private ContentSessionExterno contenedor;

        public void SetContenedor(ContentSessionExterno dto)
        {
            this.contenedor = dto;
        }

        public ContentSessionExterno GetContenedor()
        {
            return this.contenedor;
        }

        //Lee los datos de las variables de sesión
        public T Lee<T>(string variable)
        {
            object valor = HttpContext.Current.Session[variable];
            if (valor == null)
                return default(T);
            else
                return ((T)valor);
        }

        //Almacena los datos de la variable de sesión
        private static void Escribe(string variable, object valor)
        {
            HttpContext.Current.Session[variable] = valor;
        }
        public void lockSessions(HttpContextBase HttpContext)
        {
            Escribe(HttpContext.Application["SessionHelperEnLinea"] as string, GetContenedor());

        }
        public void ReleaseSession()
        {
            HttpContext.Current.Session.Clear();
        }
    }
}