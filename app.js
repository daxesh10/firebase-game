// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAyq26wbymvfgUZnkZPU0_-EUgs73jG7Jk",
    authDomain: "my-project-1470706710924.firebaseapp.com",
    databaseURL: "https://my-project-1470706710924.firebaseio.com",
    projectId: "my-project-1470706710924",
    storageBucket: "my-project-1470706710924.appspot.com",
    messagingSenderId: "805918855405"
  };
  firebase.initializeApp(config);
   //let auth = firebase.auth()

angular.module('fbApp', ['firebase','angularMoment'])
    .controller('SyncController', ['$scope', '$firebaseObject','$firebaseArray','$log' 
    ,function ($scope, $firebaseObject,$firebaseArray,$log) {

$scope.count = 1
$scope.init=function()
{
        let ref = firebase.database().ref().child("game"+$scope.count)
        let msgs = ref.child("msgs")
        let moves = ref.child("moves")


        $scope.posts = $firebaseArray(msgs)
        $scope.validMoves = $firebaseArray(moves)

$scope.count++
}

  $scope.board = [
    [ {pos:1, value: '-' }, {pos:2,value: '-' }, {pos:3, value: '-' } ],
    [ {pos:4, value: '-' }, {pos:5, value: '-' }, {pos:6,value: '-' } ],
    [ {pos:7, value: '-' }, {pos:8, value: '-' }, {pos:9,value: '-' } ]
  ];

  $scope.isDone = function(cell) {
    return cell.value !== '-';
  };      
        
  $scope.move = function(cell) {
    
    if($scope.currentPlayer == null)
    {
        $scope.reset()
        $scope.init()
   }
    
    cell.value = $scope.currentPlayer;
    if (checkForEndOfGame() === false) {
      $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
      
      $scope.validMoves.$add({
          pos:cell.pos,
          value:cell.value
      })

     }
  };
  

    
$scope.rowCheck = function(moves)
{

angular.forEach(moves,function(item,key){


//row match 1
if(item.pos == 1 && item.value == 'x' 
&& item.pos === 2 && item.value == 'x'
&& item.pos === 3 && item.value == 'x')
{
    $scope.rowMatch = true
    $scope.wonBy = 'x'
$log.info("match")    
}

else if(item.pos == 1 && item.value == 'o' 
&& item.pos === 2 && item.value == 'o'
&& item.pos === 3 && item.value == 'o')
{
    $scope.rowMatch = true
    $scope.wonBy = 'O'
}

//row match 2
else if(item.pos == 4 && item.value == 'x' 
&& item.pos === 5 && item.value == 'x'
&& item.pos === 6 && item.value == 'x')
{
    $scope.rowMatch = true
    $scope.wonBy = 'x'
}

else if(item.pos == 4 && item.value == 'o' 
&& item.pos === 5 && item.value == 'o'
&& item.pos === 6 && item.value == 'o')
{
    $scope.rowMatch = true
    $scope.wonBy = 'O'
}

// row mach 3
else if(item.pos == 7 && item.value == 'x' 
&& item.pos === 8 && item.value == 'x'
&& item.pos === 9 && item.value == 'x')
{
    $scope.rowMatch = true
    $scope.wonBy = 'x'
}



else if(item.pos == 7 && item.value == 'o' 
&& item.pos === 8 && item.value == 'o'
&& item.pos === 9 && item.value == 'o')
{
    $scope.rowMatch = true
    $scope.wonBy = 'O'
}

})//end loop
$log.info("row match "+$scope.rowMatch)
//return $scope.rowMatch
}


$scope.colcheck = function(moves)
{


angular.forEach(moves,function(item,key){

if(item.pos == 1 && item.value == 'x' 
&& item.pos === 4 && item.value == 'x'
&& item.pos === 7 && item.value == 'x')
{
    $scope.colMatch = true
    $scope.wonBy = 'x'
}

else if(item.pos == 1 && item.value == 'o' 
&& item.pos === 4 && item.value == 'o'
&& item.pos === 7 && item.value == 'o')
{
    $scope.colMatch = true
    $scope.wonBy = 'o'
}

// column 2
else if(item.pos == 2 && item.value == 'x' 
&& item.pos === 5 && item.value == 'x'
&& item.pos === 8 && item.value == 'x')
{
    $scope.colMatch = true
    $scope.wonBy = 'x'
}

else if(item.pos == 2 && item.value == 'o' 
&& item.pos === 5 && item.value == 'o'
&& item.pos === 8 && item.value == 'o')
{
    $scope.colMatch = true
    $scope.wonBy = 'o'
}

// column 3
else if(item.pos == 2 && item.value == 'x' 
&& item.pos === 5 && item.value == 'x'
&& item.pos === 8 && item.value == 'x')
{
    $scope.colMatch = true
    $scope.wonBy = 'x'
}

else if(item.pos == 2 && item.value == 'o' 
&& item.pos === 5 && item.value == 'o'
&& item.pos === 8 && item.value == 'o')
{
    $scope.colMatch = true
    $scope.wonBy = 'o'
}


})
$log.info("diagonal match" + $scope.colMatch)
//return $scope.colMatch
}

// column Match
//column 1

// diagonalMatch 1

$scope.diagonalCheck= function(moves)
{

angular.forEach(moves,function(item,key){



if(item.pos == 1 && item.value == 'x' 
&& item.pos === 5 && item.value == 'x'
&& item.pos === 9 && item.value == 'x')
{
    $scope.diagonalMatch = true
    $scope.wonBy = 'x'
}

else if(item.pos == 1 && item.value == 'o' 
&& item.pos === 5 && item.value == 'o'
&& item.pos === 9 && item.value == 'o')
{
    $scope.diagonalMatch = true
    $scope.wonBy = 'o'
}

// diagonalMatch 2
else if(item.pos == 3 && item.value == 'x' 
&& item.pos === 5 && item.value == 'x'
&& item.pos === 7 && item.value == 'x')
{
    $scope.diagonalMatch = true
    $scope.wonBy = 'x'
}

else if(item.pos == 3 && item.value == 'o' 
&& item.pos === 5 && item.value == 'o'
&& item.pos === 7 && item.value == 'o')
{
    $scope.diagonalMatch = true
    $scope.wonBy = 'o'
}

})

$log.info("diagonal match" + $scope.diagonalMatch)
//return $scope.diagonalMatch
}




var checkForEndOfGame = function() {
    // TODO: check for a rowMatch, columnMatch, or diagonalMatch
let sortData = []
angular.forEach($scope.validMoves,function(item,key){


//    $log.info("value "+item.value+" pos"+item.pos)
    sortData.push(item)
    
})//end of loop


if(sortData.length >= 8)
{

let rowVal = $scope.rowCheck(sortData)
let colVal = $scope.colcheck(sortData)
let diagonalVal = $scope.diagonalCheck(sortData)


$log.info(JSON.stringify(sortData))
$log.info("row val check "+rowVal)
$log.info("column val check "+colVal)
$log.info("diagonal val check "+diagonalVal)

}

//     $scope.winner = $scope.rowMatch || $scope.colMatch || $scope.diagonalMatch;
    
    if($scope.winner == false)
    {
        $scope.draw = true
    }
    
    return $scope.winner 
  };
  


$scope.status = function()
{

angular.forEach($scope.board,function(item,key) {


  $log.info(item+"item"+" key "+key)
    angular.forEach(item,function(val,vkey){

  $log.info(" val : "+val.value+" position: "+val.pos+" : key "+key)

  
    })


})
}





        
  $scope.reset = function() {

$log.info("setting a new game")   
    $scope.currentPlayer = 'X';
    $scope.winner = false;
    $scope.draw = false;
    $scope.rowMatch = false;
    $scope.colMatch = false;
    $scope.diagonalMatch = false
     $scope.wonBy = ''
    $scope.init()

angular.forEach($scope.board,function(item) {
    angular.forEach(item,function(val,key){

//        $log.info(item+"item")
  //      $log.info(" val : "+val.value+" : key "+key)

        val.value = '-'
    })
})

  };
        
        
        
        
        
        
        
        $scope.addPost = function()
        {
            $scope.posts.$add({
                message:$scope.message,
                date: new Date().toUTCString()
            })
            $scope.message = ' '
        }

          $scope.removePost = function(post){
            $scope.posts.$remove(post);
        }


        
        $scope.buttonClicked = function(x)
        {
            $log.info(x," was clicked")
          //  var canvas = document.getElementById("canvas1")
          
        }

  
        
        // $scope.data = $firebaseObject(ref)

        // // download the data into a local object
        // let syncObject = $firebaseObject(ref);

        // // synchronize the object with a three-way data binding
        // syncObject.$bindTo($scope, "threeWayData")

    }])
