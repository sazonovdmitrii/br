import { useLang } from 'hooks';
import LANGS from 'lang';

const useLangLink = url => {
    const lang = useLang();
    const { value: defaultLang } = LANGS.find(item => item.default);
    const isDefault = defaultLang === lang;
    const prefix = isDefault ? '' : `/${lang}`;

    return prefix + url;
};

export default useLangLink;
