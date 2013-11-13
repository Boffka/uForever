'use strict';

/* Controllers */

var uControllers = angular.module('uControllers', []);

uControllers.controller('InstListCtrl', ['$scope', 'Instance',
    function($scope, Instance) {
        $scope.instances = Instance.query();
        $scope.orderProp = 'age';
    }]);


uControllers.controller('IndexListCtrl', ['$scope', 'Instance','$timeout','activeMenu',
    function($scope, Instance,$timeout, activeMenu){
        $scope.instances = Instance.query();
        $scope.orderProp = 'age';
        $scope.getClass = function(className){
            //return activeMenu({'className':className});
            if ($location.path().substr(0, className.length) == className) {
                return "active";
            } else {
                return "";
            }
        }
        /*$scope.atoRefresh = function(){
            Instance.query(function(iInst){
                $scope.instances[0].uptime = iInst[0].uptime;
            });
            $timeout(function(){$scope.atoRefresh()}, '1000')
        };
        $scope.atoRefresh();*/
    }]);



uControllers.controller('InstDetailCtrl', ['$scope', '$routeParams', 'Instance','$timeout' ,'$http', '$location',
    function($scope, $routeParams, Instance, $timeout, $http, $location ) {
        $scope.getInstance = function(){
            return Instance.get({instanceId: $routeParams.instanceId}, function(instance) {
                    var iDate = moment.duration(moment()-instance.ctime);
                    $scope.time = iDate._data;
                    $scope.name = 'No Name';
                    $scope.instance = instance;
            });
        }
        $scope.instance = $scope.getInstance();

        $scope.restartUnit = function(unitId){
            console.log(unitId);
            //TODO get unitID from document (href="#here")
            $http.get('/api/unit/restart/'+this.instance.uid);
            $scope.instance.running = false;
            $timeout(function(){$scope.getInstance()}, '1000');

            /*if(!$scope.instance.running) {
                $scope.getInstance();
            }*/

            /*return $resource('/api/unit/restart/:this.instance.uid');
             console.log(this.instance.uid);*/
        }

        $scope.stopUnit = function(unitId){
            console.log(unitId);
            //TODO get unitID from document (href="#here")
            $http.get('/api/unit/stop/'+unitId);
            $location.path('/');
            /*location('/');*/
            /*$scope.instance.running = false;
            $timeout(function(){$scope.getInstance()}, '1000');*/
        }

        $scope.cleanLog = function(fname){
            console.log(fname);
            $http.post('/api/unit/cleanlog/',{'fname':fname}).success(function(){});
            $timeout(function(){$scope.getInstance()}, '1000');
        }


        /*$scope.setImage = function(imageUrl) {
            //$scope.mainImageUrl = imageUrl;
        }*/
    }]);



uControllers.controller('AddUnitCtrl', ['$scope', 'Instance',
    function($scope, Instance) {
        $scope.instances = Instance.query();
        $scope.orderProp = 'age';
    }]);


uControllers.controller('UnitListCtrl', ['$scope', 'Units',
    function($scope, Units) {
        $scope.units = Units.query();
        $scope.orderProp = 'age';
    }]);