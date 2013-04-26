class Hircle.Routers.TasksRouter extends Backbone.Router
  initialize: (options) ->
    @tasks = new Hircle.Collections.TasksCollection()

  routes:
    "new"      : "newTask"
    "index"    : "index"
    ".*"        : "index"

  newTask: ->
    @view = new Hircle.Views.Tasks.NewView(collection: @tasks)
    $("#tasks").html(@view.render().el)

  index: ->
    @tasks.fetch(
      success:(col,res)->
        @view = new Hircle.Views.Tasks.IndexView(tasks: col)
        $("#tasks").html(@view.render().el)
      error:()->
        console.log "error in fatching tasks"
    )

