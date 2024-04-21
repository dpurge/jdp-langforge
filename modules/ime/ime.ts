import { IMEType, IMESchema } from './interface.ts';
// import { Trie } from "./trie.ts";


// export class IME {
//   constructor(ime: IMEType) {
//     console.log(ime);
//   }
// }

export async function fetchIME(url: string): Promise<IMEType> {
  const response = await fetch(url, {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      }
    });
  const ime = IMESchema.parse(await response.json());
  return ime;
}