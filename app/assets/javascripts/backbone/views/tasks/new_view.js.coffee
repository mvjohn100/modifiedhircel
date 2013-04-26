Hircle.Views.Tasks ||= {}

class Hircle.Views.Tasks.NewView extends Backbone.View
  template: JST["backbone/templates/tasks/new"]

  events:
    "submit #new-task": "save"

  save: (e) ->
    e.preventDefault()
    e.stopPropagation()
    
    formHash = $("#new-task").hashForm()
    @model = new Hircle.Models.Task()
    
    @model.set formHash
    @model.save(
      {}
      success: (task) =>
        @model = task
        window.location.hash = "/"

      error: (task, jqXHR) =>
        @model.set({errors: $.parseJSON(jqXHR.responseText)})
    )

  render: ->
    $(@el).html(@template)

    return this
