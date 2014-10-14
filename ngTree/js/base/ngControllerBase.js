define('base/ngControllerBase', ['base/atom', 'underscore'], function (parentClass, _) {
    return parentClass.extend({
        init: function (options, ngOptions) {
            var self = parentClass.prototype.init.apply(this, arguments);
            self.extend({
                $scope: ngOptions.$scope
            });
            _.extend(self.$scope, {
                template: options.template
            });
            return self;
        },
        ngExtend: function (options) {
            var self = this;
            _.extend(self, options), _.extend(self.$scope, options);
            return self;
        },
        ngRoute: function (names) {
            var self = this;
            _.each(names, function (n) {
                self.$scope[n] = _.bind(self[n], self);
            });
            return self;
        }
    }, {
        ngRegister: function (ngName, module, options) {
            var ngController = this, args = this.prototype.ngInit.toString().match(/\((.*)\)/);
            var argNames = _.map(args && args[1] && args[1].split(",") || [], function (s) {
                return s.trim();
            });

            module.controller(ngName, argNames.concat(function () {
                new ngController(options, _.object(argNames, _.toArray(arguments)));
            }));
        }
    });
});