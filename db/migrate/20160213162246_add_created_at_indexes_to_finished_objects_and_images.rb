class AddCreatedAtIndexesToFinishedObjectsAndImages < ActiveRecord::Migration
  def change
    add_index :finished_objects, :created_at
    add_index :finished_object_images, :created_at
  end
end
