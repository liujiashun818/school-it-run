var React = require('react');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var History = ReactRouter.History;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

//discard 该方法被废弃
var NavLeft = React.createClass({
  mixins: [History],
  _handleOnClick: function(e) {
      if(e.target.id == 'overview'){
          this.history.pushState(null,'baseManage/slaList');
      }else if(e.target.id == 'create'){
          this.history.pushState(null,'baseManage/slaAdd');
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
  },
    render: function() {
      // var slaLimitObj = this.getFlux().store("YFTSlaStore").getState().slaLimitObj;
        return (
          <div className='leftListDiv col-md-1 yunweiLeft'>
            <div className="assetManageListDiv">
                <div className="iq-list">
                    <div className="list-group">
                        { slaLimitObj.slaList ? <a className="list-group-item" id="overview" style={{cursor:'pointer'}} onClick={this._handleOnClick}>服务级别列表</a> : ""}
                        { slaLimitObj.slaAdd ? <a className="list-group-item" id="create" style={{cursor:'pointer'}} onClick={this._handleOnClick}>新建服务级别协议</a> : ""}
                    </div>
                </div>
            </div>
          </div>
        );
    }
});

var RepositoryTitle = React.createClass({
    render: function() {
        return (
          <div className="titleDiv col-md-12">
              <div className="titleLeft">
                  服务级别协议-{this.props.title}
              </div>
              <div className="titleRight2">
                  <a href={this.props.returnUrl}>{this.props.returnUrlName}</a>
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
