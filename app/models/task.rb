class Task < ActiveRecord::Base

  attr_accessible :assignee_id, :assignor_id, :company_id, :description, :due_date, :priority, :resource_id, :start_date, :status, :title, :department_id
    
  #has_many :users, :through => :tasks_users
  has_and_belongs_to_many :users
  belongs_to :department
  
  belongs_to :assignor, :class_name => "User", :foreign_key => "assignor_id"
  belongs_to :asignee, :class_name => "User", :foreign_key => "user_id"


end
