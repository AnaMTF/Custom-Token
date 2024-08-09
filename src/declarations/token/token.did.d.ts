import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'Payout' : () => Promise<string>,
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'getSymbol' : () => Promise<string>,
}
