import hardtack from 'hardtack';
import { nanoid } from 'nanoid';

const createSession = () => {
    let session = hardtack.get('session_key');

    if (!session) {
        const date = new Date();
        const currentYear = date.getFullYear();
        session = nanoid();

        date.setFullYear(currentYear + 1);
        hardtack.set('session_key', session, {
            path: '/',
            expires: date.toUTCString(),
        });
    }

    return session;
};

export default createSession;
