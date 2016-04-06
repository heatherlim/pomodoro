require 'pry'
class TasksController < ApplicationController

  def welcome
    render 'index'
    unless session[:user_id]
      session[:user_id] = SecureRandom.uuid
    end
  end

  def new
    @task = Task.new
  end
  
  def create
    @task = Task.new
    @task.description = params[:newTask]
    @task.status = "in_progress"
    @task.tomatonum = 0
    @task.user_id = session[:user_id]
    if @task.save
      render :json => @task
    else
      flash[:notice] = "Task needs a name!"
    end
  end

  def index
    @tasks = Task.where(:user_id == session[:user_id])
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
    @tasks = Task.where(:user_id == session[:user_id])
    render :json => @tasks
  end
  
  def update_pomodoro
    @task = Task.find(params[:updatePomodoro][:id])
    @task.tomatonum += 1
    @task.save
    @tasks = Task.where(:user_id == session[:user_id])
    render :json => @tasks
  end
  
  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    @tasks = Task.where(:user_id == session[:user_id])
    render :json => @tasks
  end

  def show
    @task = Task.find(params[:id])
  end

  

end
