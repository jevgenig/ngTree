define('ngTree/treeRecursive', ['ngTree/treeBase', 'underscore'], function (parentClass, _) {
    return parentClass.extend({
        init: function () {
            var self = parentClass.prototype.init.apply(this, arguments);
            self.extend({
                DEMO_NAME: 'Using ParentId'
            }).restoreState([{
                    id: 1,
                    parentId: 0,
                    name: 'Root',
                    show: true
                }]).extend({
                rootNode: _.find(self.nodes, function (node) {
                    return node.parentId == 0;
                })
            });
            return self;
        },
        nodesFlat: function (parentNode, depth) {
            var self = this, parentNode = parentNode || self.rootNode, res = [parentNode], depth = depth || 0;
            var children = self.getChildNodes(parentNode);
            parentNode.depth = depth;
            parentNode.haveChildren = children.length;
            if (parentNode.show) {
                _.each(children, function (node) {
                    res = res.concat(self.nodesFlat(node, depth + 1));
                });
            }
            return res;
        },
        getChildNodes: function (parentNode) {
            var self = this;
            return parentNode && _.filter(self.nodes, function (node) {
                return node.parentId == parentNode.id;
            }) || [];
        },
        removeNode: function (treeNode) {
            var self = this;
            _.remove(self.nodes, treeNode);
            self.saveState();
            return self;
        },
        editNode: function (treeNode) {
            var self = this;
            var name = prompt("Edit name:", treeNode.name);
            if (name !== null)
                treeNode.name = name;
            self.saveState();
            return self;
        },
        toggleNode: function (treeNode) {
            var self = this;
            treeNode.show = !treeNode.show;
            self.saveState();
            return self;
        },
        addNode: function (parentNode) {
            var self = this, parentNode = parentNode || self.rootNode;
            var name = prompt("Enter child's name");
            if (name !== null) {
                parentNode.show = true;
                self.nodes.push({
                    parentId: parentNode.id,
                    id: parseInt(_.max(self.nodes, function (node) {
                        return node.id;
                    }).id) + 1,
                    name: name
                });
                self.saveState();
            }
            return self;
        }
    });
});