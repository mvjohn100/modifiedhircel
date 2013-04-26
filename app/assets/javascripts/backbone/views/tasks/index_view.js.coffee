Hircle.Views.Tasks ||= {}

class Hircle.Views.Tasks.IndexView extends Backbone.View
  template: JST["backbone/templates/tasks/index"]

  initialize: () ->

  addAll: () =>
    @options.tasks.each(@addOne)

  addOne: (task) =>
    view = new Hircle.Views.Tasks.TaskView({model : task})
    @$("tbody").append(view.render().el)

  render: =>
    $(@el).html(@template(tasks: @options.tasks.toJSON() ))
    @addAll()

    return this
