/*** Created by LEGEND on 17-01-2017.*/
var app = angular.module('myApp', ["ui.router"]);
app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'myCtrl'
        })

        .state('logout', {
            url: '/logout',
            templateUrl: 'index.html'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html'
        })

        .state('profile', {
            url: '/profile',
            templateUrl: 'profile.html',
            controller: 'ProfileCtrl'
        });
}]);

app.factory('apiService', ['$http', '$q', function ($http, $q) {
    var apiService = {};
    var login = function (data) {
        var deferred = $q.defer();
        $http.post('/login', data).then(function (response) {
            deferred.resolve(response);
        },
            function (error) {
                deferred.reject(error);
            }
        );
        return deferred.promise;
    };
    apiService.login = login;
    return apiService;
}]);

app.controller('ProfileCtrl', ['$scope', '$state', '$http', function ($scope, $state, $http) {
    $http.get('/profile').then(function (response) {
        console.log('the res is: ', response);
        $scope.username = response.data.data.email;
    })
}]);

app.controller('myCtrl', function ($scope, $http, $state, apiService) {
    $scope.user={};
    $scope.loginUser = function() {
        console.log($scope.user);
        // $http.post('/login',$scope.user).then(function (data) {
        apiService.login($scope.user).then(function(data) {
            console.log("Login success!", data);
            $state.go('profile');
        },
            function (err) {
                console.log(err);
                $scope.errortext = err;
            }
        );
    };
    $scope.logout = function(){};
    $scope.saveUser = function() {
        console.log($scope.user);
        $http.post('/signup',$scope.user).then(function (data) {
            $state.go('profile');
        },
            function (err) {
                console.log(err);
                $scope.errortext = err;
            }
        );
    };
});