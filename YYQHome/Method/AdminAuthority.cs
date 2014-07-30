using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Web.Security;
using Model;
namespace YYQHome.Method {
    /// <summary>
    /// 后台权限
    /// </summary>
    public class AdminAuthority :ActionFilterAttribute{
        public override void OnActionExecuting(ActionExecutingContext filterContext) {
            var redirectUrl = FormsAuthentication.LoginUrl;
            var model = WebHelper.GetLoginUserInfo();
            if (model == null) {
                filterContext.HttpContext.Response.Redirect(redirectUrl);
                return;
            }
        }
    }
}
