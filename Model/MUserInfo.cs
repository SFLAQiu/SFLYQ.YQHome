using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model {
    [Serializable]
    public class MUserInfo {
        /// <summary>
        /// ID
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 显示名称
        /// </summary>
        public string ShowName { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        public string PassWord { get; set; }
    }
}
