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
   $scope.counter = 1500;
   $scope.counter_to_minutes = 10;
   $scope.hover = false;
   $scope.stopReset = "Stop";
   
   $scope.countdown = function(){
     $scope.counterOn = true;
     if($scope.counter !== 0){
       $scope.counter--;
    mytimeout = $timeout($scope.countdown,1000);

     if($scope.counter === 0){
       $timeout.cancel(mytimeout);
       $scope.updatePomodoro();
     }
     }
   }

  // var mytimeout = $timeout($scope.countdown,1000);

   $scope.stop = function(){
     if($scope.counter !== 0){
       $timeout.cancel(mytimeout);
       $scope.counterOn = false;
     }else{
       $scope.counter = 1500;
     }
   }

   $scope.selectTask = function(){
      if($scope.counter != 1500){
        $scope.stop();
        $scope.counter = 1500;
        $scope.select = this;
        $scope.myValue = true;
      } else {
        $scope.counter = 1500;
        $scope.select = this;
        $scope.myValue = true;
      }
   }
   
   
   $scope.updatePomodoro = function(){
     
     $http.patch('/tasks/updatepomdoro/:id', {updatePomodoro: this.select.task})
        .success(function(result){
          $scope.tasks = result;
          $scope.myValue = false;
        })
        .error(function(data, status){
          console.log(data);
        });
   }
   
   $scope.showButton = function(){
      $scope.selectedTask = this;
      $scope.hover = true;
   }
   
   $scope.hideButton = function(){
     $scope.hover = false;
   }
   
   
   $scope.deleteTask = function(){

     $http.delete('/tasks/' + this.task.id)
        .success(function(result){
          $scope.myValue = false;
          $scope.tasks = result;
        })
        .error(function(data, status){
          console.log(data);
        });
   };
   
   
   $scope.updateTask = function(){
     $http.patch('/tasks/:id', {updateTask: this.task})
        .success(function(result){
          $scope.myValue = false;
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

app.filter('secondsToDateTime', [function() {
    return function(seconds) {
      return new Date(1970, 0, 1).setSeconds(seconds);
    };
    
}])
