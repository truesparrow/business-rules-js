import { expect } from 'chai'
import 'mocha'

import { PrivateUser, Session, SessionState } from '@truesparrow/identity-sdk-js'

import { inferLanguage } from './languages'


describe('inferLanguage', () => {
    it('should return "en" for a session with no user', () => {
        const theSession = new Session();
        expect(inferLanguage(theSession)).to.eql('en');
    });

    it('should return "en" for a session with a user but an unsupported language', () => {
        const theSession = new Session();
        theSession.state = SessionState.ActiveAndLinkedWithUser;
        theSession.user = new PrivateUser();
        theSession.user.language = 'af';

        expect(inferLanguage(theSession)).to.eql('en');
    });

    it('should return "ro" for a session with a user and a supported language', () => {
        const theSession = new Session();
        theSession.state = SessionState.ActiveAndLinkedWithUser;
        theSession.user = new PrivateUser();
        theSession.user.language = 'ro';

        expect(inferLanguage(theSession)).to.eql('ro');
    });
});
