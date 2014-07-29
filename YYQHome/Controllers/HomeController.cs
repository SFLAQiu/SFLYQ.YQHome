﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;
using Model;
using Helper;
using LG.Utility;

namespace YYQHome.Controllers {
    public class HomeController : Controller {
        //
        // GET: /Home/

        public string Index() {
           return "You Find What？";
       }

        public ActionResult YQ() {
            ViewBag.Datas = new BProject().GetList();
            return View();
        }

    }
}
