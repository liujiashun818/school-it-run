require('bootstrap');
require('jQuery');
var React = require('react');
var ReactDOM = require('react-dom');

//消息提示框
var InfoPrompt = React.createClass({
  render: function() {
    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">提示</h4>
            </div>
            <div className="modal-body">
              {this.props.content}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// PaginationTable 分页请求表格
/*
* @param: initFrom(int) //初始from
* @param: initNumPerPage(int) //初始numPerPage
* @param: initCurrentPage(int) //初始currentPage
* @param: state(obj) //state对象
* @param: columns(Obj) //表格字段对象
* @param: list(Obj) //源数据对象
* @param: id(string) //表格DOM ID
* @param: count(int) //源数据总数
* @param: noTableTool(bool)[OP] //不显示表格工具栏
* @param: requestBtnId(str)[OP] //查询按钮的 DOM ID
* @param: onClickRow(func(e)) //点击行触发函数
* @param: onClickSort(func({name,order})) //点击排序触发函数
* @param: onClickRefresh(func()) //点击刷新触发函数
* @param: setState(func({},function())) //设置父类state
* @param: request(func({range:{from,to}})) //点击页码触发函数
*/
var PaginationTable = React.createClass({//表格组件
    getInitialState: function() {
        return {
            from: this.props.initFrom,
            numPerPage: this.props.initNumPerPage,
            currentPage: this.props.initCurrentPage,
            sort_name: "",
            sort_order: "",
        }
    },
    componentDidMount: function() {
        this._initTable();
    },
    componentDidUpdate: function() {
        var _this = this;
        var table = $('#'+this.props.id);
        table.bootstrapTable('refreshOptions',{data: this.props.list});
        if(this.props.requestBtnId) {
            var B = $("#"+this.props.requestBtnId);
            B.unbind("click");
            B.click(function(e){
                _this.setState({
                    from: _this.props.initFrom,
                    currentPage: _this.props.initCurrentPage,
                })
            })
        }
    },
    render: function(){
        var showFrom = this.state.from;
        var showTo = showFrom+this.state.numPerPage-1;
        var showAmount = this.props.count;
        if(showTo>showAmount) showTo = showAmount;
        if(showAmount==0){
            showFrom = 0;
            showTo = 0;
        }
        return (
            <div>
                <table id={this.props.id}
                       data-toggle='table'
                       data-classes='table table-no-bordered table-hover'
                       data-show-refresh={this.props.noTableTool?'false':'true'}
                       data-show-toggle={this.props.noTableTool?'false':'true'}
                       data-show-columns={this.props.noTableTool?'false':'true'}
                       data-click-to-select='true'
                       data-resizable='true'>
                </table>
                <div className="fixed-table-pagination">
                    <div id="pagination-detail" className="pull-left pagination-detail">
                        <span className="pagination-info">显示第 {showFrom} 到第 {showTo} 条记录，总共 {showAmount} 条记录</span>
                        <span className="page-list">
                            {"每页显示 "}
                            <span className="btn-group dropup">
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.state.numPerPage} <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" id="select-numPerPage-list">
                                    <li onClick={this._handleOnClickPageList}><a href="javascript:void(0)" data-val={10} >10</a></li>
                                    <li className="active" onClick={this._handleOnClickPageList}><a href="javascript:void(0)" data-val={25} >25</a></li>
                                    <li onClick={this._handleOnClickPageList}><a href="javascript:void(0)" data-val={50} >50</a></li>
                                    <li onClick={this._handleOnClickPageList}><a href="javascript:void(0)" data-val={100} >100</a></li>
                                </ul>
                            </span>
                            {" 条记录"}
                        </span>
                    </div>
                    <div id="pagination" className="pull-right pagination">
                        {this._getPageNumberLi()}
                    </div>
                </div>
            </div>
        );
    },
    _initTable: function(){
        $('#'+this.props.id).bootstrapTable({
            columns: this.props.columns,
            data: [],
            onClickRow: this._onClickRow,
            onSort: this._onClickSort,
            onPostHeader: this._onLoadTableHeader,
        });
    },
    _onClickRow: function(e){
        this.props.onClickRow(e);
    },
    _onClickSort: function(e){
        var _this = this;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        var D = DOMNode.find("th[data-field="+e+"]").find(".sortable");
        var order = "";
        if(D.hasClass("desc")) {//降序变升序
            order = "asc";
        }
        else if(D.hasClass("asc")) {//升序变降序
            order = "desc";
        }
        else {//无序变降序
            order = "desc";
        }
        this.setState({
            sort_name: e,
            sort_order: order,
        },function(){//请求服务器
            var _from = _this.state.from;
            var _to = _from+_this.state.numPerPage-1;
            if(_to>_this.props.count) _to = _this.props.count;
            var sort_name = _this.state.sort_name==""?undefined:_this.state.sort_name;
            var sort_order = _this.state.sort_order==""?undefined:_this.state.sort_order;
            _this.props.setState({
                sort_name: sort_name,
                sort_order: sort_order,
            },function(){
                _this.props.request({
                    range:{
                        from: _from,
                        to: _to,
                    },
                });
            });
        });
    },
    _onLoadTableHeader: function(){
        var _this = this;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        var B = DOMNode.find('button[name="refresh"]');
        B.unbind("click");
        B.click(function(e){//按下刷新按钮
            _this.setState({
                from: _this.props.initFrom,
                currentPage: _this.props.initCurrentPage,
            },function(){
                _this.props.onClickRefresh(_this.state);
            })
        })
    },
    _handleOnClickPageList: function(e){
        var _this = this;
        var val = parseInt($(e.target).data("val"),10);
        var aimFrom = 0;
        var currentPage = this.state.currentPage;
        var amount = this.props.count;
        var totalPageNum = Math.ceil(amount/val);
        if(currentPage>totalPageNum) currentPage=totalPageNum;
        if(currentPage>0) aimFrom = (currentPage-1)*val+1;
        else aimFrom = 1;
        this.setState({
            numPerPage: val,
            currentPage: currentPage,
            from: aimFrom,
        },function(){
            $("#select-numPerPage-list li").removeClass("active");
            $("#select-numPerPage-list li").each(function(){
                var a = $(this).find("a");
                if(a.data("val")==_this.state.numPerPage){
                    $(this).addClass("active");
                }
            });
            //请求服务器
            var _from = aimFrom;
            var _to = _from+val-1;
            if(_to>_this.props.count) _to = _this.props.count;
            //判断sort参数
            var sort_name = _this.state.sort_name==""?undefined:_this.state.sort_name;
            var sort_order = _this.state.sort_order==""?undefined:_this.state.sort_order;
            if(_this.props.setState){//如果有setState参数
                _this.props.setState({
                    numPerPage: this.state.numPerPage,
                },function(){
                    _this.props.request({
                        range:{
                            from: _from,
                            to: _to,
                        },
                        sort_name: sort_name,
                        sort_order: sort_order,
                    });
                });
            }
            else{//如果没有setState参数
                _this.props.request({
                    range:{
                        from: _from,
                        to: _to,
                    },
                    sort_name: sort_name,
                    sort_order: sort_order,
                });
            }
        });
    },
    _handleOnClickPage: function(e){
        var _this = this;
        var val = $(e.target).text();
        var aim = 0;
        var aimFrom = 0;
        var amount = this.props.count;
        var totalPageNum = Math.ceil(amount/this.state.numPerPage);
        switch(val){
            case "«"://第一页
                aim=1;
                break;
            case "‹"://上一页
                aim=this.state.currentPage-1;
                if(aim<1) aim=1;
                break;
            case "»"://最后一页
                aim=totalPageNum;
                break;
            case "›"://下一页
                aim=this.state.currentPage+1;
                if(aim>totalPageNum) aim=totalPageNum;
                break;
            default://页码
                aim=parseInt(val,10);
                break;
        }
        aimFrom = (aim-1)*this.state.numPerPage+1;
        this.setState({
            currentPage: aim,
            from: aimFrom,
        },function(){//请求服务器
            var _from = aimFrom;
            var numPerPage = _this.state.numPerPage
            var _to = _from+numPerPage-1;
            if(_to>_this.props.count) _to = _this.props.count;
            //判断sort参数
            var sort_name = _this.state.sort_name==""?undefined:_this.state.sort_name;
            var sort_order = _this.state.sort_order==""?undefined:_this.state.sort_order;
            _this.props.request({
                range:{
                    from: _from,
                    to: _to,
                },
                sort_name: sort_name,
                sort_order: sort_order,
            });
        });
    },
    _getPageNumberLi: function() {
        var _this = this;
        var amount = this.props.count;
        var totalPageNum = Math.ceil(amount/this.state.numPerPage);
        var pageArray = [];
        if(totalPageNum<=1) return null;
        var disable_first = this.state.currentPage==1;
        var disable_last = this.state.currentPage==totalPageNum;
        if(totalPageNum<=5) {
            for(var i = 0; i < totalPageNum; i++) {
                pageArray.push(i+1);
            }
            return (
                <ul id="pagination-list" className="pagination">
                    <li className={disable_first?"page-first disabled":"page-first"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">«</a></li>
                    <li className={disable_first?"page-pre disabled":"page-pre"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">‹</a></li>
                    {
                        pageArray.map(function(page) {
                            var active = page==_this.state.currentPage;
                            return (<li className={active?"page-number active":"page-number"} onClick={_this._handleOnClickPage}><a href="javascript:void(0)">{page}</a></li>);
                        })
                    }
                    <li className={disable_last?"page-next disabled":"page-next"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">›</a></li>
                    <li className={disable_last?"page-last disabled":"page-last"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
        else if(this.state.currentPage<=3) {
            return (
                <ul id="pagination-list" className="pagination">
                    <li className={disable_first?"page-first disabled":"page-first"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">«</a></li>
                    <li className={disable_first?"page-pre disabled":"page-pre"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">‹</a></li>
                    <li className={this.state.currentPage==1?"page-number active":"page-number"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">1</a></li>
                    <li className={this.state.currentPage==2?"page-number active":"page-number"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">2</a></li>
                    <li className={this.state.currentPage==3?"page-number active":"page-number"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">3</a></li>
                    <li className={this.state.currentPage==4?"page-number active":"page-number"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">4</a></li>
                    <li className={this.state.currentPage==5?"page-number active":"page-number"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">5</a></li>
                    <li className={disable_last?"page-next disabled":"page-next"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">›</a></li>
                    <li className={disable_last?"page-last disabled":"page-last"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
        else if(totalPageNum-this.state.currentPage<=2) {
            return (
                <ul id="pagination-list" className="pagination">
                    <li className={disable_first?"page-first disabled":"page-first"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">«</a></li>
                    <li className={disable_first?"page-pre disabled":"page-pre"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">‹</a></li>
                    <li className={this.state.currentPage==(totalPageNum-4)?"page-number active":"page-number"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">{totalPageNum-4}</a></li>
                    <li className={this.state.currentPage==(totalPageNum-3)?"page-number active":"page-number"}  onClick={this._handleOnClickPage}><a href="javascript:void(0)">{totalPageNum-3}</a></li>
                    <li className={this.state.currentPage==(totalPageNum-2)?"page-number active":"page-number"}  onClick={this._handleOnClickPage}><a href="javascript:void(0)">{totalPageNum-2}</a></li>
                    <li className={this.state.currentPage==(totalPageNum-1)?"page-number active":"page-number"}  onClick={this._handleOnClickPage}><a href="javascript:void(0)">{totalPageNum-1}</a></li>
                    <li className={this.state.currentPage==totalPageNum?"page-number active":"page-number"}  onClick={this._handleOnClickPage}><a href="javascript:void(0)">{totalPageNum}</a></li>
                    <li className={disable_last?"page-next disabled":"page-next"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">›</a></li>
                    <li className={disable_last?"page-last disabled":"page-last"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
        else {
            var pageArray = [this.state.currentPage-2, this.state.currentPage-1, this.state.currentPage, this.state.currentPage+1, this.state.currentPage+2];
            return (
                <ul id="pagination-list" className="pagination">
                    <li className={disable_first?"page-first disabled":"page-first"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">«</a></li>
                    <li className={disable_first?"page-pre disabled":"page-pre"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">‹</a></li>
                    {
                        pageArray.map(function(page) {
                            var active = page==_this.state.currentPage;
                            return (<li className={active?"page-number active":"page-number"} onClick={_this._handleOnClickPage}><a href="javascript:void(0)">{page}</a></li>);
                        })
                    }
                    <li className={disable_last?"page-next disabled":"page-next"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">›</a></li>
                    <li className={disable_last?"page-last disabled":"page-last"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
    },
});

module.exports={
  InfoPrompt: InfoPrompt,
  PaginationTable: PaginationTable,
}
