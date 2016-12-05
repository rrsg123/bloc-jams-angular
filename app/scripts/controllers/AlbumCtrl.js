(function() {
	function AlbumCtrl(Fixtures, SongPlayer) {
		this.songPlayer = SongPlayer;
	}

	angular
 		.module('blocJams')
 		.controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();
