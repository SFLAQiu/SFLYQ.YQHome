using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Model;
using LG.Utility;
namespace DAL {
    public class DTest {
        private Safe.Base.DbHelper.MYSQLHelper _db = DBHelper.Get1307sDatasDB();
        public List<MTest> GetModel() { 
            string sqlStr=@"SELECT * FROM Test";
            return _db.ExecuteFillDataSet(sqlStr, null).Tables[0].GetModels<MTest>();
        }
    }
}
