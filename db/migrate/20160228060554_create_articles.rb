class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title, default: "", null: false
      t.text :text, default: "", null: false

      t.timestamps null: false
    end
  end
end
