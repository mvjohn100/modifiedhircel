class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.string :status
      t.string :priority
      t.datetime :start_date
      t.datetime :due_date
      t.integer :assignor_id
      t.integer :assignee_id
      t.integer :resource_id
      t.integer :company_id

      t.timestamps
    end
    add_index :tasks, :assignor_id
  end
end
