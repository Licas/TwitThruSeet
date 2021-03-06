'use strict';

/* Controllers */

/*function AppCtrl($scope, $http) {
 $http({method: 'GET', url: '/api/name'}).
 success(function(data, status, headers, config) {
 $scope.name = data.name;
 }).
 error(function(data, status, headers, config) {
 $scope.name = 'Error!'
 });
 }*/
function EmptyCtrl() {

}
EmptyCtrl.$inject = [];

function TwitterTimelineCtrl($sce, $scope, $http) {
    $scope.trustHtml = function(src) {
        return $sce.trustAsHtml(src);
    };

    function setLoadingState(isLoad) {
        $scope.isLoadingTweets = isLoad;
    }

    $scope.loadTweets = function() {
        $scope.last_refresh = new Date();
        setLoadingState(true);
        $http.get('/api/twitter/timeline',{params: { count: $scope.count}})
            .then(function(response){
                $scope.data = response.data;
                $scope.isInitialized = true;
            }, function(error){
                // error
            }).then(function(response) {
                setLoadingState(false);
            });
    };


    function init() {
        $scope.isInitialized = false;
        $scope.count = 10;
        setLoadingState(false);
        // Load data when controller is first created
        $scope.loadTweets();
    }

    init();
}

TwitterTimelineCtrl.$inject = ['$sce', '$scope', '$http'];

function TwitterCreateCtrl(geolocation, $upload, $scope, $http) {
    $scope.reset = function() {
        $scope.status = '';
        $scope.file = null;
        $scope.isSuccess = false;
        $scope.isError = false;
        $scope.resultMessage = null;

        setSubmittingState(false);
    };

    $scope.onFileSelect = function(files) {
        $scope.file = files[0];
    };

    $scope.submit = function() {
        setSubmittingState(true);
        $scope.upload = $upload.upload({
            url: '/api/twitter/update',
            data: {
                status: $scope.status,
                latitude: ($scope.geoIp ? $scope.geoIp.coords.latitude : null),
                longitude: ($scope.geoIp ? $scope.geoIp.coords.longitude : null)
            },
            file: $scope.file
        }).progress(function(event) {
            console.log('percent: ' + parseInt(100.0 * event.loaded / event.total));
        }).success(function(data, status, headers, config) {
            setSubmittingState(false);
            $scope.reset();
            $scope.isSuccess = true;
        }).error(function (data) {
            setSubmittingState(false);
            $scope.isError = true;
            $scope.resultMessage = JSON.stringify(data);
            setSubmittingState(false);
        })
    };

    $scope.map = {
        control:{},
        center: {
            latitude: 0,
            longitude: 0
        },
        options: {
            streetViewControl: false,
            panControl: false,
            maxZoom: 20,
            minZoom: 3
        },
        bounds: {},
        zoom: 15,
        events: {
            tilesloaded: function (map) {
                $scope.$apply(function () {
                    $scope.mapInstance = map;
                });
            },
            center_changed: function() {
                $scope.map.control.refresh($scope.map.center);
            }
        }
    };

    function setSubmittingState(isSubmit) {
        $scope.isSubmittingTweet = isSubmit;
    }

    function getGeoIp() {
        geolocation.getLocation().then(function(data){
            $scope.isGeoIpDisabled = false;
            $scope.geoIp = data;
            $scope.map.center.latitude = data.coords.latitude;
            $scope.map.center.longitude = data.coords.longitude;
        }, function(reason) {
            $scope.isGeoIpDisabled = true;
        });
    }

    function init() {
        $scope.isSuccess = false;
        $scope.isError = false;
        $scope.isGeoIpDisabled = true;
        getGeoIp();
    }

    init();
}

TwitterCreateCtrl.$inject = ['geolocation', '$upload', '$scope', '$http'];