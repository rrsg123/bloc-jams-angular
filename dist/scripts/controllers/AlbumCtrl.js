(function() {
  function AlbumCtrl(Fixtures, SongPlayer, $scope) {
    $scope.albumData = Fixtures.getAlbum();
    $scope.songPlayer = SongPlayer;
    $scope.songs = $scope.albumData.songs;   
  }
 
  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', '$scope', AlbumCtrl]);
})();
