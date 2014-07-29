using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model {
    public class MProject {
        /// <summary>
        /// 唯一标示
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 分类名称
        /// </summary>
        public string TypeName { get; set; }
        /// <summary>
        /// 排序
        /// </summary>
        public int Sort { get; set; }
        /// <summary>
        /// 分类对应的项目数据集合
        /// </summary>
        public List<MProjectDetail> projectDetailDatas { get; set; }
    }
}
