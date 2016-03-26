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

  def show
    binding.pry
    @task = Task.find(params[:id])
  end

  def create
    @task = Task.new(task_params)
    @task.save
    redirect_to '/'
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    redirect_to '/'
  end

end
