(function () {
	"use strict"; 
	var $start = $('#start');
	var $board = $('#board');
	var $finish = $('#finish');
	var arrayofboxes = [];
	var winner = null;
	$('#player').hide();
    $('#player').prev().hide();
    $('#player1name').hide();
    $('#player1name').prev().hide();
    $('#player2name').hide();
    $('#player2name').prev().hide();
	//for loop to give each box a uniqe id
	for (var i = 0; i <= 9; i++) {
		var thiss = $('.box').get(i);
		$(thiss).prop('id', 'b'+ i );
	}
	//on load hide all screens but start screen and disable start button
	$($start).siblings().hide();
	$('#startbutton').hide();
	//number of players
	$('.playerSelect').click(function() {
        $(this).addClass("activebut");
        $(this).siblings().removeClass("activebut");
        $('#startbutton').show();
        var playersString = $('.activebut').text();
		var activeNumPlayers = parseInt(playersString);
	 	console.log(activeNumPlayers);
	 	if(activeNumPlayers == 1) {
	 		onePlayerName();
	 	}
	 	else if(activeNumPlayers == 2) {
	 		twoPlayerName();
	 	}
    });
    function onePlayerName() {
    	$('#player').show();
    	$('#player').prev().show();
    	$('#player1name').hide();
    	$('#player1name').prev().hide();
    	$('#player2name').hide();
    	$('#player2name').prev().hide();
    }
    function twoPlayerName() {
    	$('#player').hide();
    	$('#player').prev().hide();
    	$('#player1name').show();
    	$('#player1name').prev().show();
    	$('#player2name').show();
    	$('#player2name').prev().show();
    }
    var activePlayer = 1;
    $('#player1').addClass('active');

	//on start button click show board screen

	$('#startbutton').on('click', function() {
		var playername = $('#player').val();
		var player1name = $('#player1name').val();
		var player2name = $('#player2name').val();
		if ($('#psb1').hasClass('activebut')) {
			if(playername != '') {
				$('#player1').append('<br><p>' + $('#player').val() +'</p>');
				$start.hide();
				$board.show(); 
			}
			else {
				alert('Player Name must be entered')
			}
		}
		else if ($('#psb2').hasClass('activebut')) {
			if(player1name != '' &&  player2name != '') {
				$start.hide();
				$board.show(); 
			}
			else {
				alert('Both player names must be entered')
			}
		}
		
});$('.box').on('mouseenter', function() {
        //stuff to do on mouse enter
        	if(activePlayer == 1) {
        		$(this).addClass('box-hover-1');
        	}
        	else {
        		$(this).addClass('box-hover-2');
        	}
    	});
	$('.box').on('mouseleave', function() {
    	$(this).removeClass('box-hover-1');
    	$(this).removeClass('box-hover-2');
	});
	//create array with winning combinations
	var winCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[2, 4, 6],
		[0, 4, 8]
	];
	//create function for determining a tie game
	function isTie() {
		if (arrayofboxes.length === 9) {
			//end game
		$board.hide();
		$finish.show();
		$($finish).addClass('screen-win-tie');
		$('.message').text("It's a Tie!");
	}
}
	
	//create function for determining if there is a winner
	function isWinner(a, b, c, sym) {
		var $a = $('.box').get(a);
		var $b = $('.box').get(b);
		var $c = $('.box').get(c);
		if ($($a).hasClass(sym) && $($b).hasClass(sym) && $($c).hasClass(sym)) {
			console.log('winner!');
			winner = sym.slice(15);
			console.log(winner);
			$board.hide();
			$finish.show();
			$($finish).addClass('screen-win-' + winner);
			$('.message').text('Winner');
			return winner;
		}
	}
	
	$('.box').on('click', function() {

		console.log(arrayofboxes.length);
		if ($(this).hasClass("box-filled-1") || $(this).hasClass("box-filled-2") ) {
			console.log('already filled');
		}
		else {
			if (activePlayer == 1) {
				$('#player1').removeClass('active');
				$('#player2').addClass('active');
				$(this).addClass('box-filled-1');
				activePlayer = 2;
				(arrayofboxes).push($(this));
				console.log(arrayofboxes.length);
			}
			else if (activePlayer == 2) {
				$('#player2').removeClass('active');
				$('#player1').addClass('active');
				$(this).addClass('box-filled-2');
				activePlayer = 1;
				(arrayofboxes).push($(this));
			}
			
			//for every winning combination run isWinner function
			for (var i = 0; i <= winCombos.length; i++) {
			isWinner(winCombos[i] [1], winCombos[i][1], winCombos[i][2], $(this).attr('class'));
		}
		isTie();
		}
		
	
 	});
	//starting a new game
	$('#ngb').on('click', function newGame() {
		$('.box').each(function () {
			$(this).removeClass('box-filled-1');
			$(this).removeClass('box-filled-2');
			$board.show(); 
			$finish.hide();
		})
		arrayofboxes.length = 0;
		$($finish).removeClass('screen-win-tie');
		$($finish).removeClass('screen-win-1');
		$($finish).removeClass('screen-win-2');
		//set winner back to null
		winner = null;
	});		
}());

			