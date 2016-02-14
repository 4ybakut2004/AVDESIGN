class AddNameToVideoAndIndex < ActiveRecord::Migration
  def change
    add_column :videos, :name, :string
    add_index :videos, :created_at
  end
end
