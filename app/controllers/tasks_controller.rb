require 'pry'
class TasksController < ApplicationController

  def welcome
    render 'index'
    binding.pry
  end

  def new
    @task = Task.new
  end

  def index
    @tasks = Task.all
    render :json => @tasks
  end

  def update
    @task = Task.find(params[:updateTask][:id])
    if @task.status == "in_progress"
      @task.status = "complete"
    else
      @task.status = "in_progress"
    end
    @task.save
    @tasks = Task.all
    render :json => @tasks
  end
  
  def update_pomodoro
    @task = Task.find(params[:updatePomodoro][:id])
    @task.tomatonum += 1
    @task.save
    @tasks = Task.all
    render :json => @tasks
  end
  
  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    @tasks = Task.all
    render :json => @tasks
  end

  def show
    @task = Task.find(params[:id])
  end

  def create
    @task = Task.new
    @task.description = params[:newTask]
    @task.status = "in_progress"
    @task.tomatonum = 0
    if @task.save
      render :json => @task
    else
      flash[:notice] = "Task needs a name!"
    end
  end

end
