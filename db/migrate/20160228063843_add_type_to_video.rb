class AddTypeToVideo < ActiveRecord::Migration
  def change
    add_column :videos, :video_type, :integer, default: 0
  end
end
