 // angular.module('TasksList', []).controller "TaskCtrl", ($scope) ->
 //   $scope.tasks = [
 //     {description: "Hi"}
 //     {description: "Hello"}
 //     {description: "Hallo"}
 //   ]

var app;

app = angular.module('TasksList', ["ngResource"])

app.controller("TaskCtrl", ['$scope', 'Task', function($scope, Task) {
   $scope.tasks = Task.query();
}]);

app.factory("Task", [
  "$resource", function($resource) {
    return $resource("/tasks/:id", {
      // id: "@id"
    }, {
      update: {
        method: "GET"
      }
    });
  }
]);
