class AddImageToPlanningImages < ActiveRecord::Migration
  def up
    add_attachment :planning_images, :image
  end

  def down
    remove_attachment :planning_images, :image
  end
end
