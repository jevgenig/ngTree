define('ngTree/ngMainController', [
    'base/ngControllerBase',
    'ngTree/treeIterative',
    'ngTree/treeRecursive',
    'underscore'
], function (
        parentClass,
        tree1Class,
        tree2Class,
        _
        ) {
    return parentClass.extend({
        ngInit: function ($scope) { //Dummy method definition, for angular's dependencies injection
        },
        init: function (options, ngOptions) {
            var self = parentClass.prototype.init.apply(this, arguments);
            self.ngExtend({
                treeIt: new tree1Class({
                    storageName: 'tree1'
                }),
                treeRec: new tree2Class({
                    storageName: 'tree1'
                })
            }).ngRoute([]);
            return self;
        }
    });
});