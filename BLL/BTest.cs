﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using Model;
namespace BLL {
    public class BTest {
        private DTest _dal = new DTest();
        public List<MTest> GetModel() {
            return _dal.GetModel();
        }
    }
}
