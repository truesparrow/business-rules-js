/** Checks around text sources. */

/** Imports. Also so typedoc works correctly. */
import { expect } from 'chai'
import 'mocha'
import * as requireDirectory from 'require-directory'

import { SUPPORTED_LANGUAGES } from './languages'


/**
 * Runs a check on all of the text source files in a given source tree to see if any
 * message is missing one of the supported languages.
 * @note The common pattern in the frontend services is to have for each component X.tsx
 *     which needs to show messages a X.text.ts with just the messages in {@link Message}
 *     format. This is depended upon by X.tsx.
 * @note This is meant to be run in a test file, and will generate a bunch of mocha
 *     describe calls. There'll be one for each .text.ts file. For each message in turn,
 *     there will be on it call, asserting that all of the languages in {@link SUPPORTED_LANGUAGES}
 *     are present.
 * @param m - the module relative to which to perform the check.
 */
export function checkTextSourcesContainAllLanguages(m: NodeModule): void {
    // What a massive-massive hack
    const flat: Map<string, any> = new Map<string, any>();
    let currentN: string = '__A_BAD_NAME__.js'; // will fail textRe's test!

    requireDirectory(m, {
        include: /.text.js$/,
        rename: (n: string) => {
            currentN = n;
            return n;
        },
        visit: (obj: any) => {
            if (/.text$/.test(currentN)) {
                flat.set(currentN, obj);
            }
        }});

    for (let [moduleName, contents] of flat) {
        describe('Checking text sources contain all supported languages', () => {
            describe(`In "${moduleName}"`, () => {
                for (let k of Object.keys(contents)) {
                    it(`Message "${k}" should contain all supported languages`, () => {
                        expect(contents[k]).to.have.all.keys(SUPPORTED_LANGUAGES);
                    });
                }
            });
        });
    }
}
