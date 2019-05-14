var Tool = {
  /** 指定数组某个字段排序
  * var a = [{name:'hdj', age:28},{name:'yim', age:25},{name:'hdq', age:26} ];
  * 测试方法 arry = listSortBy(a, 'age', 'desc');
  */
  listSortBy:function (arr, field, order){
      var refer = [], result=[], order = order=='asc'?'asc':'desc', index;
      for(var i=0; i<arr.length; i++){
          refer[i] = arr[i][field]+':'+i;
      }
      refer.sort();
      if(order=='desc') refer.reverse();
      for(var i=0;i<refer.length;i++){
          index = refer[i].split(':')[1];
          result[i] = arr[index];
      }
      return result;
  },
  /**
  *
  */
  getDateObject:function(FomatValue){
    if(FomatValue == undefined) return;
  	var rpl = FomatValue.replace(/\//g, '');
  	var base = eval('new ' + rpl);
  	var baseDate = new Date(base);
  	return baseDate;
  },
  checkNumStr:function(value){
    //验证是否为数字 正整数 : ^\+?[1-9][0-9]*$
    var reg = new RegExp("^[0-9]*$");
    if(!reg.test(value)){
        //alert("请输入数字!");
        return false;
    }else{
      return true;
    }
  }
}
module.exports = Tool;
