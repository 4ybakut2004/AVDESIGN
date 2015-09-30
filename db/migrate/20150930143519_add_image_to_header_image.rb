class AddImageToHeaderImage < ActiveRecord::Migration
  def up
    add_attachment :header_images, :image
  end

  def down
    remove_attachment :header_images, :image
  end
end
