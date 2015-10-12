class RemoveTitleAndAddShortDescriptionToObjects < ActiveRecord::Migration
  def change
    remove_column :finished_objects, :title
    add_column :finished_objects, :short_description, :text
  end
end
