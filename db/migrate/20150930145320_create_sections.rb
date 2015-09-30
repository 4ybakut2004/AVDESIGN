class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.string :name, null: false, default: "Раздел"
      t.text :description
      t.string :key, null: false, default: ""
      t.integer :order, null: false, default: 0

      t.timestamps null: false
    end

    add_index :sections, :key, unique: true
  end
end
