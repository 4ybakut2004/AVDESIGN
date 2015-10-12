class CreateFinishedObjects < ActiveRecord::Migration
  def change
    create_table :finished_objects do |t|
      t.string :name
      t.string :title

      t.timestamps null: false
    end
  end
end
