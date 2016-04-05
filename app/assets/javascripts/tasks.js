 // angular.module('TasksList', []).controller "TaskCtrl", ($scope) ->
 //   $scope.tasks = [
 //     {description: "Hi"}
 //     {description: "Hello"}
 //     {description: "Hallo"}
 //   ]

var app;

app = angular.module('TasksList', ["ngResource"])

app.controller("TaskCtrl", ['$scope', 'Task', '$http', '$timeout',  function($scope, Task, $http, $timeout) {
   $scope.tasks = Task.query();
   $scope.counter = 5;

   $scope.countdown = function(){
     if($scope.counter !== 0){
     $scope.counter--;
    mytimeout = $timeout($scope.countdown,1000);


     if($scope.counter === 0){
       $timeout.cancel(mytimeout);
     }
   }
   }

  // var mytimeout = $timeout($scope.countdown,1000);

   $scope.stop = function(){
     if($scope.counter !== 0){
     $timeout.cancel(mytimeout);
   }else{
     $scope.counter = 5;
   }
   }

   $scope.selectTask = function(){
     $scope.select = this;
   }

   $scope.updateTask = function(){

     $http.patch('/tasks/:id', {updateTask: this.task})
        .success(function(result){
          $scope.tasks = result;
        })
        .error(function(data, status){
          console.log(data);
        });
   };

   $scope.addTask = function(){
     $http.post('/tasks', {newTask: $scope.newTask})
        .success(function(result){
          $scope.tasks.push(result);
          $scope.newTask = '';
        })
        .error(function(data, status){
          console.log(data);
        });
   };


}]);

app.factory("Task", [
  "$resource", function($resource) {
    return $resource("/tasks", {
        // return $resource("/tasks/:id", {
      // id: "@id"
    }, {
      update: {
        method: "GET"
      }
    });
  }
]);
