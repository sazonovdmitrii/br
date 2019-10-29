import { useIntl } from 'react-intl';

const useFormatMessage = (arrayOfIds = []) => {
    const { formatMessage } = useIntl();

    return arrayOfIds.map(({ id, values }) => formatMessage({ id }, values));
};

export default useFormatMessage;
