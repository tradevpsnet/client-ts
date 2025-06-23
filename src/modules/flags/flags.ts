import * as FlagsMap from '@tradevpsnet/flags';
import React from 'react';
import { EmptyInputError } from './errors';

const COUNTRY_ALIASES: Record<string, string> = {
  usd: 'us',
  usdt: 'us',
  ust: 'us',
  us: 'us',
  eur: 'eu',
  euro: 'eu',
  eurozone: 'eu',
  emu: 'eu',
  eu: 'eu',
  gbp: 'gb',
  jpy: 'jp',
  aud: 'au',
  cad: 'ca',
  chf: 'ch',
  cny: 'cn',
  inr: 'in',
  all: 'un',
  world: 'un',
  g7: 'un',
  g20: 'un',
};


function formatCode(code: string): string {
  const lowerCode = code.toLowerCase();
  return lowerCode.charAt(0).toUpperCase() + lowerCode.slice(1);
}

export class Flags {
  get(...args: string[]): (React.FC<React.SVGProps<SVGSVGElement>> | undefined)[] {
    if (!args.length) {
      throw new EmptyInputError();
    }

    let codes: string[] = [];

    if (args.length === 1 && args[0].includes('/')) {
      codes = args[0].split('/').map(part => part.trim().toLowerCase());
    } else {
      codes = args.map(code => code.trim().toLowerCase());
    }

    const countryCodes = codes.map(code => {
      const alias = COUNTRY_ALIASES[code] || code;
      return formatCode(alias);
    });

    const resolvedComponents = countryCodes.map(code => {
      const componentName = code as keyof typeof FlagsMap;
      if (Object.prototype.hasOwnProperty.call(FlagsMap, componentName)) {
        const component = FlagsMap[componentName];
        return { code, component };
      }
      return null;
    });
    
    return resolvedComponents.map((entry, index) => {
      if (entry) return entry.component;

      const fallback = resolvedComponents.find(e => e !== null);
      return fallback?.component || FlagsMap.Us;
    });
  }
}