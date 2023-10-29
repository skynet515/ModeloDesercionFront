using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ClosedXML.Excel;


namespace Foro.Controllers
{
    public class AlumnoController : Controller
    {
        // GET: Alumno
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AgregarAlumno() { 
            return View();
        }

        public ActionResult ReportarAsistencia()
        {
            return View();
        }

        public ActionResult DescargarPlantilla()
        {
            DataSet dsPlantilla = new DataSet();
            dsPlantilla.Tables.Add("Plantilla");
            dsPlantilla.Tables["Plantilla"].Columns.Add("Código Alumno");
            dsPlantilla.Tables["Plantilla"].Columns.Add("Asistencia");
            var workbook = new XLWorkbook();
            DataTable dtPlantilla = dsPlantilla.Tables[0];
            var xLWorksheet = workbook.AddWorksheet("Plantilla");
            xLWorksheet.Cell(1,1).InsertTable(dtPlantilla);
            xLWorksheet.Columns().AdjustToContents();

            // Guardar el archivo Excel en una ubicación específica o transmitirlo al navegador
            var memoryStream = new System.IO.MemoryStream();
            workbook.SaveAs(memoryStream);
            memoryStream.Seek(0, System.IO.SeekOrigin.Begin);

            return File(memoryStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Plantilla.xlsx");
        }
    }
}