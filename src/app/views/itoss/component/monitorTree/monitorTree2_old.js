/**
* tianzhuo.nie  2015/12/11.
* onClickChild 左键点击方法
 */

var React = require('react');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var data = {
  "belongID": "",
  "children": [
    {
      "belongID": "",
      "children": [
        {
          "belongID": "",
          "children": [
            {
              "belongID": "",
              "children": [
                {
                  "belongID": "",
                  "children": [
                    {
                      "belongID": "430101",
                      "children": [],
                      "groupId": "C0F42B73815B40218109A657CFBCA144",
                      "name": "DVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430101",
                      "children": [],
                      "groupId": "09B6641BD8384807A63F171548372547",
                      "name": "NVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430101",
                      "children": [],
                      "groupId": "BF63601AE7144A24B2D1A8CBD78A8D73",
                      "name": "摄像机",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430101",
                      "children": [],
                      "groupId": "339C82C687294F249CCF58D46683AE39",
                      "name": "IPSAN",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430101",
                      "children": [],
                      "groupId": "78D594ABA4B140A590119E2BB9CC122B",
                      "name": "编码器",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    }
                  ],
                  "groupId": "A3705993EA9F4B76A7C09A3921AB4B3B",
                  "name": "市辖区公安局",
                  "nodeid": "se",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "",
                  "children": [
                    {
                      "belongID": "430102",
                      "children": [],
                      "groupId": "1D12042E169F42CE97F1A8028AFE835B",
                      "name": "DVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430102",
                      "children": [],
                      "groupId": "930A71B627254AF4AB4C296400C3A3B7",
                      "name": "NVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430102",
                      "children": [],
                      "groupId": "B6F36314A66D42A399E7108A7A6EAE49",
                      "name": "摄像机",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430102",
                      "children": [],
                      "groupId": "7F80C75CA6BF4A9C99FFFA10BF2C74F3",
                      "name": "IPSAN",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430102",
                      "children": [],
                      "groupId": "35F1F631B50B47CF9DF73AC2A0A024E7",
                      "name": "编码器",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    }
                  ],
                  "groupId": "4499B2DE526B4A7BBB81E6858E3B9EA9",
                  "name": "芙蓉区公安局",
                  "nodeid": "se",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "",
                  "children": [
                    {
                      "belongID": "430103",
                      "children": [],
                      "groupId": "D149A807AC7C4549B18CE8EBE61A6236",
                      "name": "DVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430103",
                      "children": [],
                      "groupId": "9C1DC090BA9746FB8A753DBA85EA2B33",
                      "name": "NVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430103",
                      "children": [],
                      "groupId": "8088DC12149D4678A96FCBDC4DFF6F12",
                      "name": "摄像机",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430103",
                      "children": [],
                      "groupId": "6FA1B00A75AC44F3B396C6EC9B51216E",
                      "name": "IPSAN",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430103",
                      "children": [],
                      "groupId": "784D35D181014737A7C4DC213EB883E4",
                      "name": "编码器",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    }
                  ],
                  "groupId": "761FFA3050C94B299B7C13495655B28B",
                  "name": "天心区公安局",
                  "nodeid": "se",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "",
                  "children": [
                    {
                      "belongID": "430104",
                      "children": [],
                      "groupId": "02CA1F71863043A9BBB32F069786F29A",
                      "name": "DVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430104",
                      "children": [],
                      "groupId": "1BA1D307954240A2BD56B38D88D5D5AA",
                      "name": "NVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430104",
                      "children": [],
                      "groupId": "F5CDC63682344751A2EE8D94BA41A192",
                      "name": "摄像机",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430104",
                      "children": [],
                      "groupId": "97A199AD8CBE4BF4A77431D582E646C8",
                      "name": "IPSAN",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430104",
                      "children": [],
                      "groupId": "99FBE77B9002498CB74FF5C4271FA242",
                      "name": "编码器",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    }
                  ],
                  "groupId": "A4BF7BE1091944178410BF3F234E0EF6",
                  "name": "岳麓区公安局",
                  "nodeid": "se",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "",
                  "children": [
                    {
                      "belongID": "430105",
                      "children": [],
                      "groupId": "421844F5DBCD4A62AEA594471FC00948",
                      "name": "DVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430105",
                      "children": [],
                      "groupId": "CE8E972462E84378A56FBB54ED8D4D44",
                      "name": "NVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430105",
                      "children": [],
                      "groupId": "6797DE74B1DB4D888FA2DBAD7AFF8DD8",
                      "name": "摄像机",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430105",
                      "children": [],
                      "groupId": "1AE5B748BD204ED19C0CB5CEAA3CFFDD",
                      "name": "IPSAN",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430105",
                      "children": [],
                      "groupId": "5742B2A5BBE44FD88C2D34A3449A8CAA",
                      "name": "编码器",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    }
                  ],
                  "groupId": "93A0803EA0584DC9A2D8E3E765E01778",
                  "name": "开福区公安局",
                  "nodeid": "se",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "",
                  "children": [
                    {
                      "belongID": "430111",
                      "children": [],
                      "groupId": "438FC9AD81BD4FBA9AB957EC2B5C6B6B",
                      "name": "DVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430111",
                      "children": [],
                      "groupId": "B2395E8444EA4C129F9DCDD017F01D72",
                      "name": "NVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430111",
                      "children": [],
                      "groupId": "7DDF827DDF3B48F6827DBAC52FDAD7BB",
                      "name": "摄像机",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430111",
                      "children": [],
                      "groupId": "4E95F7D668C04C0884F093B0231EC7C1",
                      "name": "IPSAN",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430111",
                      "children": [],
                      "groupId": "27C143B5F6194D9AAD0F15605E060AD1",
                      "name": "编码器",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    }
                  ],
                  "groupId": "056A72E3229F43BF8A005AB15EE0FE60",
                  "name": "雨花区公安局",
                  "nodeid": "se",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "",
                  "children": [
                    {
                      "belongID": "430112",
                      "children": [],
                      "groupId": "9302F5C78B894BD58C75C403EC83AC40",
                      "name": "DVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430112",
                      "children": [],
                      "groupId": "14B54442BBB1478A8128BB17CF8E5B89",
                      "name": "NVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430112",
                      "children": [],
                      "groupId": "2F5A31C10A12413CBFC178718C5C3091",
                      "name": "摄像机",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430112",
                      "children": [],
                      "groupId": "DDC8DC3850E84DAB8E5AE0F459EAEBFE",
                      "name": "IPSAN",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430112",
                      "children": [],
                      "groupId": "ED96CE29424049E2AAF4C9DB4C8E2AB3",
                      "name": "编码器",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    }
                  ],
                  "groupId": "AC68459628D249EC953EF4E31D119D66",
                  "name": "望城区公安局",
                  "nodeid": "se",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "",
                  "children": [
                    {
                      "belongID": "430121",
                      "children": [],
                      "groupId": "9D36F9EB8FFB4306AEF219BCEC09EDE1",
                      "name": "DVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430121",
                      "children": [],
                      "groupId": "AC84883A742044A29EEB460C881C0F88",
                      "name": "NVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430121",
                      "children": [],
                      "groupId": "30B2143D8D1745CD94AEAF58D2A0B285",
                      "name": "摄像机",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430121",
                      "children": [],
                      "groupId": "183FF1989D884CDA8EF23EF9DBAC1D44",
                      "name": "IPSAN",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430121",
                      "children": [],
                      "groupId": "F4E1F1B69E43484193B94D5C25EE99DB",
                      "name": "编码器",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    }
                  ],
                  "groupId": "CF818681A1FB4DC1AD21608A252E529C",
                  "name": "长沙县公安局",
                  "nodeid": "se",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "",
                  "children": [
                    {
                      "belongID": "430124",
                      "children": [],
                      "groupId": "22DCA0700E3D4CADB747D350810668CE",
                      "name": "DVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430124",
                      "children": [],
                      "groupId": "ED35F06982374E1FBECC9F051BDA7F25",
                      "name": "NVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430124",
                      "children": [],
                      "groupId": "4A2AB990D16C40C880616F5E281F96D6",
                      "name": "摄像机",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430124",
                      "children": [],
                      "groupId": "3B8B344C22074D98A109F38559F9DA1F",
                      "name": "IPSAN",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430124",
                      "children": [],
                      "groupId": "F96020FED1EE4F1E87169CD156A555AD",
                      "name": "编码器",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    }
                  ],
                  "groupId": "E810DE7ABB4E473F89DDCE38662C9F12",
                  "name": "宁乡县公安局",
                  "nodeid": "se",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "",
                  "children": [
                    {
                      "belongID": "430181",
                      "children": [],
                      "groupId": "B27B1F169D534207B40C9F5DC62E7D00",
                      "name": "DVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430181",
                      "children": [],
                      "groupId": "CD0FE6C187264497877C20C29DE80D50",
                      "name": "NVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430181",
                      "children": [],
                      "groupId": "3BC54FFAC43449DCAE49C3DBE09699DE",
                      "name": "摄像机",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430181",
                      "children": [],
                      "groupId": "6AB5BEB3B05F47ACA491B91A13AC0CBA",
                      "name": "IPSAN",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "430181",
                      "children": [],
                      "groupId": "E048FD502E134BE5A6D85E073A84AB9F",
                      "name": "编码器",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    }
                  ],
                  "groupId": "2691D1A90B004F72927A0E2E6C6EE830",
                  "name": "浏阳市公安局",
                  "nodeid": "se",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "4301",
                  "children": [
                    {
                      "belongID": "",
                      "children": [],
                      "groupId": "3B715CB6A288417D84C7A3839E001FBF",
                      "name": "摄像机",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "",
                      "children": [],
                      "groupId": "2076EDCB9C1948F6879A804A99922B81",
                      "name": "DVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "",
                      "children": [],
                      "groupId": "7417DE51B8C54E0FB48A01EB35006CD1",
                      "name": "NVR",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "",
                      "children": [],
                      "groupId": "CADAA37C093A4F1C873B3F12F32762E3",
                      "name": "IPSAN",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    },
                    {
                      "belongID": "",
                      "children": [],
                      "groupId": "43D9776F83704778BF1950B6D4443B2F",
                      "name": "编码器",
                      "nodeid": "",
                      "sorter": 1000,
                      "status": "good"
                    }
                  ],
                  "groupId": "81168F3D2971487FA73E6A4E29E04E02",
                  "name": "其他",
                  "nodeid": "se",
                  "sorter": 1000,
                  "status": "good"
                }
              ],
              "groupId": "8A828A7651F84C438A2AA24AA3E0B9DC",
              "name": "长沙市公安局",
              "nodeid": "se",
              "sorter": 1000,
              "status": "good"
            },
            {
              "belongID": "2920943F385544BD93817FF6BEE4F332",
              "children": [
                {
                  "belongID": "AA49FA943AE34CC889D6ABA78A8EC714",
                  "children": [],
                  "equipmenttype": "Unix",
                  "groupId": "038EA9F7A8894D47BCFFC3FEDCA4CF97",
                  "id": "E25731D233AA415C9A38C9FBAFD8EF6A",
                  "monitorType": "",
                  "name": "192.168.0.221",
                  "sorter": 50000,
                  "status": "good",
                  "title": "192.168.0.221(Linux)"
                },
                {
                  "belongID": "AA49FA943AE34CC889D6ABA78A8EC714",
                  "children": [],
                  "equipmenttype": "Unix",
                  "groupId": "038EA9F7A8894D47BCFFC3FEDCA4CF97",
                  "id": "08DEBA3677424D2F95360F17D72A3DB7",
                  "monitorType": "",
                  "name": "192.168.0.208",
                  "sorter": 50000,
                  "status": "good",
                  "title": "192.168.0.208(Linux)"
                },
                {
                  "belongID": "AA49FA943AE34CC889D6ABA78A8EC714",
                  "children": [],
                  "equipmenttype": "SNMPWindows",
                  "groupId": "038EA9F7A8894D47BCFFC3FEDCA4CF97",
                  "id": "6B5FD0C3CC69448394AC47909932AB72",
                  "monitorType": "",
                  "name": "192.168.9.81",
                  "sorter": 50000,
                  "status": "good",
                  "title": "192.168.9.81(SNMPWindows)"
                }
              ],
              "groupId": "038EA9F7A8894D47BCFFC3FEDCA4CF97",
              "name": "服务器",
              "nodeid": "",
              "sorter": 1000,
              "status": "good"
            },
            {
              "belongID": "43",
              "children": [
                {
                  "belongID": "",
                  "children": [],
                  "groupId": "5DDF91EAF12D415391887970FE9244C4",
                  "name": "摄像机",
                  "nodeid": "",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "",
                  "children": [],
                  "groupId": "01501807126849AE80E2DF8F23FBE98E",
                  "name": "DVR",
                  "nodeid": "",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "",
                  "children": [],
                  "groupId": "4F2037173F5344069C36D2A1C629368A",
                  "name": "NVR",
                  "nodeid": "",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "",
                  "children": [],
                  "groupId": "FC24DE13313B42B696C845875757A909",
                  "name": "IPSAN",
                  "nodeid": "",
                  "sorter": 1000,
                  "status": "good"
                },
                {
                  "belongID": "",
                  "children": [],
                  "groupId": "A4F349D0BCEF454BA464CD00E7AE8D3A",
                  "name": "编码器",
                  "nodeid": "",
                  "sorter": 1000,
                  "status": "good"
                }
              ],
              "groupId": "081BE4F02990456FB690E1AE88D1CF9C",
              "name": "其他",
              "nodeid": "se",
              "sorter": 1000,
              "status": "good"
            }
          ],
          "groupId": "9D5D405DC33E4AB1B0B0F52D1B2BDCD1",
          "name": "湖南省公安厅",
          "nodeid": "se",
          "sorter": 5,
          "status": "good"
        }
      ],
      "id": "se",
      "mac": "",
      "name": "监测树",
      "nodename": "监测树",
      "port": "",
      "sorter": 10
    }
  ],
  "id": "se",
  "mac": "",
  "name": "监测树",
  "nodename": "",
  "port": "",
  "sorter": 10
}

var zNodes =[
	{id:1, pId:0, name:"监测树", open:true,type:"root",icon:"./img/itoss/logo-3.png",isParent:true},
	{id:2, pId:1, name:"二层交换机", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
	{id:3, pId:1, name:"服务器", open:false,type:"group",icon:"./img/itoss/grouperror2.png"},
  {id:4, pId:1, name:"路由器", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:5, pId:1, name:"绿网", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:6, pId:1, name:"三层交换机", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:7, pId:1, name:"数据库", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:8, pId:1, name:"中间件", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:9, pId:1, name:"应用系统", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:10, pId:1, name:"邮件系统", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:11, pId:1, name:"网站", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:12, pId:1, name:"网络设备", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:13, pId:1, name:"防火墙", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:14, pId:1, name:"负载均衡", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:15, pId:1, name:"机房环境", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:16, pId:1, name:"虚拟机", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:17, pId:1, name:"存储", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
  {id:18, pId:1, name:"扫描发现", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
];
var mNodes =[
  {id:19, pId:0, name:"子组123", open:false,type:"group",icon:"./img/itoss/groupok2.png"},
	{id:20, pId:0, name:"192.168.10(SNMPWindows)", open:false,type:"equipment",icon:"./img/itoss/entityok2.png"},
	{id:21, pId:0, name:"192.168.10(SNMPWindows)", open:false,type:"equipment",icon:"./img/itoss/entityok2.png"},
  {id:22, pId:0, name:"192.168.10(SNMPWindows)", open:false,type:"equipment",icon:"./img/itoss/entityok2.png"},
  {id:23, pId:0, name:"192.168.10(SNMPWindows)", open:false,type:"equipment",icon:"./img/itoss/entityerror2.png"},
  {id:24, pId:0, name:"192.168.10(SNMPWindows)", open:false,type:"equipment",icon:"./img/itoss/entityok2.png"},
  {id:25, pId:0, name:"192.168.10(SNMPWindows)", open:false,type:"equipment",icon:"./img/itoss/entityok2.png"},
];
var tNodes =[
  {id:26, pId:0, name:"192.168.10(SNMPWindows)", open:false,type:"equipment",icon:"./img/itoss/entityok2.png"},
	{id:27, pId:0, name:"192.168.10(SNMPWindows)", open:false,type:"equipment",icon:"./img/itoss/entityok2.png"},
  {id:28, pId:0, name:"192.168.10(SNMPWindows)", open:false,type:"equipment",icon:"./img/itoss/entityok2.png"}
]
var Ztreeview1 = React.createClass({
  getInitialState:function(){
    return({
    })
  },
	initTree:function(){
		var zTree;
		var that = this;
		var setting = {
			view: {
				dblClickExpand: false,
				showLine: false,
				nameIsHTML: true,
				selectedMulti: false
			},
			data: {
				simpleData: {
					enable:true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: ""
				}
			},
			callback: {
				beforeClick: function(treeId, treeNode) {
					var zTree = $.fn.zTree.getZTreeObj("leftTree");
					if (treeNode.isParent) {
						zTree.expandNode(treeNode);
						return false;
					} else {
						that.onClickChild(treeNode);
					}
				},
				onRightClick: that.OnRightClick
			}
		};
		$(document).ready(function(){
			var t = $("#leftTree");
			t = $.fn.zTree.init(t, setting, zNodes);
			var zTree = $.fn.zTree.getZTreeObj("leftTree");
		});
	},
	//------------------------------------------右键菜单---------------------------------
	OnRightClick:function(event, treeId, treeNode){
    $(".ztree").find("li").each(function(){
      $(this).attr("class","normalNodeLi");
    })
    var ind = treeNode.getIndex();
    var li = $(".ztree").find("li")[ind+1];
    $(li).attr("class","curSelectedNodeLi");
    $(li).find("a").attr("class","curSelectedNode");
    $("#leftTree2").find("li").find("a").attr("class","");
    $("#leftTree3").find("li").find("a").attr("class","");
    this.hideRMenu2();
		var zTree = $.fn.zTree.getZTreeObj("leftTree");
		var that = this;
    var width = $(".leftListDiv").width()-10;
    var height = $(li).offset().top;
    var type = treeNode.type;
    if(type == "root"){
      return false;
    }else{
      if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        zTree.cancelSelectedNode();
        that.showRightMenu("root", width, height);
      } else if (treeNode && !treeNode.noR) {
        zTree.selectNode(treeNode);
        that.showRightMenu("node", width, height);
      }
    }
	},
  hideRightMenu:function() {
		var that = this;
		var rMenu = $("#rMenu3");
		if (rMenu) rMenu.css({"visibility": "hidden"});
		$("body").unbind("mousedown", that.onBodyMouseDown);
	},
	showRightMenu:function(type, x, y) {
		$("#rMenu3 ul").show();
		var rMenu = $("#rMenu3");
		var that = this;
		if (type=="root") {
			$("#m_del").hide();
			$("#m_check").hide();
			$("#m_unCheck").hide();
		} else {
			$("#m_del").show();
			$("#m_check").show();
			$("#m_unCheck").show();
		}

		rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible","z-index":"999"});

		$("body").bind("mousedown", that.onBodyMouseDownRight);
	},
	onBodyMouseDownRight:function(event){
		var rMenu = $("#rMenu3");
		if (!(event.target.id == "rMenu3" || $(event.target).parents("#rMenu3").length>0)) {
			rMenu.css({"visibility" : "hidden"});
		}
	},
  hideRMenu2:function() {
    var that = this;
    var rMenu = $("#rMenu4");
    if (rMenu) rMenu.css({"visibility": "hidden"});
    $("body").unbind("mousedown", that.onBodyMouseDown);
  },
	hideRMenu:function() {
		var that = this;
		var rMenu = $("#rMenu");
		if (rMenu) rMenu.css({"visibility": "hidden"});
		$("body").unbind("mousedown", that.onBodyMouseDown);
	},
	showRMenu:function(type, x, y) {
		$("#rMenu ul").show();
		var rMenu = $("#rMenu");
		var that = this;
		if (type=="root") {
			$("#m_del").hide();
			$("#m_check").hide();
			$("#m_unCheck").hide();
		} else {
			$("#m_del").show();
			$("#m_check").show();
			$("#m_unCheck").show();
		}

		rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible","z-index":"999"});

		$("body").bind("mousedown", that.onBodyMouseDown);
	},
	onBodyMouseDown:function(event){
		var rMenu = $("#rMenu");
		if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
			rMenu.css({"visibility" : "hidden"});
		}
	},
	componentDidMount:function(){
		this.initTree();
		this.hideRMenu();
    // console.log(data);
    // var dataList = [];
    // for(var i=0;i<data.length;i++){
    //   var children = data[i].chiledren;
    //   if(i==0){
    //     dataList.push({id:1,})
    //   }
    // }
	},
	onClickChild:function(treeNode){
		// console.log(treeNode.getIndex());
    $(".ztree").find("li").each(function(){
      $(this).attr("class","normalNodeLi");
    })
    var ind = treeNode.getIndex();
    var li = $(".ztree").find("li")[ind+1];
    $(li).attr("class","curSelectedNodeLi");
    $(li).find("a").attr("class","curSelectedNode");
    $("#leftTree2").find("li").find("a").attr("class","");
    $("#leftTree3").find("li").find("a").attr("class","");
    this.hideRMenu2();
		var zTree = $.fn.zTree.getZTreeObj("leftTree");
		var that = this;
    var width = $(".leftListDiv").width()-10;
    var height = $(li).offset().top;
		if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
			zTree.cancelSelectedNode();
			that.showRMenu("root", width, height);
		} else if (treeNode && !treeNode.noR) {
			zTree.selectNode(treeNode);
			that.showRMenu("node", width, height);
		}
	},
	render:function(){
		return(
			<div className="zTreeMonitor">
        <div>
          <label>统一监控平台</label>
        </div>
				<ul id="leftTree" className="ztree"></ul>
				<Ztreeview2 nodes={mNodes}/>
        <div id="rMenu3">
          <ul className="rightClickMenu">
            <li>
              <a data-toggle="modal" data-target="#createResourceModal">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/add.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">新增资源</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/refresh.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">排序</span>
              </a>
            </li>
            <hr/>
            <li>
              <a href="">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/start.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">启用分组</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/disable.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">禁用分组</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/delete.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">删除分组</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/addson.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">添加子组</span>
              </a>
            </li>
          </ul>
        </div>
        <div id="rMenu4">
          <ul className="rightClickMenu">
            <li>
              <a data-toggle="modal" data-target="#createMonitorModal">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/monitor.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">添加监测器</span>
              </a>
            </li>
            <hr/>
            <li>
              <a href="">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/dashboard.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">设备仪表板</span>
              </a>
            </li>
            <hr/>
            <li>
              <a href="">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/editzy.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">编辑资源</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/refreshzy.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">刷新资源</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/deletezy.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">删除资源</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/startzy.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">启用资源</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/disablezy.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">禁用资源</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/copyzy.png') 0 0 no-repeat"}}></span>
                <span className="GroupMenuName">移动资源</span>
              </a>
            </li>
          </ul>
        </div>
			</div>
		);
	}
});


var Ztreeview2 = React.createClass({
	initTree:function(){
	//	//debugger;
		var zTree;
		var that = this;
		var setting = {
//			//是否复选框
//			check: {
//				enable: true,
//				//是否可以无选择框
//				nocheckInherit: true,
//				//是否无法选择
//				chkDisabledInherit: true,
//				//是否单选框
//				chkStyle: "radio",
//				//单选分级为level还是all
//				radioType: "all"
//			},
//			//是否可编辑
//			edit: {
//				enable: true,
//				//删除按钮
//				showRemoveBtn: true,
//				//修改按钮
//				showRenameBtn: true
//			},
			view: {
				//双击事件是否开启
				dblClickExpand: false,
				//是否显示连接线
				showLine: false,
				//name是否是html代码
				nameIsHTML: true,
//				showIcon: 'showIconForTree',
				selectedMulti: false
			},
			data: {
				simpleData: {
					enable:true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: ""
				}
			},
			callback: {
				beforeClick: function(treeId, treeNode) {
					var zTree = $.fn.zTree.getZTreeObj("leftTree2");
					if (treeNode.isParent) {
						zTree.expandNode(treeNode);
						return false;
					} else {
						that.onClickChild(treeNode);
					}
				},
				onRightClick: that.OnRightClick
			}
		};

		//nodes的配置API-------------------------------------------------------------------------------------------------------------------
		//id:当前ID,pid:父级ID,name:显示的文字,open:是否打开,isParent:是否是父节点
		//iconOpen:"../../../css/zTreeStyle/img/diy/1_open.png", iconClose:"../../../css/zTreeStyle/img/diy/1_close.png"：打开/关闭时显示什么图标
		//icon:"../../../css/zTreeStyle/img/diy/2.png":设置图标是什么
		//利用 节点数据的 iconSkin 属性 配合 css 实现自定义图标 :iconSkin:"pIcon01"
		//url:"http://www.ztree.me/", target:"_blank":链接
		//nocheck:true:没有选择框，chkDisabled:true, checked:true：无法选择，并被选中
		//
		$(document).ready(function(){
			var t = $("#leftTree2");
			t = $.fn.zTree.init(t, setting, that.props.nodes);
//			demoIframe = $("#testIframe");
//			demoIframe.bind("load", loadReady);
			var zTree = $.fn.zTree.getZTreeObj("leftTree2");
			// zTree.selectNode(zTree.getNodeByParam("id", 2));
		});
	},
	//------------------------------------------右键菜单---------------------------------
	OnRightClick:function(event, treeId, treeNode){
    $("#leftTree2").find("li").each(function(){
      $(this).attr("class","normalNodeLi");
    })
    $("#leftTree3").find("li").each(function(){
      $(this).attr("class","normalNodeLi");
    })
    var ind = treeNode.getIndex();
    var li = $("#leftTree2").find("li")[ind];
    $(li).attr("class","curSelectedNodeLi");
    $(li).find("a").attr("class","curSelectedNode");
    $("#leftTree3").find("li").find("a").attr("class","");

		var zTree = $.fn.zTree.getZTreeObj("leftTree2");
		var that = this;
    var width = $("#leftTree2").width()+$("#leftTree").width()+5;
    var height = $(li).offset().top;
    var type = treeNode.type;
    if(type == "group"){
      if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        zTree.cancelSelectedNode();
        that.showRightMenu("root", width, height);
      } else if (treeNode && !treeNode.noR) {
        zTree.selectNode(treeNode);
        that.showRightMenu("node", width, height);
      }
    }else{
      if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        zTree.cancelSelectedNode();
        that.showRightMenu2("root", width, height);
      } else if (treeNode && !treeNode.noR) {
        zTree.selectNode(treeNode);
        that.showRightMenu2("node", width, height);
      }
    }
	},
  hideRightMenu2:function() {
		var that = this;
		var rMenu = $("#rMenu4");
		if (rMenu) rMenu.css({"visibility": "hidden"});
		$("body").unbind("mousedown", that.onBodyMouseDown);
	},
	showRightMenu2:function(type, x, y) {
		$("#rMenu4 ul").show();
		var rMenu = $("#rMenu4");
		var that = this;
		if (type=="root") {
			$("#m_del").hide();
			$("#m_check").hide();
			$("#m_unCheck").hide();
		} else {
			$("#m_del").show();
			$("#m_check").show();
			$("#m_unCheck").show();
		}

		rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible","z-index":"999"});

		$("body").bind("mousedown", that.onBodyMouseDownRight2);
	},
	onBodyMouseDownRight2:function(event){
		var rMenu = $("#rMenu4");
		if (!(event.target.id == "rMenu4" || $(event.target).parents("#rMenu4").length>0)) {
			rMenu.css({"visibility" : "hidden"});
		}
	},
  hideRightMenu:function() {
		var that = this;
		var rMenu = $("#rMenu3");
		if (rMenu) rMenu.css({"visibility": "hidden"});
		$("body").unbind("mousedown", that.onBodyMouseDown);
	},
	showRightMenu:function(type, x, y) {
		$("#rMenu3 ul").show();
		var rMenu = $("#rMenu3");
		var that = this;
		if (type=="root") {
			$("#m_del").hide();
			$("#m_check").hide();
			$("#m_unCheck").hide();
		} else {
			$("#m_del").show();
			$("#m_check").show();
			$("#m_unCheck").show();
		}

		rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible","z-index":"999"});
    this.hideRightMenu2();
		$("body").bind("mousedown", that.onBodyMouseDownRight);
	},
	onBodyMouseDownRight:function(event){
		var rMenu = $("#rMenu3");
		if (!(event.target.id == "rMenu3" || $(event.target).parents("#rMenu3").length>0)) {
			rMenu.css({"visibility" : "hidden"});
		}
	},
	hideRMenu:function() {
		var that = this;
		var rMenu = $("#rMenu2");
		if (rMenu) rMenu.css({"visibility": "hidden"});
		$("body").unbind("mousedown", that.onBodyMouseDown);
	},
	showRMenu:function(type, x, y) {
		$("#rMenu2 ul").show();
		var rMenu = $("#rMenu2");
		var that = this;
		if (type=="root") {
			$("#m_del").hide();
			$("#m_check").hide();
			$("#m_unCheck").hide();
		} else {
			$("#m_del").show();
			$("#m_check").show();
			$("#m_unCheck").show();
		}

		rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible","z-index":"999"});

		$("body").bind("mousedown", that.onBodyMouseDown);
	},
	onBodyMouseDown:function(event){
		var rMenu = $("#rMenu2");
		if (!(event.target.id == "rMenu2" || $(event.target).parents("#rMenu2").length>0)) {
			rMenu.css({"visibility" : "hidden"});
		}
	},
	//---------------------------------------over
	//获取字体
	getFont:function(treeId, node) {
		return node.font ? node.font : {};
	},
	//勾选统计
	count:function() {
		var zTree = $.fn.zTree.getZTreeObj("leftTree2");
		var checkCount = zTree.getCheckedNodes(true).length;//选中个数
		var nocheckCount = zTree.getCheckedNodes(false).length;//未选中个数
		var changeCount = zTree.getChangeCheckedNodes().length;//变动的个数
	},
	componentDidMount:function(){
		this.initTree();
		this.hideRMenu();
    this.hideRightMenu();
    this.hideRightMenu2();
	},
	onClickChild:function(treeNode){
		// console.log(treeNode.getIndex());
    $("#leftTree2").find("li").each(function(){
      $(this).attr("class","normalNodeLi");
    })
    $("#leftTree3").find("li").each(function(){
      $(this).attr("class","normalNodeLi");
    })
    var ind = treeNode.getIndex();
    var li = $("#leftTree2").find("li")[ind];
    $(li).attr("class","curSelectedNodeLi");
    $(li).find("a").attr("class","curSelectedNode");
    $("#leftTree3").find("li").find("a").attr("class","");

    var that = this;
    var type = treeNode.type;
    if(type=="equipment"){
      that.hideRightMenu2();
      return false;
    }else{
      that.hideRightMenu2();
      var zTree = $.fn.zTree.getZTreeObj("leftTree2");
      var width = $("#leftTree2").width();
      var height = $(li).offset().top - $("#leftTree").find(".curSelectedNodeLi").offset().top;
      if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        zTree.cancelSelectedNode();
        that.showRMenu("root", width, height);
      } else if (treeNode && !treeNode.noR) {
        zTree.selectNode(treeNode);
        that.showRMenu("node", width, height);
      }
    }
	},
	onClickMenu:function(a){
		var menuItem = $($(a.target).parent().find("span")[0]);
		console.log("point:-------"+menuItem.attr("class"));
	},
	render:function(){
		return(
			<div id="rMenu">
				<ul id="leftTree2" className="ztree"></ul>
				<Ztreeview3 nodes={tNodes}/>
      </div>
		);
	}
});

var Ztreeview3 = React.createClass({
	initTree:function(){
		var zTree;
		var that = this;
		var setting = {
			view: {
				//双击事件是否开启
				dblClickExpand: false,
				//是否显示连接线
				showLine: false,
				//name是否是html代码
				nameIsHTML: true,
//				showIcon: 'showIconForTree',
				selectedMulti: false
			},
			data: {
				simpleData: {
					enable:true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: ""
				}
			},
			callback: {
				beforeClick: function(treeId, treeNode) {
					var zTree = $.fn.zTree.getZTreeObj("leftTree3");
					if (treeNode.isParent) {
						zTree.expandNode(treeNode);
						return false;
					} else {
						that.onClickChild(treeNode);
					}
				},
        onRightClick: that.OnRightClick
			}
		};
		$(document).ready(function(){
			var t = $("#leftTree3");
			t = $.fn.zTree.init(t, setting, that.props.nodes);
			var zTree = $.fn.zTree.getZTreeObj("leftTree3");
		});
	},
	componentDidMount:function(){
		this.initTree();
		this.hideRightMenu();
	},
  //------------------------------------------右键菜单---------------------------------
	OnRightClick:function(event, treeId, treeNode){
    $("#leftTree3").find("li").each(function(){
      $(this).attr("class","normalNodeLi");
    })
    var ind = treeNode.getIndex();
    var li = $("#leftTree3").find("li")[ind];
    $(li).attr("class","curSelectedNodeLi");
    $(li).find("a").attr("class","curSelectedNode");

		var zTree = $.fn.zTree.getZTreeObj("leftTree3");
		var that = this;
    var width = $("#leftTree3").width()+$("#leftTree2").width()+$("#leftTree").width()+5;
    var height = $(li).offset().top;
		if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
			zTree.cancelSelectedNode();
			that.showRightMenu("root", width, height);
		} else if (treeNode && !treeNode.noR) {
			zTree.selectNode(treeNode);
			that.showRightMenu("node", width, height);
		}
	},
  hideRightMenu:function() {
		var that = this;
		var rMenu = $("#rMenu4");
		if (rMenu) rMenu.css({"visibility": "hidden"});
		$("body").unbind("mousedown", that.onBodyMouseDownRight);
	},
	showRightMenu:function(type, x, y) {
		$("#rMenu4 ul").show();
		var rMenu = $("#rMenu4");
		var that = this;
		if (type=="root") {
			$("#m_del").hide();
			$("#m_check").hide();
			$("#m_unCheck").hide();
		} else {
			$("#m_del").show();
			$("#m_check").show();
			$("#m_unCheck").show();
		}

		rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible","z-index":"999"});

		$("body").bind("mousedown", that.onBodyMouseDownRight);
	},
	onBodyMouseDownRight:function(event){
		var rMenu = $("#rMenu4");
		if (!(event.target.id == "rMenu4" || $(event.target).parents("#rMenu4").length>0)) {
			rMenu.css({"visibility" : "hidden"});
		}
	},
	onClickChild:function(treeNode){
		// console.log(treeNode.getIndex());
    $("#leftTree3").find("li").each(function(){
      $(this).attr("class","normalNodeLi");
    })
    var ind = treeNode.getIndex();
    var li = $("#leftTree3").find("li")[ind];
    $(li).attr("class","curSelectedNodeLi");
    $(li).find("a").attr("class","curSelectedNode");
	},
	render:function(){
		return(
			<div id="rMenu2">
				<ul id="leftTree3" className="ztree"></ul>
			</div>
		);
	}
});

module.exports = Ztreeview1;
