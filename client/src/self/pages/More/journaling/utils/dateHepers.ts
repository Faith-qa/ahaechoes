import { duration } from 'moment';

const durationToStr = (ms: number): string => {
    const h = duration(ms).hours();
    const m = duration(ms).minutes();
    const s = duration(ms).seconds();

    let hStr = '';
    if (h !== 0) hStr = `${h}:`;

    let mStr = '';
    mStr = m < 10 ? `0${m}` : `${m}`;

    let sStr = '';
    sStr = s < 10 ? `0${s}` : `${s}`;

    return `${hStr}${mStr}:${sStr}`;
};

export {
    durationToStr,
};
