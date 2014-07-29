using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;
using LG.Utility;
using Model;
namespace YYQHome.Controllers {
    public class AdminAjaxController : BaseControl {
        private BProject _bllProject = new BProject();
        public ActionResult Index() {
            return View();
        }

        #region "操作Project"
        /// <summary>
        /// 添加项目
        /// </summary>
        /// <returns></returns>
        public ActionResult AddProject() {
            string typeName = Request.GetF("TypeName");
            if (typeName.IsNullOrWhiteSpace()) return WriteJson(new {
                Code = "102",
                Msg = "参数错误！"
            });
            //获取现在拥有的数据总数，得到最新可添加的ID
            var datas = _bllProject.GetList() ?? new List<MProject>();
            var newId = datas.Count + 1;
            //添加分类
            var addHanderSc = _bllProject.AddProject(new MProject {
                Id=newId,
                projectDetailDatas = new List<MProjectDetail>(),
                TypeName = typeName,
                Sort = 0
            });
            if (!addHanderSc) return WriteJson(new {
                Code = "103",
                Msg = "添加失败！"
            });
            return WriteJson(new {
                Code = "100",
                Msg = "添加成功！"
            });
        }
        /// <summary>
        /// 编辑项目
        /// </summary>
        /// <returns></returns>
        public ActionResult EditProject() {
            int projectId = Request.GetF("ProjectId").GetInt(0,false);
            string typeName = Request.GetF("TypeName").GetString("");
            if (projectId <= 0) return WriteJson(new {
                Code = "102",
                Msg = "参数错误！"
            });
            var mProject = new BProject().GetProjectModel(projectId);
            if (mProject == null) return WriteJson(new {
                Code = "103",
                Msg = "参数错误！"
            });
            //添加分类
            mProject.TypeName = typeName;
            var handerSc = _bllProject.EditProject(mProject);
            if (!handerSc) return WriteJson(new {
                Code = "104",
                Msg = "添加失败！"
            });
            return WriteJson(new {
                Code = "100",
                Msg = "添加成功！"
            });
        }
        /// <summary>
        /// 删除项目
        /// </summary>
        /// <returns></returns>
        public ActionResult DeleteProject() {
            int projecId = Request.GetF("ProjectId").GetInt(0, false);
            if (projecId <= 0) return WriteJson(new {
                Code = "102",
                Msg = "参数错误！"
            });
            var deleteHanderSc = _bllProject.DeleteProject(projecId);
            if (!deleteHanderSc) return WriteJson(new {
                Code = "103",
                Msg = "添加失败！"
            });
            return WriteJson(new {
                Code = "100",
                Msg = "添加成功！"
            });

        }
        /// <summary>
        /// 添加详情
        /// </summary>
        /// <returns></returns>
        public ActionResult AddProjectDetail() {
            int projecId = Request.GetF("ProjectId").GetInt(0,false);
            string title=Request.GetF("Title").GetString("");
            string url=Request.GetF("Url").GetString("");
            if (projecId <= 0 || title.IsNullOrWhiteSpace() || url.IsNullOrWhiteSpace()) return WriteJson(new {
                Code = "102",
                Msg = "参数错误！"
            });
            var datas = _bllProject.GetList() ?? new List<MProject>();
            var targetData = datas.FirstOrDefault(d=>d.Id==projecId);
            if (targetData == null) return WriteJson(new {
                Code = "201",
                Msg = "找不到要添加详情的项目数据！"
            });
            //找到项目ID对应的项目数据，获得项目详情数据集合，得到可以作为添加的最新详情ID
            var detailDatas=targetData.projectDetailDatas??new List<MProjectDetail> ();
            var newId = detailDatas.Count + 1;

            var addHanderSc = _bllProject.AddProjectDetial(projecId, new MProjectDetail {
                Id = newId,
                Title = title,
                Url = url
            });
            if (!addHanderSc) return WriteJson(new {
                Code = "103",
                Msg = "添加失败！"
            });
            return WriteJson(new {
                Code = "100",
                Msg = "添加成功！"
            });
        }

        /// <summary>
        /// 删除项目详情
        /// </summary>
        /// <returns></returns>
        public ActionResult DeleteProjectDetail() {
            int projecId = Request.GetF("ProjectId").GetInt(0, false);
            int projectDetailId = Request.GetF("ProjectDetailId").GetInt(0, false);
            if (projecId <= 0 || projectDetailId <= 0) return WriteJson(new {
                Code = "102",
                Msg = "参数错误！"
            });
            var deleteHanderSc = _bllProject.DeleteProjectDetail(projecId, projectDetailId);
            if (!deleteHanderSc) return WriteJson(new {
                Code = "103",
                Msg = "添加失败！"
            });
            return WriteJson(new {
                Code = "100",
                Msg = "添加成功！"
            });

        }
        /// <summary>
        /// 编辑项目
        /// </summary>
        /// <returns></returns>
        public ActionResult EditProjectDetail() {
            int projectId = Request.GetF("ProjectId").GetInt(0, false);
            int projectDetail = Request.GetF("ProjectDetailId").GetInt(0, false);
            string title = Request.GetF("Title").GetString("");
            string url = Request.GetF("Url").GetString("");
            if (projectId <= 0 || projectDetail<=0 || title.IsNullOrWhiteSpace() || url.IsNullOrWhiteSpace()) return WriteJson(new {
                Code = "102",
                Msg = "参数错误！"
            });
            var mProjectDetail = new BProject().GetProjectDetailModel(projectId, projectDetail);
            if (mProjectDetail == null) return WriteJson(new {
                Code = "103",
                Msg = "参数错误！"
            });
            mProjectDetail.Title = title;
            mProjectDetail.Url = url;
            var handerSc = _bllProject.EditProjectDetail(projectId,mProjectDetail);
            if (!handerSc) return WriteJson(new {
                Code = "104",
                Msg = "添加失败！"
            });
            return WriteJson(new {
                Code = "100",
                Msg = "添加成功！"
            });
        }
       
        #endregion

    }
}
