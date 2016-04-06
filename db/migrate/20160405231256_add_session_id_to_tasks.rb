class AddSessionIdToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :session_id, :string
  end
end
