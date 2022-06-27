import format from 'date-fns/format';

const DATE_FORMAT = 'yyyy MMMM dd';

export const formatDate = (dateStr: string) =>
    format(new Date(dateStr), DATE_FORMAT);
