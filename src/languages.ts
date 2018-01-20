/** The set of supported languages and helper functions. */

/** Imports. Also so typedoc works correctly. */
import { Session, User } from '@truesparrow/identity-sdk-js'


/** The set of supported languages. Languages are ISO 639-1 codes. */
export const SUPPORTED_LANGUAGES = ['en', 'ro'];


/**
 * Extract a language from a session.
 * @note this will only work for session with users. Otherwise it just gives English.
 * @param session - a session to infer the language from.
 * @return The ISO 639-1 code, from {@link SUPPORTED_LANGUAGES}.
 */
export function inferLanguage(session: Session): string {
    if (session.hasUser()) {
        const user = session.user as User;
        if (SUPPORTED_LANGUAGES.indexOf(user.language) != -1) {
            return user.language;
        } else {
            return 'en';
        }
    } else {
        return 'en';
    }
}
