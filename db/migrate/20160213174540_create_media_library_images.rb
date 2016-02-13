class CreateMediaLibraryImages < ActiveRecord::Migration
  def change
    create_table :media_library_images do |t|

      t.timestamps null: false
    end
  end
end
