define(function(require, exports, module) {
    var support = require('support2048');
    var touch = require('touch');
    var showanimation = require('showanimation2048');

    var board = new Array();
    var score = 0;
    var hasConflicted = new Array();
    var grid;
    grid = document.getElementById('grid-container');
    window.generateOneNumber = generateOneNumber;
    window.updateBoardView = updateBoardView;
    window.isgameover = isgameover;
    
    exports.newgame = function(){
         //初始化棋盘格
        init();
        document.getElementById('gameover').style.display = 'none';
        //在随机两个格子生成数字
        generateOneNumber();
        generateOneNumber();

        touch.init(grid, touchAction);
    }

    function init(){
        for(var i = 0 ; i < 4 ; i ++)
            for(var j = 0 ; j < 4 ; j ++){
                var gridCell = document.getElementById('grid-cell-'+i+"-"+j);
                gridCell.style.top = support.getPosTop(i , j) + 'px';
                gridCell.style.left = support.getPosLeft(i , j) + 'px';
            }

        for(i = 0 ; i < 4 ; i ++){
            board[i] = new Array();
            hasConflicted[i] = new Array();
            for(j = 0 ; j < 4 ; j ++){
                board[i][j] = 0;
                hasConflicted[i][j] = false;
            }
        }

        updateBoardView();

        score = 0;
        document.getElementById('score').innerHTML = score;
    }

    function updateBoardView(){
        var grid = document.getElementById('grid-container')
        var numberCells = document.getElementsByClassName('number-cell');
        for(var len = numberCells.length - 1; len >= 0; len--) {
            grid.removeChild(numberCells[len]);
        }
        for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 0 ; j < 4 ; j ++ ){
                var numberCell = document.createElement('div');
                numberCell.className = 'number-cell';
                numberCell.id = 'number-cell-'+i+'-'+j;
                grid.appendChild(numberCell);
                var theNumberCell = document.getElementById('number-cell-'+i+'-'+j);
                var text;
                if( board[i][j] == 0 ){
                    theNumberCell.style.width = '0px';
                    theNumberCell.style.height = '0px';
                    theNumberCell.style.top = support.getPosTop(i,j) + 50 + 'px';
                    theNumberCell.style.left = support.getPosLeft(i,j) + 50 + 'px';
                    theNumberCell.style.fontSize = '20px';
                }
                else{
                    text = support.getNumberText(board[i][j]);
                    theNumberCell.style.width = '60px';
                    theNumberCell.style.height = '60px';
                    theNumberCell.style.top = support.getPosTop(i,j) + 'px';
                    theNumberCell.style.left = support.getPosLeft(i,j) + 'px';
                    theNumberCell.style.backgroundColor = support.getNumberBackgroundColor(board[i][j]);
                    theNumberCell.style.color = support.getNumberColor(board[i][j]);
                    theNumberCell.innerHTML = text;
                    theNumberCell.style.fontSize = support.getFontSize(text);
                }

                hasConflicted[i][j] = false;
            }
    }

    function generateOneNumber(){
        if(support.nospace(board))
            return false;

        //随机一个位置
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));

        var times = 0;
        while(times < 50){
            if(board[randx][randy] == 0)
                break;

            randx = parseInt(Math.floor(Math.random() * 4));
            randy = parseInt(Math.floor(Math.random() * 4));

            times ++;
        }
        if(times == 50){
            for(var i = 0 ; i < 4 ; i ++)
                for(var j = 0 ; j < 4 ; j ++){
                    if(board[i][j] == 0){
                        randx = i;
                        randy = j;
                    }
                }
        }

        //随机一个数字
        var randNumber = Math.random() < 0.5 ? 2 : 4;

        //在随机位置显示随机数字
        board[randx][randy] = randNumber;
        showanimation.showNumberWithAnimation(randx , randy , randNumber);

        return true;
    }

    document.onkeydown = function(event){
        switch(event.keyCode){
            case 37: //left
                if(moveLeft()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isgameover()",300);
                }
                break;
            case 38: //up
                if(moveUp()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isgameover()",300);
                }
                break;
            case 39: //right
                if(moveRight()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isgameover()",300);
                }
                break;
            case 40: //down
                if(moveDown()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isgameover()",300);
                }
                break;
            default: //default
                break;
        }
    };

    function touchAction(direct) {
        if(direct == 'left' && moveLeft()) {
            setTimeout("generateOneNumber()",210);
            setTimeout("isgameover()",300);
        }
        if(direct == 'up' && moveUp()) {
            setTimeout("generateOneNumber()",210);
            setTimeout("isgameover()",300);
        }
        if(direct == 'right' && moveRight()) {
            setTimeout("generateOneNumber()",210);
            setTimeout("isgameover()",300);
        }
        if(direct == 'down' && moveDown()) {
            setTimeout("generateOneNumber()",210);
            setTimeout("isgameover()",300);
        }
    }

    function isgameover() {
        if(support.nospace(board) && nomove(board)) {
            gameover();
        }
    }

    function gameover() {
        var gameover = document.getElementById('gameover');
        gameover.style.display = 'box';
        gameover.style.display = '-ms-box';
        gameover.style.display = '-webkit-box';
        gameover.style.display = '-moz-box';
    }

    function moveLeft(){

        if(!support.canMoveLeft(board))
            return false;

        //moveLeft
        for(var i = 0 ; i < 4 ; i ++)
            for(var j = 1 ; j < 4 ; j ++){
                if(board[i][j] != 0){

                    for(var k = 0 ; k < j ; k ++){
                        if(board[i][k] == 0 && support.noBlockHorizontal(i , k , j , board)){
                            //move
                            showanimation.showMoveAnimation(i , j , i , k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            break;
                        }
                        else if(board[i][k] == board[i][j] && support.noBlockHorizontal(i , k , j , board) && !hasConflicted[i][k]){
                            //move
                            showanimation.showMoveAnimation(i , j , i , k);
                            //add
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            //add score
                            score += board[i][k];
                            showanimation.updateScore(score);

                            hasConflicted[i][k] = true;
                            break;
                        }
                    }
                }
            }

        setTimeout("updateBoardView()",200);
        return true;
    }

    function moveRight() {
        if(!support.canMoveRight(board))
            return false;

        //moveRight
        for(var i = 0 ; i < 4 ; i ++)
            for(var j = 2 ; j >= 0 ; j --) {
                if(board[i][j] != 0) {
                    for(var k = 3 ; k > j ; k --) {

                        if(board[i][k] == 0 && support.noBlockHorizontal(i , j , k , board)) {
                            //move
                            showanimation.showMoveAnimation( i , j , i , k );
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            break;
                        }
                        else if(board[i][k] == board[i][j] && support.noBlockHorizontal(i , j , k , board) && !hasConflicted[i][k]) {
                            //move
                            showanimation.showMoveAnimation(i , j , i , k);
                            //add
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            //add score
                            score += board[i][k];
                            showanimation.updateScore(score);

                            hasConflicted[i][k] = true;
                            break;
                        }
                    }
                }
            }

        setTimeout("updateBoardView()",200);
        return true;
    }

    function moveUp() {

        if(!support.canMoveUp(board))
            return false;

        //moveUp
        for(var j = 0 ; j < 4 ; j ++)
            for(var i = 1 ; i < 4 ; i ++) {
                if(board[i][j] != 0) {
                    for(var k = 0 ; k < i ; k ++) {

                        if(board[k][j] == 0 && support.noBlockVertical(j , k , i , board)) {
                            //move
                            showanimation.showMoveAnimation(i , j , k , j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            break;
                        }
                        else if(board[k][j] == board[i][j] && support.noBlockVertical(j , k , i , board) && !hasConflicted[k][j]){
                            //move
                            showanimation.showMoveAnimation(i , j , k , j);
                            //add
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            //add score
                            score += board[k][j];
                            showanimation.updateScore(score);

                            hasConflicted[k][j] = true;
                            break;
                        }
                    }
                }
            }

        setTimeout("updateBoardView()",200);
        return true;
    }

    function moveDown() {
        if(!support.canMoveDown(board))
            return false;

        //moveDown
        for(var j = 0 ; j < 4 ; j ++)
            for(var i = 2 ; i >= 0 ; i --) {
                if(board[i][j] != 0) {
                    for(var k = 3 ; k > i ; k --) {

                        if(board[k][j] == 0 && support.noBlockVertical(j , i , k , board)) {
                            //move
                            showanimation.showMoveAnimation(i , j , k , j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            break;
                        }
                        else if(board[k][j] == board[i][j] && support.noBlockVertical(j , i , k , board) && !hasConflicted[k][j]) {
                            //move
                            showanimation.showMoveAnimation(i , j , k , j);
                            //add
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            //add score
                            score += board[k][j];
                            showanimation.updateScore(score);

                            hasConflicted[k][j] = true;
                            break;
                        }
                    }
                }
            }

        setTimeout("updateBoardView()",200);
        return true;
    }

    function nomove(board){
        if( support.canMoveLeft( board ) ||
            support.canMoveRight( board ) ||
            support.canMoveUp( board ) ||
            support.canMoveDown( board ) )
            return false;

        return true;
    };


});


