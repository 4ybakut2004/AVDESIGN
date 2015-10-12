class AddImageToComponentsImages < ActiveRecord::Migration
  def up
    add_attachment :components_images, :image
  end

  def down
    remove_attachment :components_images, :image
  end
end
