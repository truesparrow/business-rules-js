import { Message } from '@truesparrow/common-js'

export const hello: Message = {
    en: 'Hello',
    ro: 'Buna'
};

export const world: Message = {
    en: (f: string) => `World ${f}`,
    ro: (f: string) => `Lume ${f}`
};
