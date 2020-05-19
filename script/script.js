require([
    //加载模块
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/BasemapToggle",
        "esri/layers/FeatureLayer",
        "esri/widgets/Feature",
        "esri/widgets/Legend",
        "esri/widgets/Expand",
        "esri/widgets/Fullscreen"
    ], function(Map, MapView,BasemapToggle,FeatureLayer,Feature,Legend,Expand,Fullscreen) {
    //添加底图
        var map = new Map({
            basemap: "topo-vector"
        });
    //添加地图视图
        var view = new MapView({
            container: "viewDiv",
            map: map,
            center: [108.95000,34.1],
            zoom: 10
        });
      //添加地图切换toggle控件
        var toggle = new BasemapToggle({
            view:view,
            nextBasemap:"hybrid"
        });
        view.ui.add(toggle,"top-right");
        //添加图例
        var legend = new Legend({
            view:view,
            container:"legendDiv"
        });
        //添加expand控件，用于放置图例
        var legendExpand = new Expand({
            view:view,
            content:legend
        });
        view.ui.add(legendExpand,"bottom-right");
        //添加全屏控件
        var fullscreen = new Fullscreen({
        view:view
        });
        view.ui.add(fullscreen, "bottom-right");
        //添加数据渲染器  
        var pointRenderer={
            type:"simple",
            symbol:{
                type:"simple-marker",
                color:[255,0,255],
                outline:{
                    color:"#00FFFF"
                }
            }
        }
        //添加弹出窗口
        var popupTables = {
            content: [{
            title:"{地点}",
            type:"fields",
            fieldInfos:[
                {
                fieldName:"地点",
                label:"地点",
                visible:true,
                format: null,
                stringFieldOption:"text-box"
                },
                {
                fieldName:"pH",
                label:"pH",
                visible:true,
                format: {
                    places:2,
                    digitSeperator:true
                },
                stringFieldOption:"text-box"
                },
                {
                fieldName:"ORP",
                label:"ORP",
                visible:true,
                format: {
                    places:2,
                    digitSeperator:true
                },
                stringFieldOption:"text-box"
                },
                {
                fieldName:"EC",
                label:"EC",
                visible:true,
                format: {
                    places:2,
                    digitSeperator:true
                },
                stringFieldOption:"text-box"
                }
            ]
            }]
        }
        //添加图层数据
        var sample_point = new FeatureLayer({
            url:"https://services5.arcgis.com/9KWvMv6plnDEz1Jd/arcgis/rest/services/chanba_sample/FeatureServer/0?token=CCxbC2bEvOqJVDZQnNsg_Oa_ue5ydyaojs0l8vV5G1XaJnrX3qIwXihtJb2SrcVU1kXhdSojIPtJPG4k2KP1MNTQBX_CIFu2q9LQ7zh8YAa2SSea-cADmSTqkwmR5GMj17YjST9ZOuDW7g1DwH2m0wci17s_dzmRGJOZchCZxJrbCPr9Y8prf2PxTYRsVML8YDrJNXoxOk8Ms6-AVizu3mhmOrQgaih-W5kKDi1P-IY.",
            renderer:pointRenderer,
            outFields:["地点","pH","ORP","EC"],
            popupTemplate:popupTables
        });
        map.add(sample_point);
    });
function addLoadEvent(func){
    var oldonload = window.onload;
    if (typeof window.onload != 'function'){
        window.onload = func;
    }
    else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
function highlightPage(){
    var headers = document.getElementsByTagName('header');
    var navs = headers[0].getElementsByTagName('nav');
    var links = navs[0].getElementsByTagName('a');
    var linkurl;
    for (var i=0; i<links.length; i++){
        linkurl = links[i].getAttribute('href');
        if (window.location.href.indexOf(linkurl) != -1){
            links[i].className = 'here';
        }
    }
}
addLoadEvent(highlightPage);