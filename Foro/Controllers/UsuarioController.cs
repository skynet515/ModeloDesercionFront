using Foro.App_Code;
using Foro.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Foro.Controllers
{
    public class UsuarioController : Controller
    {

        public SessionHelperEnLinea contenedorHelper = new SessionHelperEnLinea();
        // GET: Usuario
        public ActionResult Index()
        {
            return View();
        }



        public ActionResult GrabarSesion(Usuario usuario)
        {
            if (usuario != null)
            {
                ContentSessionExterno contenedor = new ContentSessionExterno
                {
                    Usuario = usuario
                };

                contenedorHelper.SetContenedor(contenedor);
                contenedorHelper.lockSessions(HttpContext);

                return Json(new { request = true });
            }
            else
            {
                return Json(new { request = false });
            }
        }

        //Cerrar session
        public ActionResult Logout()
        {
            contenedorHelper.ReleaseSession();
            return RedirectToAction("Index", "Usuario");
        }

        public ActionResult CrearUsuario()
        {
            return View();
        }

    }
}