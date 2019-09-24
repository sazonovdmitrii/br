export default [
    {
        value: 'en',
        native: 'English (US)',
    },
    {
        default: true,
        value: 'ru',
        native: 'Русский',
    },
    // make default lang always last
].sort(item => (item.default && 1) || -1);
