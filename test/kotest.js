describe("Testing Model ", function () {
    var model, newValue = 'newvalue';
    beforeEach(function () {
        model = new TreeNode({name: 'Root'});
    });

    it("binding persistance", function () {
        expect(model.bind('name')).toBe(model.bind('name'));
    });

    it("set|get", function () {
        model.set('name', newValue);
        expect(model.get('name')).toBe(newValue);
    });
    it(" ==> binding", function () {
        var b = model.bind('name');
        model.set('name', newValue);
        expect(b()).toBe(newValue);
    });

    it(" binding(value) ==> ", function () {
        model.bind('name', newValue);
        expect(model.get('name')).toBe(newValue);
    });

    it(" binding ==>", function () {
        model.bind('name')(newValue);
        expect(model.get('name')).toBe(newValue);
    });

    it(" load", function () {
        model.load({name: newValue});
        expect(model.get('name')).toBe(newValue);
    });
    it(" bind load", function () {
        var b = model.bind('name');
        model.load({name: newValue});
        expect(b()).toBe(newValue);
    });
});

describe("Testing children", function () {
    var model;
    beforeEach(function () {
        model = new TreeNode({name: 'Root'}).load({children: [{name: 'child1'}, {name: 'child2'}, {name: 'child3'}]});
    });
    it(" load", function () {
        expect(model.children().length).toBe(3);
    });
    it(" add", function () {
        model._add('child4');
        expect(model.children().length).toBe(4);
    });

    it(" add edit filter", function () {
        var newModel = _.last(model._add('child4').children());
        newModel._edit('child1');
        model.filter('child1');
        expect(model.childrenFiltered().length).toBe(2);
    });

    it(" filter fresh add", function () {
        model._add('child4').filter('child4');
        expect(model.childrenFiltered().length).toBe(1);
        expect(model.childrenFiltered()[0].get('name')).toBe('child4');

    });
});
describe("Testing filtering ", function () {
    var model, newValue = 'newvalue';
    beforeEach(function () {
        model = new TreeNode({name: 'Root'}).load({children: [{name: 'child1'}, {name: 'child2'}, {name: 'child3'}]});
    });

    it(" all results", function () {
        expect(model.childrenFiltered().length).toBe(model.children().length);
    });
    it(" one result", function () {
        model.filter('child1');
        expect(model.childrenFiltered().length).toBe(1);
    });
    it(" as you type", function () {
        model.filter('c');
        expect(model.childrenFiltered().length).toBe(3);
        model.filter('ch');
        expect(model.childrenFiltered().length).toBe(3);
        model.filter('child');
        expect(model.childrenFiltered().length).toBe(3);
        model.filter('child1');
        expect(model.childrenFiltered().length).toBe(1);
    });
});