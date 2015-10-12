class AddImageToSponsorts < ActiveRecord::Migration
  def up
    add_attachment :sponsors, :image
  end

  def down
    remove_attachment :sponsors, :image
  end
end
