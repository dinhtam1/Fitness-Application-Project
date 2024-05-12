const getNamebyUrl = (url) => {
    let parts = url.split('/');
    let filename = parts[parts.length - 1];
    filename = filename.split('.')[0];
    let words = filename.split('-');
    words = words.slice(2);
    words.pop();
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    let result = words.join(' ');
    return result;
}

module.exports = {
    getNamebyUrl
}