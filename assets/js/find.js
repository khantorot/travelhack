(function () {
    var body = document.body,
        titles = [].slice.call(document.querySelectorAll('#stack-titles > li')),
        totalTitles = titles.length,
        stack = new ElastiStack(document.getElementById('elasticstack'), {
            onUpdateStack: function (idx) {
                classie.remove(titles[idx === 0 ? totalTitles - 1 : idx - 1], 'current');
                classie.add(titles[idx], 'current');
            }
        })
})();



hideSideBar();
