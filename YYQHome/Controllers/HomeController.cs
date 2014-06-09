using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace YYQHome.Controllers {
    public class HomeController : Controller {
        //
        // GET: /Home/

        public string Index() {
           return "You Find What？";
       }

        public ActionResult YQ() {
            return View();
        }

    }
}
