# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

admin = Role.create!(:name=>"Admin",:description=>"Administrator role")
Role.create!(:name=>"Employee",:description=>"Employee role")
Role.create!(:name=>"HR",:description=>"HR manager role")
Role.create!(:name=>"Job Seeker",:description=>"Job seeker role")

User.create!(:email=>'admin@hircle.com',:password=>"12345678",:password_confirmation=>"12345678",:role_id=>admin.id)


user = User.create(:email => "user1@example.com",:password => "pleaseplease",:password_confirmation => "pleaseplease")

