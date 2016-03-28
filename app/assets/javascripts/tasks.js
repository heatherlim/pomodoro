 // angular.module('TasksList', []).controller "TaskCtrl", ($scope) ->
 //   $scope.tasks = [
 //     {description: "Hi"}
 //     {description: "Hello"}
 //     {description: "Hallo"}
 //   ]

var app;

app = angular.module('TasksList', ["ngResource"])

app.controller("TaskCtrl", ['$scope', 'Task', '$http', function($scope, Task, $http) {
   $scope.tasks = Task.query();

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
