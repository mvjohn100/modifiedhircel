class Profile < ActiveRecord::Base
  attr_accessible :address, :alternate_email, :department_id, :phone, :user_id, :metto
  belongs_to :user
end
