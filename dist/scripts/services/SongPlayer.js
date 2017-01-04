(function() {
	function SongPlayer($rootScope, Fixtures) {
 		var SongPlayer = {};

		/**
		* @desc Current album object retrieved from fixtures
		* @type {Object}
		*/
		
		var currentAlbum = Fixtures.getAlbum();

		/**
		* @desc Buzz object audio file (private)
		* @type {Object}
		*/
		
		var currentBuzzObject = null;

		/**
		* @function setSong (private)
		* @desc Stops currently playing song, loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		
		var setSong = function(song) {

			if (currentBuzzObject) {
				currentBuzzObject.stop();

				if (SongPlayer.currentSong)
				{
					SongPlayer.currentSong.playing = null;
				}

		}
		}

		currentBuzzObject = new buzz.sound(song.audioUrl, {
			formats: ['mp3'],
			preload: true
		});
		
		currentBuzzObject.setVolume(50);

		/**
		* @desc Buzz object time updateswhen the seek bar is dragged
		*/
		
		currentBuzzObject.bind('timeupdate', function() {
			$rootScope.$apply(function() {
				SongPlayer.currentTime = currentBuzzObject.getTime();
			});
		});	
		
		/**
		 * @desc Active song object from list of songs
		 * @type {Object}
		 */

		SongPlayer.currentSong = null;



		/**
		 * @function playSong (private)
		 * @desc Plays the loaded currentBuzzObject
		 * @param {Object} song
		 */

		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
			SongPlayer.currentAlbum = currentAlbum;
		};

		/**
		 * @function stopSong (private)
		 * @desc Stops the loaded currentBuzzObject
		 * @param {Object} song
		 */

		var stopSong = function(song) {
			currentBuzzObject.pause();
			currentBuzzObject.setTime(null);
			song.playing = false;
			SongPlayer.currentAlbum = null;
			SongPlayer.currentSong = null;
		};

		/**
		 * @function play
		 * @desc Play current or new song
		 * @param {Object} song
		 */

		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (currentSong !== song) {
				setSong(song);
				currentBuzzObject.play();    
				song.playing = true;
			}	

			else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
				}
			}
		};

		/**
		 * @function pause
		 * @desc Pause current song
		 * @param {Object} song
		 */

		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

		/**
		 * @function SongPlayer.previous (public method of the SongPlayer service)
		 * @desc Get index of the song preceding currentSong
		 */

		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;

			if (currentSongIndex < 0) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/**
		 * @function SongPlayer.next (public method of the SongPlayer service)
		 * @desc Get index of the song following currentSong
		 */

		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;

			if (currentSongIndex >= currentAlbum.songs.length) {
				stopSong(SongPlayer.currentSong);
			} 
			else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}

		};

		

		/**
		 * @function setCurrentTime
		 * @desc Set current time (in seconds) of currently playing song
		 * @param {Number} time
		 */

		SongPlayer.setCurrentTime = function(time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};
		

		return SongPlayer;
		}

	angular
 		.module('blocJams')
 		.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);

})();
