using System.Web;
using System.Web.Optimization;

namespace Foro
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery/dist/jquery.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/stylesJs").Include(
                     "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/JsSite").Include(
               "~/Content/src/js/scripts.js"
                ));


            bundles.Add(new StyleBundle("~/Content/sitecss").Include(
                     "~/Content/src/css/styles.css",
                     "~/Content/plugins/sweetalert/sweetalert.css",
                      "~/Content/plugins/select2/dist/css/select2.css" //select2.min.css                      
                     ));

            bundles.Add(new ScriptBundle("~/bundles/pluginjs").Include(
                "~/Content/plugins/blockUI/jquery.blockUI.js",
                "~/Content/plugins/sweetalert/sweetalert.min.js",
                "~/Content/plugins/select2/dist/js/select2.js",
                "~/Scripts/site.js"
               ));

            bundles.Add(new ScriptBundle("~/bundles/sitejs").Include(
              "~/Content/src/js/font-awesome-all.min.js",
              "~/Content/src/js/feather-icons-4.27.0.min.js",
              "~/JScripts/utils/datatable.js" //Scripts para datatables

              ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/Api").Include(
                      "~/JScripts/services.js",
                       "~/JScripts/cus_function.js",
                        "~/JScripts/respuestas.js",
                        "~/JScripts/preguntas.js",
                        "~/JScripts/Anexos.js"

                     ));
        }
    }
}
