(function () {
    //Global things
    window.IS_DEV = true;
    window.IS_LIVE = false;

    //Let's load 
    require_config(function () {

        require(IS_LIVE ? ['js/bundle.min.js'] : [], function () {
            require(['ngTree/ngModule', 'ngTree/ngMainController', 'jquery'], function (ngModule, mainController) {
                mainController.ngRegister('treeMainController', ngModule, {
                    template: 'views/tree.html'
                });
                angular.bootstrap($(".treeContainer").attr({
                    'ng-include': 'template',
                    'ng-controller': 'treeMainController'
                }), [ngModule.name]);

            });
        });
    });
    function require_config(next) {
        var __devPath = function (mainPath, suffix, devSuffix) {
            return IS_DEV ? mainPath + (devSuffix ? devSuffix : "") : mainPath + (suffix !== false ? suffix || ".min" : '');
        }, l = window.location, devPreffix = l.origin;
        if (l.pathname !== "/")
            devPreffix += l.pathname.replace("/index.html", "");
        require.config({
            urlArgs: "rand=" + (new Date().getTime()),
            baseUrl: devPreffix,
            packages: [
                {
                    name: 'ngTree',
                    location: 'js/ngTree',
                    main: 'ngTree'
                },
                {
                    name: 'base',
                    location: 'js/base'
                }
            ],
            shim: {
            },
            paths: {
                'bootstrap': __devPath('../libs/twitter-bootstrap/js/bootstrap'),
                'underscore': __devPath('../libs/lodash.js/lodash.compat'),
                'jquery': __devPath('../libs/jquery/jquery', '.min'),
                'angular': __devPath('../libs/angular.js/angular', '.min'),
            },
            waitSeconds: 30
        });
        setTimeout(next, 0);
    }

})();