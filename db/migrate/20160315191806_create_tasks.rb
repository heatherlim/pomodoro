class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :description
      t.integer :tomatonum
      t.string :status

      t.timestamps null: false
    end
  end
end