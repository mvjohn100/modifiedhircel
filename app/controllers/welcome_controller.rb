class WelcomeController < ApplicationController
  before_filter :authenticate_user!
  def index
    case current_user.role
      when Role.find_by_name("Admin")
        redirect_to :controller=>"administrator",:action=>"index"
    end
  end
end
