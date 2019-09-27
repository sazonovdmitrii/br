import { useLang } from 'hooks';
import LANGS from 'lang';

const useLangLinks = urls => {
    const lang = useLang();
    const { value: defaultLang } = LANGS.find(item => item.default);
    const isDefault = defaultLang === lang;
    const prefix = isDefault ? '' : `/${lang}`;

    return urls.map(url => prefix + url);
};

export default useLangLinks;
