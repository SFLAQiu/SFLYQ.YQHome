using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Security;
using LG.Utility;
using Model;
namespace YYQHome.Method {
    public class WebHelper {
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="mUserInfo"></param>
        public static void DoLogin(MUserInfo mUserInfo, bool needRedirect=false) {
            string userInfoSerialize = mUserInfo.SerializeToString();
            //创建form身份验证票据
            FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1, mUserInfo.UserName, DateTime.Now, DateTime.Now.AddYears(10), false, userInfoSerialize);
            //加密后的身份票据字符串
            String encTicket = FormsAuthentication.Encrypt(ticket);
            //FormsAuthentication.SetAuthCookie(mUserInfo.UserName+mUserInfo.Id, false);
            //把加密后的身份票据字符串保存到cookie中，cookie名为web.config配置的数据
            HttpContext.Current.Response.Cookies.Add(new HttpCookie(FormsAuthentication.FormsCookieName, encTicket));
            //跳转到登录成功页面
            //HttpContext.Current.Response.Redirect(FormsAuthentication.GetRedirectUrl(mUserInfo.UserName, false));
            if (needRedirect) HttpContext.Current.Response.Redirect(FormsAuthentication.DefaultUrl);
            
        }
        /// <summary>
        /// 获取登录用户信息
        /// </summary>
        /// <returns></returns>
        public static MUserInfo GetLoginUserInfo() {
            //判断是否登录成功
            if (!HttpContext.Current.User.Identity.IsAuthenticated || HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName] == null) return null;
            //获取form验证用户的标识对象
            var fi = (System.Web.Security.FormsIdentity)HttpContext.Current.User.Identity;
            if (fi == null) return null;
            if (fi.Ticket.UserData == "") return null;
            var model = fi.Ticket.UserData.DeserializeObject();
            if (model != null) return (MUserInfo)model;
            return null;
        }
        /// <summary>
        /// 登出
        /// </summary>
        public static void LoginOut(bool needRedirect=false){
            FormsAuthentication.SignOut();
            if (needRedirect) FormsAuthentication.RedirectToLoginPage();
        }
    }
}
