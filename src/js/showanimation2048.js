define(function(require, exports, module) {
    var support = require('support2048');
    exports.showNumberWithAnimation = function(i, j, randNumber) {

        var numberCell = document.getElementById('number-cell-' + i + "-" + j);
        var text = support.getNumberText(randNumber);
        
        numberCell.style.backgroundColor = support.getNumberBackgroundColor(randNumber);
        numberCell.style.color = support.getNumberColor(randNumber);
        numberCell.innerHTML = text;
        numberCell.style.fontSize = support.getFontSize(text);

        numberCell.style.transition = 'width 80ms, height 80ms, top 80ms, left 80ms';
        numberCell.style.webkitTransition = 'width 80ms, height 80ms, top 80ms, left 80ms';
        numberCell.style.mozTransition = 'width 80ms, height 80ms, top 80ms, left 80ms';
        numberCell.style.width = '60px';
        numberCell.style.height = '60px';
        numberCell.style.top = support.getPosTop(i, j) + 'px';
        numberCell.style.left = support.getPosLeft(i, j) + 'px';

    }

    exports.showMoveAnimation = function(fromx, fromy, tox, toy) {

        var numberCell = document.getElementById('number-cell-' + fromx + '-' + fromy);
        
        numberCell.style.transition = 'top 100ms, left 100ms';
        numberCell.style.webkitTransition = 'top 100ms, left 100ms';
        numberCell.style.mozTransition = 'top 100ms, left 100ms';
        numberCell.style.top = support.getPosTop(tox, toy) + 'px';
        numberCell.style.left = support.getPosLeft(tox, toy) + 'px';
         
    }

    exports.updateScore = function(score) {
        document.getElementById('score').innerHTML = score;
    }
});