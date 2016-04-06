class DropTomatoes < ActiveRecord::Migration
  def change
    drop_table :tomatoes
  end
end
