/**
 * Created by Administrator on 2017/4/26.
 */

//命令执行前提
angular.module("app",["ui.router"])
 //开启路由
.config(function ($stateProvider,$urlRouterProvider) {
    //重定向
    $urlRouterProvider.otherwise("/shepage")
    $urlRouterProvider.when("/shepage","/shepage/huopage")

    $stateProvider
        .state({
            name:"home",
            url:"/homepage",
            tittle:"首页",
            templateUrl:"view/home.html"
        })
        .state({
            name:"she",
            url:"/shepage",
            tittle:"社区团体活动服务",
            templateUrl:"view/she.html"
        })
        .state({
            name:"she.huo",
            url:"/huopage",
            tittle:"活动介绍",
            templateUrl:"view/huo.html",
            controller:function ($scope,$http) {
                $http.get("data/data.json")
                    .success(function (data) {
                        console.log(data)
                        $scope.list=data
                    })
            }
        })
        .state({
            name:"she.cha",
            url:"/chapage",
            tittle:"查看活动",
            templateUrl:"view/cha.html"
        })
        .state({
            name:"she.zong",
            url:"/zongpage",
            tittle:"活动总结",
            templateUrl:"view/zong.html"
        })
        .state({
            name:"she.red",
            url:"/redpage",
            templateUrl:"view/red.html",
            controller:function ($scope,$state) {
                    $scope.back=function () {
                        window.location.href="index.html#/shepage/chapage"
                    }
                    $scope.contant=function () {
                        $state.go("red")
                    }
            }
        })
        .state({
            name:"dang",
            url:"/dangpage",
            tittle:"党组织活动服务",
            templateUrl:"view/dang.html"
        })
        .state({
            name:"ju",
            url:"/jupage",
            tittle:"居民自治活动服务",
            templateUrl:"view/ju.html"
        })
})

//标题跟踪
angular.module('app').run(function ($rootScope) {
    $rootScope.$on("$stateChangeSuccess",function (event, next) {
        $rootScope.tittle=next.tittle
    })
})

//设定图片的上传
angular.module('app')
    .directive('inputFile',function () {
        return {
            template:'<div class="input-file">'+
            '<label for="{{inputId}}"></label>'+
            '<input type="file" id="{{inputId}}">'+
            '</div>',
            restrict:'E',
            scope:{},
            controller:function ($scope) {
                $scope.inputId = 'inputFile'+$scope.$id
            },
            link:function (scope,ele) {
                var inputFile = ele.find('div');
                var input = $(inputFile).find('input');
                input.on('change',function () {
                    var reader = new FileReader();
                    reader.readAsDataURL(this.files[0]);
                    reader.onload = function () {
                        console.log($(inputFile).find('label'));
                        $(inputFile).find('label')[0].style.background = 'url('+this.result+') no-repeat center center'
                    }
                })
            }
        }
    });