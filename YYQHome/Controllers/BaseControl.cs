using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Helper;
using LG.Utility;

namespace YYQHome.Controllers {
    public class BaseControl : Controller {
        /// <summary>
        /// 更具对象转为JSON格式字符串输出
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public ContentResult WriteJson(object obj) {
            if (obj == null) return Content("What?");
            return Content(obj.GetJSON(), CommonConfig.Json);
        }
    }
}