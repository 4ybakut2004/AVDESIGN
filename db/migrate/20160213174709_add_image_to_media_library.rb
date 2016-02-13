class AddImageToMediaLibrary < ActiveRecord::Migration
  def up
    add_attachment :media_library_images, :image
  end

  def down
    remove_attachment :media_library_images, :image
  end
end
