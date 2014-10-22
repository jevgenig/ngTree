class TreeNode extends Backbone.Model
  constructor: -> 
    super;
    @._binds = {}
    @.children = ko.observableArray()
    @.filter = ko.observable()
    @.isOpen = ko.observable true
    @.on 'change', (d)-> 
      if @ is d
        for prop,value of d.changed
          @._binds[prop] and @._binds[prop](value)
  load:(o)->
    o = o or {}
    @.set 'name',o.name if o.name
    @.children (@._regChild new TreeNode().load value for index,value of o.children)
    @
  bind:(name,value) ->
    self=@
    bind = @._binds[name] or @._binds[name] = (ko.observable(@.get name).subscribe (v)-> self.set name,v).target;
    @.set name,value if value isnt undefined
    bind;
  _regChild:(c)->
    c.on 'change',@.trigger.bind @,'change'
    c
  toggle:->
    @.isOpen !@.isOpen()
  edit: ()  ->
    (newName = prompt 'Change name',@.get 'name') and @._edit(newName)
  _edit: (newName)  ->
    @.set 'name', newName
  add: ->
    (newName = prompt 'Enter name') and @._add(newName)
  _add: (newName)->
    @.children.push (@._regChild new TreeNode {name:newName})
    @.trigger 'change'
  toJSON: ->
    json = super() 
    c = @.children()
    json.children = (value.toJSON() for index,value of c) if c and c.length
    json;
  childrenFiltered: ->
    filter = @.filter()
    children = @.children()
    if filter then _.filter children,(child)->
      ((child.bind 'name')().indexOf filter) > -1 
    else children
      
      
    
class App
  constructor: ->
    @.treeNode = treeNode = (new TreeNode {name:'Root',level:0})
      .load JSON.parse localStorage.getItem 'koTree'
      .on 'change', -> localStorage.setItem 'koTree',JSON.stringify treeNode.toJSON()
  render:(el) -> 
    ko.applyBindings @.treeNode,el.get and el.get(0) || el
    return @

