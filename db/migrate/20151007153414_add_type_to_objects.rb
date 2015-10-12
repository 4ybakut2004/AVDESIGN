class AddTypeToObjects < ActiveRecord::Migration
  def change
    add_column :finished_objects, :object_type, :integer, null: false
  end
end
