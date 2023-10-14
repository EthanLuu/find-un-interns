export const formatDataString = (rawDate: string) => {
    const date = new Date(rawDate);
    return date.toLocaleDateString("zh-CN");
};
