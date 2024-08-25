export const getToday = function (options ={}){
    const today = new Date();

    if(option?.end)
        today.setHours(23, 59, 59, 999);
    else today.setUTCHours(0,0,0,0)
    return today.toISOString();
};
