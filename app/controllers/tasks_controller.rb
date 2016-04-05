require 'pry'
class TasksController < ApplicationController

  def welcome
    render 'index'
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

  def show
    @task = Task.find(params[:id])
  end

  def create
    @task = Task.new
    @task.description = params[:newTask]
    @task.status = "in_progress"
    @task.tomatonum = 0
    @task.save
    render :json => @task
    #redirect_to '/'
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    redirect_to '/'
  end

end
