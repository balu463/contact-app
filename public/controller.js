var app=angular.module("myapp",[]);

app.controller("myController",["$scope","$http",function($scope,$http){

	var refresh=function(){$http.get("/contactList").success(function(response){
		$scope.contactList=response;
		$scope.contact="";
	});
}
refresh();
$scope.addContact=function () {
	// body...
	$http.post("/contactList",$scope.contact).success(function(reponse){
		console.log(reponse);
		refresh();
		
	})
}

$scope.editContact=function (id) {
	// body...
	$http.get("/contactList/"+id).success(function(reponse){
		console.log(reponse);
		$scope.contact=reponse;
		
		
	})
	}


	$scope.updateContact=function () {
	// body...
	$http.put("/contactList/"+$scope.contact._id,$scope.contact).success(function(reponse){
		console.log(reponse);
		refresh();
		
	})
}
$scope.deleteContact=function (id) {
	// body...
	$http.delete("/contactList/"+id).success(function(reponse){
		refresh();
		
	})
	}
}]);