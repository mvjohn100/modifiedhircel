class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  # Will to be used later.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model

  attr_accessible :email, :password, :password_confirmation, :remember_me, :role_id, :department_id, :status,
                  :first_name,:last_name,:company_id
  # attr_accessible :title, :body

  #has_and_belongs_to_many :roles  # Mani - This cannot be the case - only user can have one role
  belongs_to :role

  #add by Yang

  # status: onling or offline
  # add avatar and full name
  
  has_attached_file :avatar,:styles => { :medium => "300x300>", :thumb => "100x100>" }
  
  belongs_to :company

  belongs_to :department
  #has_many :tasks, :through => :tasks_users
  has_and_belongs_to_many :tasks
  has_many :resources
  has_one :profile

  has_many :tasks, :foreign_key => "assignee_id"

  def full_name
    first_name+' '+last_name 
  end
  
end
