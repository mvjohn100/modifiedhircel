require 'spec_helper'

describe Task do
  it "checks model is corrctly written" do
    Task.create(
      :assignee_id => 1,
      :assignor_id => 1,
      :company_id => 1,
      :description => "This is testing task",
      :due_date => Date.new,
      :priority=> "1",
      :resource_id => 1,
      :start_date => (Date.new - 1.day),
      :status => "pending",
      :title => "Test Task"
      )
      
    task  = Task.all.first
    expect(task.assignee_id).to eq(1)
      
  end
end
