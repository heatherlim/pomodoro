# angular.module('TasksList', []).controller "TaskCtrl", ($scope) ->
#   $scope.tasks = [
#     {description: "Hi"}
#     {description: "Hello"}
#     {description: "Hallo"}
#   ]

app = angular.module('TasksList', ["ngResource"])
app.factory "Task", ["$resource", ($resource) ->
  $resource("/tasks/:id", {id: "@id"}, {update: {method: "GET"}})
]
@TaskCtrl = ["$scope", "Task", ($scope, Task) ->
  $scope.tasks = Task.query()
]
