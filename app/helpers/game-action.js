import { helper } from '@ember/component/helper';

export function gameAction([game, me]) {
  if (game.next_player == me.sub) return 'Your turn';
  if (!game.guest) return 'Waiting for a new player';
  const player = game.next_player === game.host.id ? game.host : game.guest;
  return `Waiting ${player.email}`;
}

export default helper(gameAction);
