export function buildURLParams(str) {
    let queryStr = str.trim();
    const queryObj = {};

    let i = 1;
    for (let item of queryStr.split(' ')) {
        queryObj[i] = item;
        i++;
    };

    return new URLSearchParams(queryObj).toString();
}

export function getURLParams(params) {
    const paramsStr = new URLSearchParams(params).toString();
    const paramsArr = paramsStr.split('&');
    const resultArr = [];

    for (let params of paramsArr) {
        const param = params.split('=')[1];
        resultArr.push(param);
    }

    return [resultArr.join(' '), paramsStr];
}

export function convertDate(date) {
    const localTimeArr = new Date(date).toLocaleTimeString().split(' ');
    const localHoursArr = localTimeArr[0].split(':');
    const localHoursStr = localHoursArr[0] + ':' + localHoursArr[1];
    const localAMPM = localTimeArr[1];
    let localTime = localHoursStr + ' ' + localAMPM

    const postDate = new Date(date).toLocaleDateString();
    const todayDate = new Date().toLocaleDateString();

    const postDateArr = postDate.split('/');
    const postMonth = postDateArr[0];
    const postDay = postDateArr[1];
    const postYear = postDateArr[2];

    const todayDateArr = todayDate.split('/');
    const todayMonth = todayDateArr[0];
    const todayDay = todayDateArr[1];
    const todayYear = todayDateArr[2];

    let localDate, olderThanYesterday;
    if (postDate === todayDate) {
        localDate = 'Today';
    } else if (
        postMonth === todayMonth &&
        postYear === todayYear &&
        todayDay - postDay === 1) {
        localDate = 'Yesterday';
    } else {
        localDate = postDate;
        olderThanYesterday = true;
    }

    return [localTime, localDate, olderThanYesterday];
}
