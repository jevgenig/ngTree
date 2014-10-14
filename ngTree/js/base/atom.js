define('base/atom', ['underscore'], function (_) {
    var _atom = _.extend(function () {
        var self = this, args = arguments.length && arguments || [{}];
        _.each(['init'], function (n) {
            self[n].apply(self, args);
        });
        return self;
    }, {
        extend: function (protoProps, staticProps) {
            var parent = this, child = _.extend(protoProps && _.has(protoProps, 'constructor') ? protoProps.constructor : function () {
                return parent.apply(this, arguments);
            }, parent, staticProps), Surrogate = function () {
                this.constructor = child;
            };
            Surrogate.prototype = parent.prototype;
            child.prototype = new Surrogate;
            if (protoProps)
                _.extend(child.prototype, protoProps);
            child.__super__ = parent.prototype;
            return child;
        }

    });
    _.extend(_atom.prototype, {
        init: function (options) {
            this.extend({
                
            });
            return this;
        },
        extends: function (t) {
            var s = this, c = this.constructor;
            return !arguments.length && c || c.prototype === t.prototype || function () {
                while (!_.isUndefined(s = s.constructor.__super__))
                    if (s === t.prototype)
                        return true;
                return false;
            }();
        },
        dispose: function () {
            var self = this;
            //@TODO Put logic here, if needed

            return self;
        },
        extend: function () {
            var self = this;
            _.each(arguments || [], function (obj) {
                _.merge(self, obj);
            });
            return self;
        }
    });
    return _atom;
});