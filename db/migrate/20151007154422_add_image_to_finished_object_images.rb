class AddImageToFinishedObjectImages < ActiveRecord::Migration
  def up
    add_attachment :finished_object_images, :image
  end

  def down
    remove_attachment :finished_object_images, :image
  end
end
