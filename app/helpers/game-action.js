import { helper } from '@ember/component/helper';

export function gameAction([host, guest, next_player, me]) {
  if (next_player == me.sub) return 'Your turn';
  if (!guest) return 'Waiting for a new player';
  const player = next_player === host.id ? host : guest;
  return `Waiting ${player.email}`;
}

export default helper(gameAction);
