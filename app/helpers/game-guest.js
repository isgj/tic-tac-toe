import { helper } from '@ember/component/helper';

export function gameGuest([game]) {
  if (game.guest) return game.guest.email;
  return 'Noone'
}

export default helper(gameGuest);
