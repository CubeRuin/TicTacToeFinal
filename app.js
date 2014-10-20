var app = angular.module('tictactoe', ["firebase"]);
app.controller('TicTacToeController', function ($scope,$firebase) {

	$scope.remoteGameContainer = 
	$firebase(new Firebase("https://tttarvia.firebaseIO.com/databaseGameContainer")) ;

	$scope.cells = [
		{color: "red", contents: "" },
		{color: "green", contents: "" },
		{color: "blue", contents: "" },
		{color: "red", contents: "" },
		{color: "green", contents: "" },
		{color: "blue", contents: "" },
		{color: "red", contents: "" },
		{color: "green", contents: "" },
		{color: "blue", contents: "" },
	];


	$scope.gameContainer = {
		cellListArray: $scope.cells,
		moveCount: 0
	};

	$scope.remoteGameContainer.$bind($scope, "gameContainer") ;

	$scope.$watch('gameContainer', function() {
		console.log('gameContainer changed!') ;
	}) ;


	$scope.background = { colored: false };

    //

    var isFirstPlayerTurn = true;

    var areEqualAndNotEmpty = function(a, b, c) {
    	return	$scope.gameContainer.cellListArray[a].contents != "" &&
    	$scope.gameContainer.cellListArray[a].contents === $scope.gameContainer.cellListArray[b].contents &&
    	$scope.gameContainer.cellListArray[b].contents === $scope.gameContainer.cellListArray[c].contents;
    };

    var checkForWin = function() {
    	var rows = [
    	[0,1,2], [3,4,5], [6,7,8],
    	[0,3,6], [1,4,7], [2,5,8],
    	[0,4,8], [2,4,6]
    	];

    	for (var i = 0; i < rows.length; i++) {
    		if (areEqualAndNotEmpty(rows[i][0], rows[i][1], rows[i][2])) {
    			highlightCells(rows[i][0], rows[i][1], rows[i][2]);
    			alert("We have a winner!");
    			return true;
    		}
    	}

    	return false;
    };

    var highlightCells = function() {
    	for (var i = 0; i < arguments.length; i++) {
    		$scope.gameContainer.cellListArray[arguments[i]].highlight = true;
    	}
    }

    $scope.markCell = function(cell) {
    	if (!cell.isMarked) {
    		$scope.gameContainer.moveCount++;
    		cell.contents = 
    			isFirstPlayerTurn ? "X" : "O";
    		cell.isMarked = true;
    		isFirstPlayerTurn = !isFirstPlayerTurn;
    		$scope.background.colored = !$scope.background.colored;
    		if(checkForWin()) {
    			
    		}
    	}
    };
});