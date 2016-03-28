require 'pry'
class TasksController < ApplicationController

  def welcome
    render 'index'
  end

  def new
    binding.pry
    @task = Task.new
  end

  def index
    @tasks = Task.all
    render :json => @tasks
  end

  def update_to_complete
    @task = Task.find(params[:id])
    @task.status = "complete"
  end

  def show
    @task = Task.find(params[:id])
  end

  def create
    @task = Task.new
    @task.description = params[:newTask]
    @task.status = "in_progress"
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
