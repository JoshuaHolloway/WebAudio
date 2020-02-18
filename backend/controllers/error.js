// [401]
const get404 = (req, res, next) => {
    console.log('----404----');
    res.status(404);
    res.render('404', { page_title: 'Page Not Found' });
};

exports.get404 = get404;
