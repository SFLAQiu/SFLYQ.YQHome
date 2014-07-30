using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Model;
using System.Web;
using Helper;
using LG.Utility;

namespace BLL {
    public class BProject {
        private static string _dataPath = HttpContext.Current.Server.MapPath("~")+CommonConfig.ProjectDataPrePath;
        private static string _filePath = _dataPath + "ProjectDatas.xml";
        public BProject() {
            if (!Directory.Exists(_dataPath)) Directory.CreateDirectory(_dataPath);
        }
        #region "操作项目"
        /// <summary>
        /// 获取项目集合
        /// </summary>
        /// <returns></returns>
        public List<MProject> GetList() {
            var datas = new List<MProject>();
            if (!File.Exists(_filePath)) return datas;
            datas=_filePath.XmlDeserializeFromFile<List<MProject>>(Encoding.UTF8);
            if(datas!=null && datas.Count>0)datas.OrderByDescending(d=>d.Sort);
            return datas??new List<MProject>();
        }

        /// <summary>
        /// 添加项目
        /// </summary>
        /// <param name="mProject"></param>
        /// <returns></returns>
        public bool AddProject(MProject mProject) {
            if(mProject==null)return false;
            var datas = GetList();
            if (datas != null && datas.Count > 0) {
               var itemData= datas.FirstOrDefault(d=>d.Id==mProject.Id);
               if (itemData != null) return false;
            }
            datas.Add(mProject);
            try {
                datas.XmlSerializeToFile(_filePath, Encoding.UTF8);
            } catch {
                return false;    
            }
            return true;
        }

        /// <summary>
        /// 添加项目
        /// </summary>
        /// <param name="mProject"></param>
        /// <returns></returns>
        public bool EditProject(MProject mProjectEdit) {
            if (mProjectEdit == null || mProjectEdit.Id <= 0) return false;
            var datas = GetList();
            var index=datas.FindIndex(d=>d.Id==mProjectEdit.Id);
            if (index<0) return false;
            datas[index] = mProjectEdit;
            datas.XmlSerializeToFile(_filePath, Encoding.UTF8);
            return true;
        }
       
        /// <summary>
        /// 删除项目
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public bool DeleteProject(int projectId) {
            if (projectId <= 0) return false;
            var datas = GetList();
            var deleHanderRows=datas.RemoveAll(d=>d.Id==projectId);
            if (deleHanderRows <= 0) return false;
            try {
                datas.XmlSerializeToFile(_filePath, Encoding.UTF8);
            } catch {
                return false;
            }
            return true;
        }
        /// <summary>
        /// 获取项目对象
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public MProject GetProjectModel(int projectId) {
            if (projectId <= 0 ) return null;
            var datas = GetList();
            return datas.FirstOrDefault(d => d.Id == projectId);
        }
        #endregion
        #region "操作项目详情"

        /// <summary>
        /// 添加详情
        /// </summary>
        /// <param name="typeName"></param>
        /// <param name="mProjectDetail"></param>
        /// <returns></returns>
        public bool AddProjectDetial(int projectId, MProjectDetail mProjectDetail) {
            if (projectId <= 0) return false;
            var datas = GetList();
            var itemDatas = datas.FirstOrDefault(d => d.Id == projectId).projectDetailDatas ?? new List<MProjectDetail>();
            itemDatas.Add(mProjectDetail);
            try {
                datas.XmlSerializeToFile(_filePath, Encoding.UTF8);
            } catch {
                return false;
            }
            return true;
        }

        /// <summary>
        /// 删除项目详情
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public bool DeleteProjectDetail(int projectId,int projectDetailId) {
            var datas = GetList();
            var targetProjectDetail= GetProjectDetailModel(projectId, projectDetailId);
            if(targetProjectDetail==null) return false;
            var targetProject = datas.FirstOrDefault(d => d.Id == projectId);
            var handerRows = targetProject.projectDetailDatas.RemoveAll(d=>d.Id==targetProjectDetail.Id);
            if (handerRows<=0) return false;
            try {
                datas.XmlSerializeToFile(_filePath, Encoding.UTF8);
            } catch {
                return false;
            }
            return true;
        }
        /// <summary>
        /// 获取详情对象
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="projectDetailId"></param>
        /// <returns></returns>
        public MProjectDetail GetProjectDetailModel(int projectId, int projectDetailId) {
            if (projectId <= 0 || projectDetailId <= 0) return null;
            var targetProject = GetProjectModel(projectId);
            if (targetProject == null || targetProject.projectDetailDatas == null || targetProject.projectDetailDatas.Count <= 0) return null;
            return targetProject.projectDetailDatas.FirstOrDefault(d=>d.Id==projectDetailId);
        }
        /// <summary>
        /// 编辑项目详情
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool EditProjectDetail(int projectId,MProjectDetail model) {
            if (projectId <= 0) return false;
            var datas = GetList();
            var targetProject = datas.FirstOrDefault(d=>d.Id==projectId);
            if (targetProject.projectDetailDatas == null || targetProject.projectDetailDatas.Count <= 0) return false;
            var index=targetProject.projectDetailDatas.FindIndex(d => d.Id == model.Id);
            if (index < 0) return false;
            targetProject.projectDetailDatas[index] = model;
            try {
                datas.XmlSerializeToFile(_filePath, Encoding.UTF8);
            } catch {
                return false;
            }
            return true;
        }
        #endregion

    }
}
