import { helper } from '@ember/component/helper';

export function gameAction([game, me]) {
  if (game.next_player == me.sub) return 'Your turn';
  if (!game.guest) return 'Waiting for a new player';
  return `Waiting ${game.guest.email}`;
}

export default helper(gameAction);
