class AddDescriptionToObjects < ActiveRecord::Migration
  def change
    add_column :finished_objects, :description, :text
  end
end
