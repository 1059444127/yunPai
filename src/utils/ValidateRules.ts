//自定义校验规则
export default {
  age(rule: any, value: any, callback: any) {
    if (value == '') {
      return callback(new Error('请输入年龄'));
    } else {
      var reg = /^[0-9]*$/;
      if (!reg.test(value)) {
        callback(new Error('请输入数字'));
      } else {
        callback();
      }
    }
  },
  IDCardNo(rule: any, value: any, callback: any) {
    if (value == '') {
      callback(new Error('请输入身份证号'));
    } else {
      var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
      if (!reg.test(value)) {
        callback(new Error('请输入正确的身份证号'));
      } else {
        callback();
      }
    }
  },
  email(rule: any, value: any, callback: any) {
    if (value != '') {
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!reg.test(value)) {
        callback(new Error('请输入正确的电子邮箱'));
      } else {
        callback();
      }
    } else {
      callback();
    }
  },
  visitStartDT(rule: any, value: any, callback: any) {
    if (value == '' || value == null) {
      callback(new Error('请输入就诊日期'));
    } else {
      //var d=new Date(Date.parse(_this.IndexModel.visitStartDT.replace(/-/g,"/")))
      var createDate = new Date(Date.parse(value));
      var curDate = new Date();
      if (createDate > curDate) {
        callback(new Error('就诊日期不能晚于当前日期'));
      } else {
        callback();
      }
    }
  }
}
