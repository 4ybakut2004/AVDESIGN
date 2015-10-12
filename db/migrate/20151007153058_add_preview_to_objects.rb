class AddPreviewToObjects < ActiveRecord::Migration
  def up
    add_attachment :finished_objects, :preview
  end

  def down
    remove_attachment :finished_objects, :preview
  end
end
