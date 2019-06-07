export default function () {

  this.namespace = '/api/v1';

  this.get('/games', function (db) {
    const games = db.games.all().models;
    return { games }
  })

  this.get('/games/:game_id', function (db, req) {
    return { game: db.games.find(req.params.game_id) }
  })
}
