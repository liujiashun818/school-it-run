require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MonitorTree2 = require('../monitorTree/monitorTree2.js');
var CreateResourceModal = require('./createResourceModal');
var CreateMonitorModal = require('./createMonitorModal');
var ListView_desView = require('./listView_desView');

var oData = [
  {
    "id": "se",
    "icon": "./img/itoss/logo-3.png",
    "name": "监测树",
    "open": true,
    "parent": true,
    "pid": "",
    "type": "root"
  },
  {
    "id": "9D5D405DC33E4AB1B0B0F52D1B2BDCD1",
    "icon": "./img/itoss/groupwarning.png",
    "name": "湖南省公安厅(2/5177)",
    "open": false,
    "parent": false,
    "pid": "se",
    "type": "group"
  },
  {
    "id": "8A828A7651F84C438A2AA24AA3E0B9DC",
    "icon": "./img/itoss/groupgood.png",
    "name": "长沙市公安局(2/5177)",
    "open": false,
    "parent": false,
    "pid": "9D5D405DC33E4AB1B0B0F52D1B2BDCD1",
    "type": "group"
  },
  {
    "id": "A3705993EA9F4B76A7C09A3921AB4B3B",
    "icon": "./img/itoss/groupgood.png",
    "name": "市辖区公安局(0/0)",
    "open": false,
    "parent": false,
    "pid": "8A828A7651F84C438A2AA24AA3E0B9DC",
    "type": "group"
  },
  {
    "id": "C0F42B73815B40218109A657CFBCA144",
    "icon": "./img/itoss/groupgood.png",
    "name": "DVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "A3705993EA9F4B76A7C09A3921AB4B3B",
    "type": "group"
  },
  {
    "id": "09B6641BD8384807A63F171548372547",
    "icon": "./img/itoss/groupgood.png",
    "name": "NVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "A3705993EA9F4B76A7C09A3921AB4B3B",
    "type": "group"
  },
  {
    "id": "BF63601AE7144A24B2D1A8CBD78A8D73",
    "icon": "./img/itoss/groupgood.png",
    "name": "摄像机(0/0)",
    "open": false,
    "parent": false,
    "pid": "A3705993EA9F4B76A7C09A3921AB4B3B",
    "type": "group"
  },
  {
    "id": "339C82C687294F249CCF58D46683AE39",
    "icon": "./img/itoss/groupgood.png",
    "name": "IPSAN(0/0)",
    "open": false,
    "parent": false,
    "pid": "A3705993EA9F4B76A7C09A3921AB4B3B",
    "type": "group"
  },
  {
    "id": "78D594ABA4B140A590119E2BB9CC122B",
    "icon": "./img/itoss/groupgood.png",
    "name": "编码器(0/0)",
    "open": false,
    "parent": false,
    "pid": "A3705993EA9F4B76A7C09A3921AB4B3B",
    "type": "group"
  },
  {
    "id": "4499B2DE526B4A7BBB81E6858E3B9EA9",
    "icon": "./img/itoss/groupgood.png",
    "name": "芙蓉区公安局(0/0)",
    "open": false,
    "parent": false,
    "pid": "8A828A7651F84C438A2AA24AA3E0B9DC",
    "type": "group"
  },
  {
    "id": "1D12042E169F42CE97F1A8028AFE835B",
    "icon": "./img/itoss/groupgood.png",
    "name": "DVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "4499B2DE526B4A7BBB81E6858E3B9EA9",
    "type": "group"
  },
  {
    "id": "930A71B627254AF4AB4C296400C3A3B7",
    "icon": "./img/itoss/groupgood.png",
    "name": "NVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "4499B2DE526B4A7BBB81E6858E3B9EA9",
    "type": "group"
  },
  {
    "id": "B6F36314A66D42A399E7108A7A6EAE49",
    "icon": "./img/itoss/groupgood.png",
    "name": "摄像机(0/0)",
    "open": false,
    "parent": false,
    "pid": "4499B2DE526B4A7BBB81E6858E3B9EA9",
    "type": "group"
  },
  {
    "id": "7F80C75CA6BF4A9C99FFFA10BF2C74F3",
    "icon": "./img/itoss/groupgood.png",
    "name": "IPSAN(0/0)",
    "open": false,
    "parent": false,
    "pid": "4499B2DE526B4A7BBB81E6858E3B9EA9",
    "type": "group"
  },
  {
    "id": "35F1F631B50B47CF9DF73AC2A0A024E7",
    "icon": "./img/itoss/groupgood.png",
    "name": "编码器(0/0)",
    "open": false,
    "parent": false,
    "pid": "4499B2DE526B4A7BBB81E6858E3B9EA9",
    "type": "group"
  },
  {
    "id": "761FFA3050C94B299B7C13495655B28B",
    "icon": "./img/itoss/groupgood.png",
    "name": "天心区公安局(0/0)",
    "open": false,
    "parent": false,
    "pid": "8A828A7651F84C438A2AA24AA3E0B9DC",
    "type": "group"
  },
  {
    "id": "D149A807AC7C4549B18CE8EBE61A6236",
    "icon": "./img/itoss/groupgood.png",
    "name": "DVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "761FFA3050C94B299B7C13495655B28B",
    "type": "group"
  },
  {
    "id": "9C1DC090BA9746FB8A753DBA85EA2B33",
    "icon": "./img/itoss/groupgood.png",
    "name": "NVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "761FFA3050C94B299B7C13495655B28B",
    "type": "group"
  },
  {
    "id": "8088DC12149D4678A96FCBDC4DFF6F12",
    "icon": "./img/itoss/groupgood.png",
    "name": "摄像机(0/0)",
    "open": false,
    "parent": false,
    "pid": "761FFA3050C94B299B7C13495655B28B",
    "type": "group"
  },
  {
    "id": "6FA1B00A75AC44F3B396C6EC9B51216E",
    "icon": "./img/itoss/groupgood.png",
    "name": "IPSAN(0/0)",
    "open": false,
    "parent": false,
    "pid": "761FFA3050C94B299B7C13495655B28B",
    "type": "group"
  },
  {
    "id": "784D35D181014737A7C4DC213EB883E4",
    "icon": "./img/itoss/groupgood.png",
    "name": "编码器(0/0)",
    "open": false,
    "parent": false,
    "pid": "761FFA3050C94B299B7C13495655B28B",
    "type": "group"
  },
  {
    "id": "A4BF7BE1091944178410BF3F234E0EF6",
    "icon": "./img/itoss/groupgood.png",
    "name": "岳麓区公安局(0/5128)",
    "open": false,
    "parent": false,
    "pid": "8A828A7651F84C438A2AA24AA3E0B9DC",
    "type": "group"
  },
  {
    "id": "02CA1F71863043A9BBB32F069786F29A",
    "icon": "./img/itoss/groupgood.png",
    "name": "DVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "A4BF7BE1091944178410BF3F234E0EF6",
    "type": "group"
  },
  {
    "id": "1BA1D307954240A2BD56B38D88D5D5AA",
    "icon": "./img/itoss/groupgood.png",
    "name": "NVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "A4BF7BE1091944178410BF3F234E0EF6",
    "type": "group"
  },
  {
    "id": "F5CDC63682344751A2EE8D94BA41A192",
    "icon": "./img/itoss/groupgood.png",
    "name": "摄像机(0/5128)",
    "open": false,
    "parent": false,
    "pid": "A4BF7BE1091944178410BF3F234E0EF6",
    "type": "group"
  },
  {
    "id": "97A199AD8CBE4BF4A77431D582E646C8",
    "icon": "./img/itoss/groupgood.png",
    "name": "IPSAN(0/0)",
    "open": false,
    "parent": false,
    "pid": "A4BF7BE1091944178410BF3F234E0EF6",
    "type": "group"
  },
  {
    "id": "99FBE77B9002498CB74FF5C4271FA242",
    "icon": "./img/itoss/groupgood.png",
    "name": "编码器(0/0)",
    "open": false,
    "parent": false,
    "pid": "A4BF7BE1091944178410BF3F234E0EF6",
    "type": "group"
  },
  {
    "id": "93A0803EA0584DC9A2D8E3E765E01778",
    "icon": "./img/itoss/groupgood.png",
    "name": "开福区公安局(0/0)",
    "open": false,
    "parent": false,
    "pid": "8A828A7651F84C438A2AA24AA3E0B9DC",
    "type": "group"
  },
  {
    "id": "421844F5DBCD4A62AEA594471FC00948",
    "icon": "./img/itoss/groupgood.png",
    "name": "DVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "93A0803EA0584DC9A2D8E3E765E01778",
    "type": "group"
  },
  {
    "id": "CE8E972462E84378A56FBB54ED8D4D44",
    "icon": "./img/itoss/groupgood.png",
    "name": "NVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "93A0803EA0584DC9A2D8E3E765E01778",
    "type": "group"
  },
  {
    "id": "6797DE74B1DB4D888FA2DBAD7AFF8DD8",
    "icon": "./img/itoss/groupgood.png",
    "name": "摄像机(0/0)",
    "open": false,
    "parent": false,
    "pid": "93A0803EA0584DC9A2D8E3E765E01778",
    "type": "group"
  },
  {
    "id": "1AE5B748BD204ED19C0CB5CEAA3CFFDD",
    "icon": "./img/itoss/groupgood.png",
    "name": "IPSAN(0/0)",
    "open": false,
    "parent": false,
    "pid": "93A0803EA0584DC9A2D8E3E765E01778",
    "type": "group"
  },
  {
    "id": "5742B2A5BBE44FD88C2D34A3449A8CAA",
    "icon": "./img/itoss/groupgood.png",
    "name": "编码器(0/0)",
    "open": false,
    "parent": false,
    "pid": "93A0803EA0584DC9A2D8E3E765E01778",
    "type": "group"
  },
  {
    "id": "056A72E3229F43BF8A005AB15EE0FE60",
    "icon": "./img/itoss/groupgood.png",
    "name": "雨花区公安局(2/2)",
    "open": false,
    "parent": false,
    "pid": "8A828A7651F84C438A2AA24AA3E0B9DC",
    "type": "group"
  },
  {
    "id": "438FC9AD81BD4FBA9AB957EC2B5C6B6B",
    "icon": "./img/itoss/groupgood.png",
    "name": "DVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "056A72E3229F43BF8A005AB15EE0FE60",
    "type": "group"
  },
  {
    "id": "B2395E8444EA4C129F9DCDD017F01D72",
    "icon": "./img/itoss/groupgood.png",
    "name": "NVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "056A72E3229F43BF8A005AB15EE0FE60",
    "type": "group"
  },
  {
    "id": "7DDF827DDF3B48F6827DBAC52FDAD7BB",
    "icon": "./img/itoss/groupgood.png",
    "name": "摄像机(2/2)",
    "open": false,
    "parent": false,
    "pid": "056A72E3229F43BF8A005AB15EE0FE60",
    "type": "group"
  },
  {
    "id": "4E95F7D668C04C0884F093B0231EC7C1",
    "icon": "./img/itoss/groupgood.png",
    "name": "IPSAN(0/0)",
    "open": false,
    "parent": false,
    "pid": "056A72E3229F43BF8A005AB15EE0FE60",
    "type": "group"
  },
  {
    "id": "27C143B5F6194D9AAD0F15605E060AD1",
    "icon": "./img/itoss/groupgood.png",
    "name": "编码器(0/0)",
    "open": false,
    "parent": false,
    "pid": "056A72E3229F43BF8A005AB15EE0FE60",
    "type": "group"
  },
  {
    "id": "AC68459628D249EC953EF4E31D119D66",
    "icon": "./img/itoss/groupgood.png",
    "name": "望城区公安局(0/0)",
    "open": false,
    "parent": false,
    "pid": "8A828A7651F84C438A2AA24AA3E0B9DC",
    "type": "group"
  },
  {
    "id": "9302F5C78B894BD58C75C403EC83AC40",
    "icon": "./img/itoss/groupgood.png",
    "name": "DVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "AC68459628D249EC953EF4E31D119D66",
    "type": "group"
  },
  {
    "id": "14B54442BBB1478A8128BB17CF8E5B89",
    "icon": "./img/itoss/groupgood.png",
    "name": "NVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "AC68459628D249EC953EF4E31D119D66",
    "type": "group"
  },
  {
    "id": "2F5A31C10A12413CBFC178718C5C3091",
    "icon": "./img/itoss/groupgood.png",
    "name": "摄像机(0/0)",
    "open": false,
    "parent": false,
    "pid": "AC68459628D249EC953EF4E31D119D66",
    "type": "group"
  },
  {
    "id": "DDC8DC3850E84DAB8E5AE0F459EAEBFE",
    "icon": "./img/itoss/groupgood.png",
    "name": "IPSAN(0/0)",
    "open": false,
    "parent": false,
    "pid": "AC68459628D249EC953EF4E31D119D66",
    "type": "group"
  },
  {
    "id": "ED96CE29424049E2AAF4C9DB4C8E2AB3",
    "icon": "./img/itoss/groupgood.png",
    "name": "编码器(0/0)",
    "open": false,
    "parent": false,
    "pid": "AC68459628D249EC953EF4E31D119D66",
    "type": "group"
  },
  {
    "id": "CF818681A1FB4DC1AD21608A252E529C",
    "icon": "./img/itoss/groupgood.png",
    "name": "长沙县公安局(0/47)",
    "open": false,
    "parent": false,
    "pid": "8A828A7651F84C438A2AA24AA3E0B9DC",
    "type": "group"
  },
  {
    "id": "9D36F9EB8FFB4306AEF219BCEC09EDE1",
    "icon": "./img/itoss/groupgood.png",
    "name": "DVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "CF818681A1FB4DC1AD21608A252E529C",
    "type": "group"
  },
  {
    "id": "AC84883A742044A29EEB460C881C0F88",
    "icon": "./img/itoss/groupgood.png",
    "name": "NVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "CF818681A1FB4DC1AD21608A252E529C",
    "type": "group"
  },
  {
    "id": "30B2143D8D1745CD94AEAF58D2A0B285",
    "icon": "./img/itoss/groupgood.png",
    "name": "摄像机(0/47)",
    "open": false,
    "parent": false,
    "pid": "CF818681A1FB4DC1AD21608A252E529C",
    "type": "group"
  },
  {
    "id": "183FF1989D884CDA8EF23EF9DBAC1D44",
    "icon": "./img/itoss/groupgood.png",
    "name": "IPSAN(0/0)",
    "open": false,
    "parent": false,
    "pid": "CF818681A1FB4DC1AD21608A252E529C",
    "type": "group"
  },
  {
    "id": "F4E1F1B69E43484193B94D5C25EE99DB",
    "icon": "./img/itoss/groupgood.png",
    "name": "编码器(0/0)",
    "open": false,
    "parent": false,
    "pid": "CF818681A1FB4DC1AD21608A252E529C",
    "type": "group"
  },
  {
    "id": "E810DE7ABB4E473F89DDCE38662C9F12",
    "icon": "./img/itoss/groupgood.png",
    "name": "宁乡县公安局(0/0)",
    "open": false,
    "parent": false,
    "pid": "8A828A7651F84C438A2AA24AA3E0B9DC",
    "type": "group"
  },
  {
    "id": "22DCA0700E3D4CADB747D350810668CE",
    "icon": "./img/itoss/groupgood.png",
    "name": "DVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "E810DE7ABB4E473F89DDCE38662C9F12",
    "type": "group"
  },
  {
    "id": "ED35F06982374E1FBECC9F051BDA7F25",
    "icon": "./img/itoss/groupgood.png",
    "name": "NVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "E810DE7ABB4E473F89DDCE38662C9F12",
    "type": "group"
  },
  {
    "id": "4A2AB990D16C40C880616F5E281F96D6",
    "icon": "./img/itoss/groupgood.png",
    "name": "摄像机(0/0)",
    "open": false,
    "parent": false,
    "pid": "E810DE7ABB4E473F89DDCE38662C9F12",
    "type": "group"
  },
  {
    "id": "3B8B344C22074D98A109F38559F9DA1F",
    "icon": "./img/itoss/groupgood.png",
    "name": "IPSAN(0/0)",
    "open": false,
    "parent": false,
    "pid": "E810DE7ABB4E473F89DDCE38662C9F12",
    "type": "group"
  },
  {
    "id": "F96020FED1EE4F1E87169CD156A555AD",
    "icon": "./img/itoss/groupgood.png",
    "name": "编码器(0/0)",
    "open": false,
    "parent": false,
    "pid": "E810DE7ABB4E473F89DDCE38662C9F12",
    "type": "group"
  },
  {
    "id": "2691D1A90B004F72927A0E2E6C6EE830",
    "icon": "./img/itoss/groupgood.png",
    "name": "浏阳市公安局(0/0)",
    "open": false,
    "parent": false,
    "pid": "8A828A7651F84C438A2AA24AA3E0B9DC",
    "type": "group"
  },
  {
    "id": "B27B1F169D534207B40C9F5DC62E7D00",
    "icon": "./img/itoss/groupgood.png",
    "name": "DVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "2691D1A90B004F72927A0E2E6C6EE830",
    "type": "group"
  },
  {
    "id": "CD0FE6C187264497877C20C29DE80D50",
    "icon": "./img/itoss/groupgood.png",
    "name": "NVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "2691D1A90B004F72927A0E2E6C6EE830",
    "type": "group"
  },
  {
    "id": "3BC54FFAC43449DCAE49C3DBE09699DE",
    "icon": "./img/itoss/groupgood.png",
    "name": "摄像机(0/0)",
    "open": false,
    "parent": false,
    "pid": "2691D1A90B004F72927A0E2E6C6EE830",
    "type": "group"
  },
  {
    "id": "6AB5BEB3B05F47ACA491B91A13AC0CBA",
    "icon": "./img/itoss/groupgood.png",
    "name": "IPSAN(0/0)",
    "open": false,
    "parent": false,
    "pid": "2691D1A90B004F72927A0E2E6C6EE830",
    "type": "group"
  },
  {
    "id": "E048FD502E134BE5A6D85E073A84AB9F",
    "icon": "./img/itoss/groupgood.png",
    "name": "编码器(0/0)",
    "open": false,
    "parent": false,
    "pid": "2691D1A90B004F72927A0E2E6C6EE830",
    "type": "group"
  },
  {
    "id": "81168F3D2971487FA73E6A4E29E04E02",
    "icon": "./img/itoss/groupgood.png",
    "name": "其他(0/0)",
    "open": false,
    "parent": false,
    "pid": "8A828A7651F84C438A2AA24AA3E0B9DC",
    "type": "group"
  },
  {
    "id": "3B715CB6A288417D84C7A3839E001FBF",
    "icon": "./img/itoss/groupgood.png",
    "name": "摄像机(0/0)",
    "open": false,
    "parent": false,
    "pid": "81168F3D2971487FA73E6A4E29E04E02",
    "type": "group"
  },
  {
    "id": "2076EDCB9C1948F6879A804A99922B81",
    "icon": "./img/itoss/groupgood.png",
    "name": "DVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "81168F3D2971487FA73E6A4E29E04E02",
    "type": "group"
  },
  {
    "id": "7417DE51B8C54E0FB48A01EB35006CD1",
    "icon": "./img/itoss/groupgood.png",
    "name": "NVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "81168F3D2971487FA73E6A4E29E04E02",
    "type": "group"
  },
  {
    "id": "CADAA37C093A4F1C873B3F12F32762E3",
    "icon": "./img/itoss/groupgood.png",
    "name": "IPSAN(0/0)",
    "open": false,
    "parent": false,
    "pid": "81168F3D2971487FA73E6A4E29E04E02",
    "type": "group"
  },
  {
    "id": "43D9776F83704778BF1950B6D4443B2F",
    "icon": "./img/itoss/groupgood.png",
    "name": "编码器(0/0)",
    "open": false,
    "parent": false,
    "pid": "81168F3D2971487FA73E6A4E29E04E02",
    "type": "group"
  },
  {
    "id": "038EA9F7A8894D47BCFFC3FEDCA4CF97",
    "icon": "./img/itoss/groupwarning.png",
    "name": "服务器",
    "open": false,
    "parent": false,
    "pid": "9D5D405DC33E4AB1B0B0F52D1B2BDCD1",
    "type": "group"
  },
  {
    "id": "E25731D233AA415C9A38C9FBAFD8EF6A",
    "icon": "./img/itoss/entitygood.png",
    "name": "192.168.0.221",
    "open": false,
    "parent": false,
    "pid": "038EA9F7A8894D47BCFFC3FEDCA4CF97",
    "type": "equipment"
  },
  {
    "id": "08DEBA3677424D2F95360F17D72A3DB7",
    "icon": "./img/itoss/entitywarning.png",
    "name": "192.168.0.208",
    "open": false,
    "parent": false,
    "pid": "038EA9F7A8894D47BCFFC3FEDCA4CF97",
    "type": "equipment"
  },
  {
    "id": "6B5FD0C3CC69448394AC47909932AB72",
    "icon": "./img/itoss/entitygood.png",
    "name": "192.168.9.81",
    "open": false,
    "parent": false,
    "pid": "038EA9F7A8894D47BCFFC3FEDCA4CF97",
    "type": "equipment"
  },
  {
    "id": "081BE4F02990456FB690E1AE88D1CF9C",
    "icon": "./img/itoss/groupgood.png",
    "name": "其他(0/0)",
    "open": false,
    "parent": false,
    "pid": "9D5D405DC33E4AB1B0B0F52D1B2BDCD1",
    "type": "group"
  },
  {
    "id": "5DDF91EAF12D415391887970FE9244C4",
    "icon": "./img/itoss/groupgood.png",
    "name": "摄像机(0/0)",
    "open": false,
    "parent": false,
    "pid": "081BE4F02990456FB690E1AE88D1CF9C",
    "type": "group"
  },
  {
    "id": "01501807126849AE80E2DF8F23FBE98E",
    "icon": "./img/itoss/groupgood.png",
    "name": "DVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "081BE4F02990456FB690E1AE88D1CF9C",
    "type": "group"
  },
  {
    "id": "4F2037173F5344069C36D2A1C629368A",
    "icon": "./img/itoss/groupgood.png",
    "name": "NVR(0/0)",
    "open": false,
    "parent": false,
    "pid": "081BE4F02990456FB690E1AE88D1CF9C",
    "type": "group"
  },
  {
    "id": "FC24DE13313B42B696C845875757A909",
    "icon": "./img/itoss/groupgood.png",
    "name": "IPSAN(0/0)",
    "open": false,
    "parent": false,
    "pid": "081BE4F02990456FB690E1AE88D1CF9C",
    "type": "group"
  },
  {
    "id": "A4F349D0BCEF454BA464CD00E7AE8D3A",
    "icon": "./img/itoss/groupgood.png",
    "name": "编码器(0/0)",
    "open": false,
    "parent": false,
    "pid": "081BE4F02990456FB690E1AE88D1CF9C",
    "type": "group"
  }
]

var ListView = React.createClass({
    mixins: [Navigation, FluxMixin, StoreWatchMixin("YFTEquipmentStore")],
    getStateFromFlux: function() {
      var flux = this.getFlux();
      return {
        itoss:flux.store("YFTEquipmentStore").getState()
      }
    },
    componentDidMount: function() {
      //this.getFlux().actions.YFTEquipmentActions.get_equipmentAllData("E25731D233AA415C9A38C9FBAFD8EF6A");
    },
    render:function(){
        return(
            <div id='equipmentManageListView' className='overviewDiv'>
                <CreateResourceModal />
                <CreateMonitorModal />
                <div className='leftListDiv col-md-2'>
                    <MonitorTree2 treeData={oData}/>
                </div>
                <ListView_desView />
            </div>
        );
    }
});

module.exports = ListView;
