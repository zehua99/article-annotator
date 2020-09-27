import { frontend } from '../config';

function getResource(location: string) {
  let loc = location;
  if (loc.startsWith('/')) loc = loc.slice(1);
  return `${frontend}${loc}`;
}

export default getResource;
