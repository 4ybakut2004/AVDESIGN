class CreateFinishedObjectImages < ActiveRecord::Migration
  def change
    create_table :finished_object_images do |t|
      t.integer :finished_object_id, null: false

      t.timestamps null: false
    end

    add_index :finished_object_images, :finished_object_id
  end
end
