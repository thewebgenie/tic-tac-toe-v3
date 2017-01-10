(function () {
	"use strict"; 
	var $start = $('#start');
	var $board = $('#board');
	var $finish = $('#finish');
	var arrayofboxes = [];
	var winner = null;
	var activeNumPlayers;
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
		activeNumPlayers = parseInt(playersString);
	 	if(activeNumPlayers == 1) {
	 		onePlayerName();
	 	}
	 	else if(activeNumPlayers == 2) {
	 		twoPlayerName();
	 	}
	 	return activeNumPlayers;
    });
    function onePlayerName() {
    	$('#player').show().focus();
    	$('#player').prev().show();
    	$('#player1name').hide();
    	$('#player1name').prev().hide();
    	$('#player2name').hide();
    	$('#player2name').prev().hide();
    }
    function twoPlayerName() {
    	$('#player').hide();
    	$('#player').prev().hide();
    	$('#player1name').show().focus();
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
				$('#player2').append('<br><p>Computer</p>');
				$start.hide();
				$board.show(); 
			}
			else {
				alert('Player Name must be entered')
			}
		}
		else if ($('#psb2').hasClass('activebut')) {
			if(player1name != '' &&  player2name != '') {
				$('#player1').append('<br><p>' + $('#player1name').val() +'</p>');
				$('#player2').append('<br><p>' + $('#player2name').val() +'</p>');
				$start.hide();
				$board.show(); 
			}
			else {
				alert('Both player names must be entered')
			}
		}
		
});
	// create array with winning combinations
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
	function isWinner(a, b, c, sym) {
		isTie();
		var $a = $('.box').get(a);
		var $b = $('.box').get(b);
		var $c = $('.box').get(c);
		console.log(winner);
		if ($($a).hasClass(sym) && $($b).hasClass(sym) && $($c).hasClass(sym)) {
			
			var winnern = sym.slice(15);
			$board.hide();
			$finish.show();
			$($finish).addClass('screen-win-' + winnern);
			var nameWinner = $('player'+winnern+'name');
			$('.message').text('Wins');
			// if (nameWinner = 'player1name') {
			// 	$('.message').append($('#player1name').val()+' Wins');
			// }
			// if (nameWinner = 'player2name') {
			// 	$('.message').append($('#player2name').val()+' Wins');
			// }
			

			return winner;
}
	}
	
	
	
        //stuff to do on mouse enter
        	
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
			isWinner(winCombos[i][0], winCombos[i][1], winCombos[i][2], $(this).attr('class'));
		}
		}
 	});
       	$('.box').hover(
        	function() {
        		if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')) {

       		}
       		else { 
	        	if(activePlayer == 1) {
	        		$(this).css('background-image', 'url(img/o.svg)');
	        	}
	        	else {
	        		$(this).css('background-image', 'url(img/x.svg)');
	        	}
       		}}, 
       		function() {
        $(this).css('background-image', '');
    	$(this).css('background-image', '');
			}
    	); 
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
		$('.message').text('');
		//set winner back to null
		winner = null;
	});		
}());

			