import Vue from 'vue';
export default {

  install: function (Vue: any, options: any) {
    Vue.directive('focus', function (el:any, option:any) {
      console.log(option);
      console.log(el)
      var defClass = 'el-input', defTag = 'input';
      var value = option.value;
      if(value)
        value = { cls: defClass, tag: defTag, foc: true };
      if (el.classList.contains(value.cls) && value.foc)
        el.getElementsByTagName(value.tag)[0].focus();
    });

    Vue.filter('formatDate', function(value:string) {
      var dt =new Date(value);
      var str = "";
      str =
        dt.getFullYear() +
        "-" +
        ("00" + (dt.getMonth() + 1)).slice(-2) +
        "-" +
        ("00" + dt.getDate()).slice(-2)
      return str;
    });

    Vue.prototype.alert = function (msg: string, type: string = "info") {
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
    };

    Vue.prototype.confirm = function (msg: string, type: string = "warning") {
      return this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type
      });
    }


  }
}
