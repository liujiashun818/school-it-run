/**
* xuexue.yin  2016/01/14.
* 工单人员流转
*/
var React = require('react');
require('bootstrap');

var OperationPersonnelModal = React.createClass({
    componentDidMount: function(){
      var that = this;
      if (this.isMounted()) {
        setTimeout(function(){
          $('#operationPersonnelTable').bootstrapTable({
              columns: [
                  {
                      field: 'state',
                      radio: true
                  }, {
                      title: '姓名',
                      field: 'name',
                      sortable: true
                  }, {
                      title: '用户名',
                      field: 'loginId',
                      // halign: 'center',
                      // align: 'center',
                      sortable: true
                  }, {
                      title: '角色名称',
                      field: 'roleName',
                      // halign: 'center',
                      // align: 'center',
                      sortable: true
                  }, {
                      title: '邮箱',
                      field: 'email',
                      // halign: 'center',
                      // align: 'center',
                      sortable: true
                  }, {
                      title: '用户ID',
                      field: 'recId',
                      halign: 'center',
                      align: 'center',
                      sortable: false,
                      visible:false
                  }
              ],
              data: that.props.flowPersonnelListData,
              clickToSelect: true
          });
        },500);
      }
    },
    componentDidUpdate: function() {
      var that = this;
      setTimeout(function(){
        $('#operationPersonnelTable').bootstrapTable('refreshOptions', {data: that.props.flowPersonnelListData});
      },300);
    },
    _handleOnClickOK: function() {
        var selections = $('#operationPersonnelTable').bootstrapTable('getSelections');
        if(selections.length > 0){
          //this.getFlux().actions.YFTOperationFlowActions.set_CurrentNextPerson(selections);
          this.props.setCurrentNextPerson(selections);
        };
    },
    render : function(){
        return (
            <div className="modal fade" id="operationPersonnelTableModal" tabIndex="-1" role="dialog" aria-labelledby="filtrationFieldModalLabel" aria-hidden="true">
                <div className="modal-dialog assetTableModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">选择需要流转人员</h4>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <table id='operationPersonnelTable'
                                       data-toggle='table'
                                       data-search='true'
                                       data-classes='table table-no-bordered table-hover'
                                       data-show-refresh='true'
                                       data-show-toggle='true'
                                       data-show-columns='true'
                                       data-pagination='true'
                                       data-page-size='10'
                                       data-resizable='true'>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickOK}>确定</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = OperationPersonnelModal;
