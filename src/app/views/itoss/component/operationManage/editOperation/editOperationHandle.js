require('bootstrap');
var React = require('react');
var ReactWidgets = require('react-widgets');
var History = require('react-router').History;
var DateChange = require('../../../../../utils/dateChange.js');
//var Store = require('../../../../../server/store');

var editOperationHandle = React.createClass({
  mixins: [History],
  getInitialState: function(){
      return {
          workorder_responsetime:""
      }
  },
  componentDidMount: function() {
    //清除当前流转人员数据
    this.props.setCurrentNextPerson("");
  },
  _handleOnClickSelect: function(row, element) {
      //清除当前流转人员数据
      this.props.setCurrentNextPerson("");
      var curWorkFlowId = "";
      var grouid = "";
      if(this.props.orderDetailData != ""){
        if(this.props.orderDetailData.WORKFLOW_ID != ""){
          curWorkFlowId = this.props.orderDetailData.WORKFLOW_ID;
          grouid = this.props.orderDetailData.GROUP_ID;
        };
      };
      var filter = [{key:"FROM_ID",value:localStorage.getItem("CURRENT_ROLENAME")},{key:"WORKFLOW_ID",value:curWorkFlowId},{key:"GROUP_ID",value:grouid}];
      this.props.get_WorkOrderNextPersonData(filter);
      $('#operationPersonnelTableModal').modal('show')
  },
  onChangeNothing:function(){
  },
  render:function(){
    if(this.props.orderDetailData == ""){
      that.history.pushState(null,'operationManage/myWorkSpace');
      window.location.reload("true");
    };
    var NextPers="";
    var currentPers = localStorage.getItem("USERNAME");
    var currentNextPerson = this.props.currentNextPerson;
    if(currentNextPerson != null && currentNextPerson != ""){
      NextPers = currentNextPerson[0].name;
    };
    $("#editOperationHandleNextPers").val(NextPers);
    var fromuser = "";//上级处理人
    var dispatchTime = null;//上级派工时间
    var arrivalTime =  null;//工单处理人的响应时间
    var brdispatchTime = null;//自己填的派工时间
    var workFlowLogData = this.props.workFlowLogData;
    var WorkOrderProcessLogData = this.props.workOrderProcessLogData;
    var Flag = false;   //是否是维护人员(false 不是，true 是：需要修改工单响应时间)
    if(workFlowLogData!=null && workFlowLogData!="" && workFlowLogData.length > 0){
         if(workFlowLogData[0].ToUser == localStorage.getItem("USERNAME")) {
            //是下级处理人打开的处理表单
            fromuser = workFlowLogData[0].FromUser; //上级处理人
            dispatchTime = workFlowLogData[0].DispatchTime; //上级派工时间
            dispatchTime = new Date(parseInt(dispatchTime.substring(6, (dispatchTime.length - 2))));
            //$("#editOperationHandleDisTime").find('input').val(dispatchTime);
            //arrivalTime =  new Date();//工单处理人的响应时间
            brdispatchTime = new Date();//自己填的派工时间
            $('#openOperPersTableModal').attr("disabled",false);//打开选择流转人员页
            $('#saveEditOrderHandleFlow').attr("disabled",false);//保存处理表单数据按钮
            $('#editOperationHandleProcess').attr("disabled",false);//将input元素设置为
            //工单Status：申请延期批复	sqyqpf;申请延期拒绝	sqyqjj;申请延期	sqyq;待验证	wc;关闭	gb;草稿	cg;待处理	cl;待分配 fp;
            //控制是否显示关闭 按钮
            var FlowActionListData = this.props.flowActionListData;
            var closeflow = false;
            if(FlowActionListData.length > 0){
              for(var i=0;i<FlowActionListData.length;i++){
                //判断当前这个人是否有关闭流程可以走
                if(FlowActionListData[i].FROM_ID == localStorage.getItem("CURRENT_ROLENAME") && FlowActionListData[i].STATUS == "gb"){
                  closeflow = true;
                  break;
                };
              };
            };
            if(document.getElementById('closeEditOrderHandleFlow') != null){
              if(closeflow){
                document.getElementById('closeEditOrderHandleFlow').style.display = 'inline-block';
              }else{
                document.getElementById('closeEditOrderHandleFlow').style.display = 'none';
              };
            };

            if (this.props.curWorkOrderStatus != "sqyq"){
              //当前处理申请延期状态,运维人员自己查看申请延期的工单
              if(this.props.workFlowDetailsData != ""){
                //当前需要修改工单状态或响应时间判断条件数据
                var NextStatus = this.props.workFlowDetailsData[0].NextStatus;//当前工单需要调置的状态
                Flag = this.props.workFlowDetailsData[0].Flag;  //是否是维护人员(false 不是，true 是：需要修改工单响应时间)
                if(NextStatus != "" && Flag == true){
                  if(this.props.orderDetailData.WORKORDER_RESPONSETIME != ""){
                       //维护人员工单响应时间
                       arrivalTime = DateChange.strToDate(this.props.orderDetailData.WORKORDER_RESPONSETIME);
                       if(this.props.curWorkOrderStatus != NextStatus){
                         var statusData = {
                           RecId:this.props.curWorkOrderId,
                           Status:NextStatus
                         };
                         this.props.update_WorkOrderCommonStatusData(statusData);
                         //修改工单状态
                         this.props.setCurWorkOrderStatus(NextStatus);
                      };
                  }else{
                    if(this.state.workorder_responsetime == ""){
                      //第一次，查看本人处理工单，设置工单响应时间
                      arrivalTime =  new Date();//工单处理人的响应时间
                      var statusData = {
                        RecId:this.props.curWorkOrderId,
                        WorkOrderResponseTime:arrivalTime,
                        Status:NextStatus
                      };
                      this.props.update_WorkOrderCommonStatusData(statusData);
                      this.setState({workorder_responsetime:DateChange.DatetoStr(arrivalTime)});//表示已经填了值了
                      if(this.props.curWorkOrderStatus != NextStatus){
                        //修改工单状态
                        this.props.setCurWorkOrderStatus(NextStatus);
                      };
                    }else{
                      arrivalTime =  DateChange.strToDate(this.state.workorder_responsetime);
                    }
                  };
                }else if(NextStatus != "" && Flag == false){
                  if(this.props.curWorkOrderStatus != NextStatus){
                    var statusData = {
                      RecId:this.props.curWorkOrderId,
                      Status:NextStatus
                    };
                    this.props.update_WorkOrderCommonStatusData(statusData);
                    //修改工单状态 curWorkOrderStatus
                    this.props.setCurWorkOrderStatus(NextStatus);
                  };
                };
              };
            }else{
              if(this.state.workorder_responsetime == ""){
                if(this.props.orderDetailData.WORKORDER_RESPONSETIME != ""){
                     //维护人员工单响应时间
                     arrivalTime = DateChange.strToDate(this.props.orderDetailData.WORKORDER_RESPONSETIME);
                }
              }
            };

            if(this.props.curWorkOrderStatus == "cl"){
              //测试用的///////////////////////////////////////////////////////////////////////
              // var sworkload ="";
              // // var sSLA_TITLE = "";//SLA名称
              // // var sRESPONSE_TIME ="";//服务级别协议中的响应时间
              // // var sRESOLVE_TIME ="";//服务级别协议中的解决时间
              // // var sEXTENDED_DEADLINE ="";//延期截止日期
              // var curdate = new Date();
              // var CountDownMS= 0; //得出时间毫秒差
              // var CountDownH = 0;//得出时间小时差
              // var disTime = dispatchTime;//上级派工时间
              // // if(this.state.itoss.orderDetailData != ""){
              // //   //this.state.itoss.orderDetailData;//工单详情数据
              // //   sSLA_TITLE = this.state.itoss.orderDetailData.SLA_TITLE;//SLA名称
              // //   sRESPONSE_TIME = this.state.itoss.orderDetailData.RESPONSE_TIME;//服务级别协议中的响应时间
              // //   sRESOLVE_TIME = this.state.itoss.orderDetailData.RESOLVE_TIME;//服务级别协议中的解决时间
              // //   sEXTENDED_DEADLINE =this.state.itoss.orderDetailData.EXTENDED_DEADLINE;//延期截止日期
              // // };
              // // if(sSLA_TITLE != ""){
              // //   //服务级别协议不为空，需要计算时长
              // //   var dt_RESPONSE_TIME = DateChange.strToDate(sRESPONSE_TIME);
              // //   if(sEXTENDED_DEADLINE != ""){
              // //     //有延期时间
              // //     var dt_EXTENDED_DEADLINE = DateChange.strToDate(sEXTENDED_DEADLINE);
              // //     if(curdate.getTime() > dt_EXTENDED_DEADLINE.getTime()) {
              // //        //当前时间大于延期时间
              // //        CountDownMS = curdate.getTime() - dt_RESPONSE_TIME.getTime();//得出时间毫秒差
              // //     }else{
              // //        CountDownMS = dt_EXTENDED_DEADLINE.getTime() - dt_RESPONSE_TIME.getTime();//得出时间毫秒差
              // //     }
              // //   }else{
              // //     //无延期时间
              // //     var dt_RESOLVE_TIME = DateChange.strToDate(sRESOLVE_TIME);   //解决时间
              // //     if(curdate.getTime() > dt_RESOLVE_TIME.getTime()) {
              // //        //当前时间大于解决时间
              // //        CountDownMS = curdate.getTime() - dt_RESPONSE_TIME.getTime();//得出时间毫秒差
              // //     }else{
              // //       CountDownMS = dt_RESOLVE_TIME.getTime() - dt_RESPONSE_TIME.getTime();//得出时间毫秒差
              // //     }
              // //   }
              // // };
              // CountDownMS = curdate.getTime() - disTime.getTime();//得出时间毫秒差
              // if(CountDownMS > 0){
              //   CountDownH = Math.floor(CountDownMS / (1000 * 60 * 60));//得出两个日期之间 时间小时差
              //   sworkload =String(CountDownH);
              // };
              /////////////////////////////////////////////////////////////////////////////////////////////

              //初始 下级处理人员为 工单创建人
              currentNextPerson = this.props.currentNextPerson;
              NextPers = workFlowLogData[workFlowLogData.length -1].FromUser;
              var FlowPersonnelList = this.props.flowPersonnelListData;
              var email = "";
              if(FlowPersonnelList){
                for(var u=0;u<FlowPersonnelList.length;u++){
                  if(FlowPersonnelList[u].name == NextPers && FlowPersonnelList[u].roleName == workFlowLogData[workFlowLogData.length -1].FromId){
                    email = FlowPersonnelList[u].email;
                    break;
                  }
                };
              };
              if(currentNextPerson == ""){
                //设置 下级处理人员 数据
                var nextPersdata =[{
                  name:NextPers,
                  roleName:workFlowLogData[workFlowLogData.length -1].FromId,
                  email:email
                }];
                this.props.setCurrentNextPerson(nextPersdata);
              }
              else {
                if(currentNextPerson[0].email != email){
                  //设置 下级处理人员 数据
                  var nextPersdata =[{
                    name:currentNextPerson[0].name,
                    roleName:currentNextPerson[0].roleName,
                    email:email
                  }];
                  this.props.setCurrentNextPerson(nextPersdata);
                }
              }
            }
            else if (this.props.curWorkOrderStatus == "sqyq" && Flag == true){
                // Flag 是否是维护人员(false 不是，true 是)
                //工单暂不能向下级流转
                $('#saveEditOrderHandleFlow').attr("disabled",true);//保存处理表单数据按钮
                $("#saveEditOrderHandleFlow").css('background-color',"#ddd");
                $('#openOperPersTableModal').attr("disabled",true);//打开选择流转人员页
                $("#openOperPersTableModal").css('background-color',"#ddd");

                $('#saveEditOrderSendEmailHandleFlow').attr("disabled",true);//保存并发送邮件 处理表单数据按钮
                $("#saveEditOrderSendEmailHandleFlow").css('background-color',"#ddd");
                $('#editOperationHandleProcess').attr("disabled",true);//将处理过程 input元素设置为disabled

                // NextPers = workFlowLogData[workFlowLogData.length -1].FromUser;
                // currentNextPerson = this.props.CurrentNextPerson;
                // if(currentNextPerson == ""){
                //   //设置 下级处理人员 数据
                //   var nextPersdata =[{
                //     name:NextPers,
                //     roleName:workFlowLogData[workFlowLogData.length -1].FromId,
                //     email:""
                //   }];
                //   this.props.setCurrentNextPerson(nextPersdata);
                // };
            }
            else if (this.props.curWorkOrderStatus == "sqyq" && Flag == false){
                // Flag 是否是维护人员(false 不是，true 是)
                //工单暂不能向下级流转
                $('#saveEditOrderHandleFlow').attr("disabled",true);//保存处理表单数据按钮
                $("#saveEditOrderHandleFlow").css('background-color',"#ddd");
                $('#openOperPersTableModal').attr("disabled",true);//打开选择流转人员页
                $("#openOperPersTableModal").css('background-color',"#ddd");
                $('#saveEditOrderSendEmailHandleFlow').attr("disabled",true);//保存并发送邮件 处理表单数据按钮
                $("#saveEditOrderSendEmailHandleFlow").css('background-color',"#ddd");
                $('#editOperationHandleProcess').attr("disabled",true);//将处理过程 input元素设置为disabled
            }
            else if( (this.props.curWorkOrderStatus == "sqyqpf" || this.props.curWorkOrderStatus == "sqyqjj") && Flag == true){
                //工单能向下级流转了
                //$('#saveEditOrderHandleFlow').attr("disabled",false);//保存处理表单数据按钮
                //$('#openOperPersTableModal').attr("disabled",false);//打开选择流转人员页
                //$('#saveEditOrderSendEmailHandleFlow').attr("disabled",false);//保存并发送邮件 处理表单数据按钮
                var FlowPersonnelList = this.props.flowPersonnelListData;
                var email = "";
                if(FlowPersonnelList){
                  for(var u=0;u<FlowPersonnelList.length;u++){
                    if(FlowPersonnelList[u].name == NextPers && FlowPersonnelList[u].roleName == workFlowLogData[workFlowLogData.length -1].FromId){
                      email = FlowPersonnelList[u].email;
                      break;
                    }
                  };
                };
                currentNextPerson = this.props.currentNextPerson;
                if(currentNextPerson == ""){
                  NextPers = workFlowLogData[workFlowLogData.length -1].FromUser;
                  //设置 下级处理人员 数据
                  var nextPersdata =[{
                    name:NextPers,
                    roleName:workFlowLogData[workFlowLogData.length -1].FromId,
                    email:email
                  }];
                  this.props.setCurrentNextPerson(nextPersdata);
                };
            }
         }
         else {
          //处理表单不是当前处理打开的
          // dispatchTime = null;//上级派工时间
          // arrivalTime =  null;//响应时间
          if(this.props.curWorkOrderStatus == "cl" || this.props.curWorkOrderStatus == "sqyq"){
            if(this.props.orderDetailData != ""){
              if(this.props.orderDetailData.WORKORDER_RESPONSETIME != ""){
                 //维护人员工单响应时间
                 arrivalTime = DateChange.strToDate(this.props.orderDetailData.WORKORDER_RESPONSETIME);
              };
            };
          };
          //$('#editOperationHandleResponseTime').attr("disabled",true);//将input元素设置为disabled
          //$("#editOperationHandleResponseTime").val(arrivalTime);

          if(workFlowLogData[0].DispatchTime != "/Date(-28800000)/"){
            dispatchTime = workFlowLogData[0].DispatchTime;//派工时间
            dispatchTime = new Date(parseInt(dispatchTime.substring(6, (dispatchTime.length - 2))));
          };
          //$("#editOperationHandleDisTime").find('input').val(dispatchTime);

          //NextPers=workFlowLogData[0].ToUser;//下级处理人
          //$("#editOperationHandleCurrentPers").val(workFlowLogData[0].ToUser);//当前处理人
          //this.setState({currentPers:workFlowLogData[0].ToUser});
          currentPers = workFlowLogData[0].ToUser;//当前处理人
          fromuser = workFlowLogData[0].FromUser;//上级处理人
          $('#openOperPersTableModal').attr("disabled",true);//打开选择流转人员页
          $("#openOperPersTableModal").css('background-color',"#ddd");
          $("#saveEditOrderHandleFlow").css('background-color',"#ddd");
          $('#saveEditOrderHandleFlow').attr("disabled",true);//保存处理表单数据按钮
          $('#editOperationHandleProcess').attr("disabled",true);//将input元素设置为disabled
          $("#saveEditOrderSendEmailHandleFlow").css('background-color',"#ddd");
          $('#saveEditOrderSendEmailHandleFlow').attr("disabled",true);//保存并发送邮件 处理表单数据按钮

          if(document.getElementById('closeEditOrderHandleFlow') != null){
            //控制是否显示关闭 按钮
            document.getElementById('closeEditOrderHandleFlow').style.display = 'none';
          }
        }
    }
    else {
      //为草稿工单
      arrivalTime =  null;//响应时间
      dispatchTime = new Date();//派工时间
      //$("#editOperationHandleDisTime").find('input').val(new Date());
      //$("#editOperationHandleResponseTime").find('input').val(arrivalTime);
    };
    var content = "";//本人处理意见
    var sjcontent = "";//上级处理意见
    if(WorkOrderProcessLogData.length > 0){
      // for(var i=0;i<WorkOrderProcessLogData.length;i++){
      //   var yjTime = WorkOrderProcessLogData[i].CreatedDateTime;
      //   yjTime = DateChange.toDate(yjTime);
      //   if(i== 0){
      //     sjcontent = (i+1) +".处理人："+ WorkOrderProcessLogData[i].Handler +"  处理意见："+ WorkOrderProcessLogData[i].Content + " 时间:"+ yjTime + "\n";
      //   }else{
      //     sjcontent = sjcontent + (i+1) +".处理人："+ WorkOrderProcessLogData[i].Handler +"  处理意见："+ WorkOrderProcessLogData[i].Content + " 时间:"+ yjTime + "\n";
      //   }
      // };
      var xhwop = 1;
      var sumcs = WorkOrderProcessLogData.length - 1;
      for(var i=sumcs;i>=0;i--){
        var yjTime = WorkOrderProcessLogData[i].CreatedDateTime;
        yjTime = DateChange.toDate(yjTime);
        if(i== sumcs){
          sjcontent = xhwop +".处理人："+ WorkOrderProcessLogData[i].Handler +"  处理意见："+ WorkOrderProcessLogData[i].Content + " 时间:"+ yjTime + "\n";
        }else{
          sjcontent = sjcontent + xhwop +".处理人："+ WorkOrderProcessLogData[i].Handler +"  处理意见："+ WorkOrderProcessLogData[i].Content + " 时间:"+ yjTime + "\n";
        }
        xhwop ++;
      };
    };
    return (
      <div className="operationHandleDiv operationFormDiv">
        <div className="operationHandleTable2">
          <table>
            <tbody>
              <tr>
                <th>上级处理人</th>
                <td><input type="text" className="form-control" id="editOperationHandlePreviousPers" value={fromuser} disabled /></td>
                <th>当前处理人</th>
                <td><input type="text" className="form-control" id="editOperationHandleCurrentPers" value={currentPers} disabled /></td>
              </tr>
              <tr>
                <th>响应时间</th>
                <td><ReactWidgets.DateTimePicker format={"yyyy-MM-dd HH:mm:ss"} id="editOperationHandleResponseTime" value={arrivalTime} disabled onChange={this.onChangeNothing}/></td>
                <th>派工时间</th>
                <td><ReactWidgets.DateTimePicker format={"yyyy-MM-dd HH:mm:ss"} id="editOperationHandleDisTime" value={dispatchTime} disabled onChange={this.onChangeNothing}/></td>
              </tr>
              <tr>
                <th>上级处理意见</th>
                <td colSpan="5"><textarea rows="4" className="form-control" id="editOperationHandlePreviousOpinion" value={sjcontent} disabled></textarea></td>
              </tr>
              <tr>
                <th>处理过程</th>
                <td colSpan="5"><textarea rows="6" className="form-control" id="editOperationHandleProcess"></textarea></td>
              </tr>
            </tbody>
          </table>
          <div className="operationHandleButton">
            <button className="personFlowButton" data-toggle="modal" id="openOperPersTableModal" onClick={this._handleOnClickSelect}>人员流转</button>
            <table>
              <tbody>
                <tr>
                  <th>下级处理人</th>
                  <td><input type="text" className="form-control" id="editOperationHandleNextPers" disabled/></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = editOperationHandle;
