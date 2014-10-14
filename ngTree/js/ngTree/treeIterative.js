define('ngTree/treeIterative', ['ngTree/treeBase', 'underscore'], function (parentClass, _) {
    return parentClass.extend({
        init: function () {
            var self = parentClass.prototype.init.apply(this, arguments);
            self.extend({
                DEMO_NAME: 'I am iterative tree',
            });
            return self;
        }
    });
});