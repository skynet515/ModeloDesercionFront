using Foro.App_Code;
using System.Web.Mvc;
using Foro.Models;


namespace Foro.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult Index()
        {
            
            return View();
        }


        public ActionResult Respuestas(int id)
        {
            ViewBag.idPregunta = id;
            return View();
        }

        public ActionResult AgregarPregunta()
        {
            return View();
        }

        public ActionResult AgregarRespuesta(int id)
        {
            ViewBag.idPregunta = id;
            return View();
        }


        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}