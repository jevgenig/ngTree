'use strict';
define('test/test', ['underscore', 'jquery'], function (_, $) {
    describe('testing', function () {
        var module, controller;
        beforeEach(function (done) {
            require(['ngTree/ngModule', 'ngTree/ngMainController'], function (ngModule, mainController) {
                module = ngModule;
                mainController.ngRegister('treeMainController', ngModule, {
                    template: ngViewPrefix + 'views/tree.html'
                }, function (ctrl) {
                    controller = ctrl;
                    setTimeout(done, 100);
                });
                $("body").append($("<div></div>").addClass("treeContainer"));

                angular.bootstrap($(".treeContainer").attr({
                    'ng-include': 'template',
                    'ng-controller': 'treeMainController'
                }), [ngModule.name]);

            });
        });

        it('ngModule and tree ', function (done) {
            expect(module.name).toEqual('myApp');
            done();
        });

        it('controller inited trees', function (done) {
            expect(controller.treeRec).toBeDefined();
            done();
        });
        it('controller inited trees', function (done) {
            expect(controller.treeRec).toBeDefined();
            expect(controller.treeRec.rootNode).toBeDefined();
            expect(controller.treeRec.rootNode.name).toEqual('Root');
            done();
        });
    });

});