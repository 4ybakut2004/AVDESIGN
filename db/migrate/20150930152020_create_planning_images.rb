class CreatePlanningImages < ActiveRecord::Migration
  def change
    create_table :planning_images do |t|

      t.timestamps null: false
    end
  end
end
