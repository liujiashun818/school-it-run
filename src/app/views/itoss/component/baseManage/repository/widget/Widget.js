var React = require('react');
var ReactRouter = require('react-router');
// var Navigation = require('react-router').Navigation;
var History = ReactRouter.History;
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
var CommonTree = require('../../../monitorTree/commonTree');
var Util = require('../../util');
var NavLeft = React.createClass({
    mixins: [History],
    getInitialState:function(){
      return{
        treeData:[]
      }
    },
    _handleOnClick: function(e) {
        if(e.target.id == 'overview'){
            this.history.pushState(null,'baseManage/repositoryList');
        }else if(e.target.id == 'allocate'){
            this.history.pushState(null,'baseManage/repositoryApproval');
        }
    },
    componentDidMount:function(){
      $(".list-group").find("a").each(function(){
        var $node = $(this);
        $node.mouseover(function(){
          var claz = $node.attr("class");
          var ind = claz.indexOf("active");
          if(ind>=0){
            $node.attr("class","");
            $node.attr("class","list-group-item fadeInMenu active");
          }else{
            $node.attr("class","list-group-item fadeInMenuHover");
          };
        });
        $node.mouseout(function(){
          var claz = $node.attr("class");
          var ind = claz.indexOf("active");
          if(ind>=0){
            $node.attr("class","");
            $node.attr("class","list-group-item fadeInMenu active");
          }else{
            $node.attr("class","list-group-item fadeOutMenuHover");
          };
        });
      });

      var list = [];
      var  repositoryLimitObj = Util.getSlaLimit();
      if(repositoryLimitObj.repositoryList){
        list.push({id:1,name:"知识清单",pid:0,toUrl:"baseManage/repositoryList"});
      };
      if(repositoryLimitObj.repositoryApprovalList){
        list.push({id:2,name:"审核知识",pid:0,toUrl:"baseManage/repositoryApproval"});
      };
      this.setState({treeData:list});
    },
    render: function() {
      // var repositoryLimitObj = this.getFlux().store("YFTRepositoryStore").getState().repositoryLimitObj;
      var  repositoryLimitObj = Util.getSlaLimit();
      // var list = [];
      // if(repositoryLimitObj.repositoryList){
      //   list.push({id:1,name:"知识清单",pid:0,toUrl:"baseManage/repositoryList"});
      // };
      // if(repositoryLimitObj.repositoryApprovalList){
      //   list.push({id:2,name:"审核知识",pid:0,toUrl:"baseManage/repositoryApproval"});s
      // };
      var treeData = this.state.treeData;
      if(treeData.length > 0 && treeData != null){
        return (
          <div className='leftListDiv col-md-1 yunweiLeft'>
            <div className="assetManageListDiv">
                <CommonTree data={treeData} curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
                 onGetCurThreeNode={this.props.onGetCurThreeNode} onGetPreThreeNode={this.props.onGetPreThreeNode}
                 curName={this.props.curName} setCurName={this.props.setCurName}
                />
            </div>
          </div>
        );
      }else{
        return (
          <div className='leftListDiv col-md-1 yunweiLeft'>
            <div className="assetManageListDiv">

              <div className="iq-list">
                  <div className="list-group">
                    {repositoryLimitObj.repositoryList ? <a className="list-group-item" id="overview" onClick={this._handleOnClick}>知识清单</a> : ""}
                    {repositoryLimitObj.repositoryApprovalList ? <a className="list-group-item" id="allocate" onClick={this._handleOnClick}>审核知识</a> :""}
                  </div>
              </div>
              {/***<CommonTree data={list} selectedNode={0}/>*/}
            </div>
          </div>
        );
      };
    }
});

var RepositoryTitle = React.createClass({
    mixins: [History],
    onhandleClick:function(){
        // var zTree = $.fn.zTree.getZTreeObj("commonTree");
        // var treeNodes = zTree.getNodes();
        // var beforeNode = null;
        // var targetNode = null;
        // if(this.props.returnUrl == "baseManage/repositoryList"){
        //   beforeNode = zTree.getNodeByParam("name","知识清单");
        //   targetNode = zTree.getNodeByParam("name","知识清单");
        // }
        // else if(this.props.returnUrl == "baseManage/repositoryApproval"){
        //   beforeNode = zTree.getNodeByParam("name","审核知识");
        //   targetNode = zTree.getNodeByParam("name","审核知识");
        // };
        // var tid = targetNode.tId;
        // var tIndex = zTree.getNodeIndex(targetNode);
        // document.getElementById(tid).className = "fadeInMenu";
        // zTree.selectNode(targetNode);
        // this.getFlux().actions.YFTIndexActions.set_linshiData(tIndex);
        // this.getFlux().actions.YFTIndexActions.set_linshiNode(beforeNode);

        this.props.setCurName(this.props.paterName);
        this.history.pushState(null,this.props.returnUrl);
    },
    render: function() {
        return (
          <div className="titleDiv col-md-12">
              <div className="titleLeft">
                  知识库-{this.props.title}
              </div>
              <div className="titleRight2">
                  <a href="javascript:void(0)" onClick={this.onhandleClick}>{this.props.returnUrlName}</a>
                  <a ><i title ="返回工作台" className="fa fa-question-circle fa-lg" style={{marginLeft: '8px'}}></i></a>
                  <a href="javascript:void(0)"><i title ="进入设置页" className="fa fa-cog fa-lg" style={{marginLeft: '8px'}}></i></a>
              </div>
          </div>
        );
    }
});

module.exports = {
  NavLeft:NavLeft,
  RepositoryTitle:RepositoryTitle
};
