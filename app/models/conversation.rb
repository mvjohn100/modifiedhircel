class Conversation < ActiveRecord::Base
  attr_accessible :company_id, :content, :user_id
  has_many :comments, :dependent => :destroy  
  #
  belongs_to :user  
  has_many :resources, :dependent => :destroy
  
  
end
