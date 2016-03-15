require 'pry'
class TasksController < ApplicationController


  def new
    @task = Task.new
  end

  def show
    binding.pry
    @task = Task.find(params[:id])
  end

  def create
    @task = Task.new(task_params)
    @task.save
    track_activity(@task)
    redirect_to '/'
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    redirect_to '/'
  end

end
