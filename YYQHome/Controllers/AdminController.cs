using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;
using Helper;
using Model;
using LG.Utility;
namespace YYQHome.Controllers {
    public class AdminController : Controller {
        //
        // GET: /Admin/

        public ActionResult Index() {
            return Content("You Find What？");
        }
        /// <summary>
        /// 项目管理
        /// </summary>
        /// <returns></returns>
        public ActionResult ProjectManage() {
            ViewBag.Datas = new BProject().GetList() ?? new List<MProject>();
            return View();
        }
        /// <summary>
        /// 添加/编辑项目
        /// </summary>
        /// <returns></returns>
        public ActionResult AddProject() {
            string action = Request.GetQ("action");
            var mProject = new MProject();
            int projectId = 0;
            switch (action) {
                case "Edit": {
                    projectId = Request.GetQ("ProjectId").GetInt(0, false);
                    if (projectId <= 0) return Content("FK You！");
                    mProject = new BProject().GetProjectModel(projectId);
                }; break;
            }
            ViewBag.Project = mProject ?? new MProject();
            ViewBag.ProjectId = projectId;
            ViewBag.Action = action;
            return View();
        }
        /// <summary>
        /// 添加/编辑项目详情
        /// </summary>
        /// <returns></returns>
        public ActionResult AddProjectDetail() {
            int projectId = Request.GetQ("ProjectId").GetInt(0, false);
            string action = Request.GetQ("action");
            if (projectId <= 0) return Content("FK You！ projectId <= 0！");
            var mProjectDetail = new MProjectDetail();
            var projectDetailId = 0;
            switch (action) {
                case "Edit": {
                        projectDetailId = Request.GetQ("ProjectDetailId").GetInt(0, false);
                        if (projectDetailId <= 0) return Content("FK You！ projectDetailId <= 0！");
                        mProjectDetail = new BProject().GetProjectDetailModel(projectId, projectDetailId) ?? new MProjectDetail(); ;
                    }; break;
            }
            ViewBag.Action = action;
            ViewBag.ProjectDetail = mProjectDetail;
            ViewBag.ProjectDetailId = projectDetailId;
            ViewBag.ProjectId = projectId;
            return View();
        }
    }
}
