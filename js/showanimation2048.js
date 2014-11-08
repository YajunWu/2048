/**
 * Created by liuyubobobo on 14-4-11.
 * my site: http://www.liuyubobobo.com
 */
function showNumberWithAnimation( i , j , randNumber ){

    var numberCell = document.getElementById('number-cell-' + i + "-" + j );
    var text = getNumberText( randNumber );
    
    numberCell.style.backgroundColor = getNumberBackgroundColor( randNumber );
    numberCell.style.color = getNumberColor( randNumber );
    numberCell.innerHTML = text;
    numberCell.style.fontSize = getFontSize(text);

    // numberCell.animate({
    //     width:"60px",
    //     height:"60px",
    //     top:getPosTop( i , j ),
    //     left:getPosLeft( i , j )
    // },50);
    numberCell.style.transition = 'width 50ms, height 50ms, top 50ms, left 50ms';
    numberCell.style.webkitTransition = 'width 50ms, height 50ms, top 50ms, left 50ms';
    numberCell.style.mozTransition = 'width 50ms, height 50ms, top 50ms, left 50ms';
    numberCell.style.width = '60px';
    numberCell.style.height = '60px';
    numberCell.style.top = getPosTop( i , j ) + 'px';
    numberCell.style.left = getPosLeft( i , j ) + 'px';

}

function showMoveAnimation( fromx , fromy , tox, toy ){

    var numberCell = document.getElementById('number-cell-' + fromx + '-' + fromy );
    // numberCell.animate({
    //     top:getPosTop( tox , toy ),
    //     left:getPosLeft( tox , toy )
    // },200);
    numberCell.style.transition = 'top 200ms, left 200ms';
    numberCell.style.webkitTransition = 'top 200ms, left 200ms';
    numberCell.style.mozTransition = 'top 200ms, left 200ms';
    numberCell.style.top = getPosTop( tox , toy ) + 'px';
    numberCell.style.left = getPosLeft( tox , toy ) + 'px';
    
}

function updateScore( score ){
    document.getElementById('score').innerHTML = score;
}
