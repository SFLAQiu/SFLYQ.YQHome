using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Safe.Base.DbHelper;
namespace DAL {
    public class DBHelper {
        public static MYSQLHelper Get1307sDatasDB() {
            return new MYSQLHelper("Server=50.62.209.149;Database=1307Datas;Uid=sflyq;Pwd=nowy.6313105;", true);
        }
    }
}
