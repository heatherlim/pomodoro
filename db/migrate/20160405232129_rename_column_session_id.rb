class RenameColumnSessionId < ActiveRecord::Migration
  def change
    rename_column :tasks, :session_id, :user_id
  end
end
