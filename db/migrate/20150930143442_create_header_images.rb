class CreateHeaderImages < ActiveRecord::Migration
  def change
    create_table :header_images do |t|

      t.timestamps null: false
    end
  end
end
