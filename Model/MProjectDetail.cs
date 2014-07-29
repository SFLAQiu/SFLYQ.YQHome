using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model {
    public class MProjectDetail {
        /// <summary>
        /// 唯一标示
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 项目名称
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// 项目URL
        /// </summary>
        public string Url { get;set; }
    }
}
