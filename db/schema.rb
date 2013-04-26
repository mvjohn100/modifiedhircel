# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130426115143) do

  create_table "activities", :force => true do |t|
    t.string   "activity_type"
    t.datetime "create_date"
    t.integer  "activity_by_id"
    t.integer  "activity_with_id"
    t.integer  "company_id"
    t.integer  "department_id"
    t.integer  "conversation_id"
  end

  add_index "activities", ["activity_by_id"], :name => "index_activities_on_activity_by_id"
  add_index "activities", ["activity_with_id"], :name => "index_activities_on_activity_with_id"
  add_index "activities", ["company_id"], :name => "index_activities_on_company_id"

  create_table "comments", :force => true do |t|
    t.text     "content"
    t.integer  "conversation_id"
    t.integer  "user_id"
    t.datetime "create_at"
    t.integer  "parent_id"
    t.integer  "activity_id"
  end

  create_table "companies", :force => true do |t|
    t.string   "name"
    t.string   "subdomain"
    t.string   "city"
    t.string   "state"
    t.string   "website"
    t.integer  "plan_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "conversations", :force => true do |t|
    t.text    "content"
    t.integer "company_id"
    t.integer "user_id"
  end

  create_table "coversations_users", :id => false, :force => true do |t|
    t.integer "coversation_id"
    t.integer "user_id"
  end

  create_table "departments", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "company_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "invitations", :force => true do |t|
    t.string   "email"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "invitation_message"
    t.string   "role_id"
  end

  create_table "orders", :force => true do |t|
    t.integer  "cart_id"
    t.string   "ip_address"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "card_type"
    t.date     "card_expires_on"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  create_table "plans", :force => true do |t|
    t.string   "name"
    t.string   "plan_type"
    t.float    "amount"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "profiles", :force => true do |t|
    t.string  "alternate_email"
    t.string  "phone"
    t.string  "address"
    t.integer "department_id"
    t.integer "user_id"
    t.string  "motto"
  end

  add_index "profiles", ["department_id"], :name => "index_profiles_on_department_id"
  add_index "profiles", ["user_id"], :name => "index_profiles_on_user_id"

  create_table "resources", :force => true do |t|
    t.string   "name"
    t.string   "label"
    t.string   "pointer"
    t.string   "resource_type"
    t.integer  "company_id"
    t.integer  "user_id"
    t.datetime "update_at"
    t.string   "attach_content_type"
    t.string   "attach_file_name"
    t.integer  "attach_file_size"
    t.integer  "conversation_id"
    t.integer  "department_id"
  end

  create_table "roles", :force => true do |t|
    t.string   "name"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.text     "description"
  end

  create_table "roles_users", :id => false, :force => true do |t|
    t.integer "role_id"
    t.integer "user_id"
  end

  create_table "tasks", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.string   "status"
    t.string   "priority"
    t.datetime "start_date"
    t.datetime "due_date"
    t.integer  "assignor_id"
    t.integer  "assignee_id"
    t.integer  "resource_id"
    t.integer  "company_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.integer  "department_id"
  end

  add_index "tasks", ["assignor_id"], :name => "index_tasks_on_assignor_id"

  create_table "tasks_users", :id => false, :force => true do |t|
    t.integer "task_id"
    t.integer "user_id"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.integer  "department_id"
    t.string   "status"
    t.integer  "role_id"
    t.integer  "company_id"
    t.string   "avatar_content_type"
    t.string   "avatar_file_name"
    t.integer  "avatar_file_size"
    t.string   "first_name"
    t.string   "last_name"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
