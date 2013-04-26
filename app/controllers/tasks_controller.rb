class TasksController < ApplicationController


  # GET /tasks/1
  # GET /tasks/1.json
  def show
    @task = Task.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @task }
    end
  end

  # GET /tasks/new
  # GET /tasks/new.json
  def new
    @task = Task.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @task }
    end
  end

  # GET /tasks/1/edit
  def edit
    @task = Task.find(params[:id])
  end


  def index
    @tasks = current_user.tasks
    respond_to do |format|
      format.html
      format.json {render :json => @tasks} 
    end
  end
  
  def create
    task = current_user.tasks.build(params[:task])
    if task.save
      respond_to do |format|
        format.json {render :json => {:message => "task saved successfully"}}
      end
    else
      respond_to do |format|
        format.json {render :json => {:message => "task not saved successfully"}}

      end
    end
  end

  def update
  end

  def destroy

  end
  
  def task_management
  end
  
end
