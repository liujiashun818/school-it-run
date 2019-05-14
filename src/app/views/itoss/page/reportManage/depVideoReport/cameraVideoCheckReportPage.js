/**
 * Created by yinxuexue on 2016/02/19.
 * 厅级视频类设备报表-摄像机视频考核
 */
require('bootstrap');

var React = require('react');

var HomePage = require('../../homePage');

var CameraVideoCheckReport = React.createClass({
    render: function() {
        return (
            <HomePage pageId={220}/>
        );
    }
});

module.exports = CameraVideoCheckReport;
