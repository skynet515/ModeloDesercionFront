using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Foro.Comun
{
    public class Utility
    {
        public static string getBaseUrl(string url = "")
        {
            string baseUrl = "";

            try
            {
                var currentUrl = HttpContext.Current.Request.Url;
                var appUrl = HttpRuntime.AppDomainAppVirtualPath;

                //Se construye la url base del proyecto
                baseUrl += currentUrl.Scheme;
                baseUrl += "://" + currentUrl.Authority;

                baseUrl += (appUrl != "/") ? appUrl + "/" : appUrl;

                if (url != "")
                {
                    baseUrl += url.TrimStart('/');
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return baseUrl;
        }
    }
}