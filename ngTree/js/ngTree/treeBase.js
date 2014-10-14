define('ngTree/treeBase', ['base/atom', 'underscore'], function (parentClass, _) {
    return parentClass.extend({
        init: function (options) {
            var self = parentClass.prototype.init.apply(this, arguments);
            self.extend({
                $$treeId: options.storageName,
                nodes: []
            });
            return self;
        },
        restoreState: function (def) {
            var self = this, item = localStorage.getItem(self.$$treeId);
            self.nodes = item && JSON.parse(item) || def;
            return self;
        },
        saveState: function () {
            var self = this;
            localStorage.setItem(self.$$treeId, JSON.stringify(_.map(self.nodes, function (node) {
                return _.pick(node, ['id', 'parentId', 'show', 'name']); //Let's store only required keys
            })));
            return self;
        }
    });
});