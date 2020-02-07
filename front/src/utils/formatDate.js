import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const formatDate = ({ date, format, day }) => {
    if (day) {
        return dayjs()
            .add(day, 'day')
            .format(format);
    }

    return dayjs(date).format(format);
};

export default formatDate;
