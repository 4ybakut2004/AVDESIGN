class CreateComponentsImages < ActiveRecord::Migration
  def change
    create_table :components_images do |t|

      t.timestamps null: false
    end
  end
end
