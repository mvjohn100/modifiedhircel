$(function(){
	/** template helper **/
	var template = function(name){
		return Handlebars.compile($('#'+name+'Template').html());
	};

    var getUserId = function(){
    	return $('#push>._user_id_').val() || "";
    }

	/** Models **/
	// Department && Department Collection
	var Department = Backbone.Model.extend({
		defaults:{
			"company_id":null,
			"created_at":"",
			"description":"",
			"id":null,
			"name":"",
			"updated_at":""
		}
	});

	var Departments = Backbone.Collection.extend({
		model:Department,
		url:"../departments.json"
	});


	/** Documents Model **/
	var Document = Backbone.Model.extend({
		defaults:{
			"attach_content_type": "",
			"attach_file_name": "",
			"attach_file_size": 0,
			"company_id": null,
			"conversation_id": null,
			"department_id": null,
			"id": null,
			"label": "",
			"name": "requirment file of project",
			"pointer": "",
			"update_at": "",
			"user_id": null
		}

	});
	var Documents = Backbone.Collection.extend({
		model:Document,
		url:'../documents.json'
	});
	/** end of Documents Model **/

	/** documents view **/
	var DocumentView = Backbone.View.extend({
		tagName:'li',
		template:template('J_Document'),
		render:function(){
			this.$el.off();
			this.$el.html(this.template(this.model.attributes));
			return this;
		},
		initialize:function(){
			this.render();
			return this;
		}
	});
	var DocumentListView = Backbone.View.extend({
		el:"#J_DocumentListBox",
		template:template('J_DocumentMeta'),
		initialize:function(){
			this.render();
			this.collection.on('all',this.renderList,this);
			this.collection.url = "../departments/"+this.options.departmentId+"/documents.json";
			this.collection.fetch();
			return this;
		},
		render:function(){
			var departmentId = this.options.departmentId;
			var userId = getUserId();
			this.$el.off();
			this.$el.empty();
			this.$el.html(this.template({user_id:userId,department_id:departmentId}));
			return this;
		},
		renderList:function(){
			var listContainer = this.$el.find('#J_DocumentList');
			listContainer.empty();
			this.collection.each(function(doc){
				listContainer.append(new DocumentView({model:doc}).el);
			},this);
		}
	});


	/**end of documents view **/

	/**Department Meta Model**/
	var DepartmentMeta = Backbone.Model.extend({
		defaults:{
			"id":null,
			"name":"New Department",
			"manager":"Mock manager",
			"employees":0,
			"tasks":0,
			"documents":0
		},
		name:function(){
			return this.get('name');
		}
	});

	var DepartmentMetas = Backbone.Collection.extend({
		model:DepartmentMeta,
		url:'../companies/1/departments.json'
	});

	// Employee && Employee Collection
	var Employee = Backbone.Model.extend({
		urlRoot:"../api/employees",
		defaults:{
	        "id": null,
	        "email": "godherself@heaven.org",
	        "thumbnail": "/avatars/thumb/missing.png",
	        "status": "offline",
	        "name": "Nobody",
	        "tasks": [],
	        "documents": [],
	        "profile": {}
    	},
		name:function(){
			return this.get('name');
		}
	});

	var Employees = Backbone.Collection.extend({
		model:Employee,
		url:"../departments/:id/employees.json"
	});

	var EmployeeSearchResult = Backbone.Collection.extend({
		model:Employee,
		url:"../companies/1/employees.json"
	});
	var EmployeeCandidatePool = Backbone.Collection.extend({
		model:Employee
	});
	/*Employee view && Employee list view*/
	var EmployeeView = Backbone.View.extend({
		template:template("J_Employee"),
		tagName:"div",
		className:"drawer-box",
		events:{
			"click .J_ToggleBtn":"togglePanel"
		},
		togglePanel :function(evt){
			this.$el.toggleClass('expand');
			if (this.$el.hasClass('expand')) {
				$(evt.target).attr('class','icon-chevron-down J_ToggleBtn');
				
			}else{
				$(evt.target).attr('class','icon-chevron-up J_ToggleBtn');
			}
		},
		initialize:function(){
			this.render();
		},
		render:function(){
			// for some reason the array type attributes can't access through
			// this.attrname() method. use the PO directly. 
			this.$el.html(this.template(this.model.attributes)); 
			return this;
		}
		
	});

	var EmployeeListView = Backbone.View.extend({
		el:'#J_EmployeeList',

		initialize:function(){
			this.collection.on('all',this.render,this);
			this.collection.fetch();
		},
		render:function(){
			this.$el.empty();
			this.collection.each(function(employee){
				var employeeView = new EmployeeView({model:employee});
				this.$el.prepend(employeeView.el);
			},this);
			
		}
	});


	var EmployeeSearchResultListView = Backbone.View.extend({
		el:'#J_Suggest',
		events:{
			"mouseenter li":"hover",
			"mouseleave li":"leave"
		},
		render:function(){
			this.$el.empty();
			this.collection.each(function(employee){
				this.$el.append((new EmployeeSearchResultItemView({model:employee})).el);
			},this);
			this.$el.find('li').first().addClass('selected');
			return this;
		},
		initialize:function(){
			this.collection.on('all',this.render,this);
		},
		hover:function(evt){
			this.$(evt.target).addClass('selected');

			
		},
		leave:function(evt){
			this.$(evt.target).removeClass('selected');

			
		},
		searchResult:function(searchKeyword){
			this.collection.url = "../companies/1/employees/"+searchKeyword+".json";
			this.collection.fetch();
			if (searchKeyword) {
				this.$el.removeClass('inactive');

			}else{
				this.$el.addClass('inactive');
			}	

		}
	});

	var EmployeeSearchResultItemView = Backbone.View.extend({
		tagName:'li',
		initialize:function(){
			this.render();
		},
		render:function(){
			this.$el.html(this.model.get('name'));
			return this;
		}
	});
	/**menu view**/
	var SideMenuView = Backbone.View.extend({
		template:template('J_SideMenu'),
		el:'#J_SideMenu',
		events:{
			"click a":"togglePanel"
		},
		initialize:function(){
			this.render();
		},
		render:function(){
			this.$el.html(this.template(this));
			return this;
		},
		oid:function(){
			return this.model.get('id');
		},
		togglePanel:function(evt){
			if ($(evt.target).hasClass('J_DocmentMenu')) {
				$('#J_DocumentMeta').removeClass('inactive');
				$('#J_DepartmentMeta').addClass('inactive');
			}else{
				$('#J_DocumentMeta').addClass('inactive');
				$('#J_DepartmentMeta').removeClass('inactive');
			}
		}
	});

	/** Department View && DepartmentList View**/
	var DepartmentAddFormView = Backbone.View.extend({
		template:template('J_AddDepartmentForm'),
		el:'#J_AddDepartmentForm',
		events:{
			"submit":"addDepartment"
		},
		render:function(){
			this.$el.html(this.template(this));
			return this;
		},
		initialize:function(){
			this.render(); 
		},
		addDepartment:function(evt){
			evt.preventDefault();
			this.options.listView.collection.create(
				{
				"company_id":1,
				"created_at":new Date(),
				"description":"",
				"name":this.$el.find('#J_DepartmentName').val(),
				"updated_at":new Date()
			});
			this.$el.find('#J_DepartmentName').val('');
			return false;
				
		}
	});


	var DepartmentView = Backbone.View.extend({
		tagName:"li",
		template:template('J_Department'),
		events:{
			"click .J_RemoveDepartment":"removeDepartment",
			"click .J_EditDepartment":"editDepartment",
			"keyup .J_NameEditor":"updateDepartmentName",
			"click .J_DepartmentPanel":"backToNormal",
			"click":"togglePanel"
		},
		render:function(){
			this.$el.html(this.template(this));
			return this;
		},
		oid:function(){			
			return this.model.get('id');
		},
		name:function(){
			return this.model.get('name');
		},
		removeDepartment:function(){
			this.model.url = '../departments/'+this.model.get('id')+'.json';
			this.model.destroy();
		},
		editDepartment:function(evt){

			var $departmentItem =$(evt.target).siblings('a');
			var $editInput = $departmentItem.find('.J_NameEditor');
			if ($editInput.length) {
				var value = $departmentItem .attr('data-origin');
				$departmentItem .attr('data-origin',value);
				$departmentItem.html($departmentItem .attr('data-origin'));
				$(evt.target).removeClass('icon-edit').addClass('icon-pencil');
			}else{			
				var originValue = $departmentItem.html();
				$departmentItem.attr('data-origin',originValue);
				$departmentItem.html('<input class="J_NameEditor name-input" type="text">');
				$('.J_NameEditor').focus().val(originValue);
				$(evt.target).removeClass('icon-pencil').addClass('icon-edit');
			}
			

		},// show the edit input when hit edit btn hit again back to normal
		updateDepartmentName:function(evt){

			if (evt.keyCode == 13) {
				var $departmentItem  = $(evt.target).parent();
				var value = $(evt.target).val() || $departmentItem .attr('data-origin');
				$departmentItem .attr('data-origin',value);
				$departmentItem.html($departmentItem .attr('data-origin'));
				$departmentItem.siblings('.J_EditDepartment').removeClass('icon-edit').addClass('icon-pencil');
				this.model.url = '../departments/'+this.model.get('id')+'.json';
				this.model.set('name',value);
				this.model.save();
				return false;
			}
		},// do the edit name opeation hit enter to submit
		togglePanel:function(){
			$('#J_DocumentMeta').addClass('inactive');
			$('#J_DepartmentMeta').removeClass('inactive');
		}
	});
	var DepartmentListView = Backbone.View.extend({
		el:'#J_DepartmentList',

		initialize:function(){
			this.collection.on('all',this.render,this);
			this.collection.fetch();
		},
		render:function(evtName){
			this.$el.empty();
			this.collection.each(function(department){
				var departmentView = new DepartmentView({model:department});
				this.$el.append(departmentView.render().el);
				new SideMenuView({model:department});
				new DepartmentMetaView({model:department});
				

			},this);

			return this;
		}
		
	});

	var DepartmentMetaView = Backbone.View.extend({
		el:"#J_DepartmentMeta",
		template:template("J_DepartmentMeta"),
		initialize:function(){
			this.render();
		},
		render:function(){
			this.$el.html(this.template(this));
			return this;
		},
		manager:function(){
			return this.model.get("manager");
		},
		employees:function(){
			return this.model.get("employees");
		},
		tasks:function(){
			return this.model.get("tasks");
		},
		documents:function(){
			return this.model.get("documents");
		},
		name:function(){
			return this.model.get("name");
		}
	});
	var EmployeeCardView = Backbone.View.extend({
		tagName:"span",
		className:"employee-thumb tag",
		template:template("J_EmployeeCard"),
		render:function(){
			this.$el.html(this.template(this));
			return this;
		},
		initialize:function(){
			this.render();
		},
		name:function(){
			return this.model.get("name");
		},
		thumbnail:function(){
			return this.model.get("thumbnail");
		},
		oid:function(){
			return this.model.get("id");
		}
	});
	var EmployeeWorkInfoView = Backbone.View.extend({
		el:"#J_EmployeeWorkInfo",
		template:template("J_EmployeeWorkInfo"),
		render:function(){
			this.$el.off();
			this.$el.empty();
			this.$el.html(this.template(this.model.attributes));
			return this;
		},
		initialize:function(){
			this.render();
		}
	});

	var EmployeeCandidatePoolView = Backbone.View.extend({
		el:"#J_EmployeeCandidatePool",

		initialize:function(){
			this.collection = new EmployeeCandidatePool();
			this.collection.on('add',this.render,this);
			this.collection.on('remove',this.render,this);
		},
		render:function(){
			this.$el.empty();
			this.collection.each(function(employee){
				var view = new EmployeeCardView({model:employee});
				this.$el.append(view.el);
			},this);
			return this;
		},
		add:function(model){
			this.collection.add(model);
			return this;
		},
		remove:function(id){
			this.collection.remove(this.collection.get(id));
			return this;
		},
		showWorkInfo:function(id){
			var model = this.collection.get(id);
			console.log(model);
			new EmployeeWorkInfoView({model:model});
		}
	});

	
	var EmployeeAddFormView = Backbone.View.extend({
		el:'#J_EmployeeAddSection',
		template:template('J_AddEmployeeForm'),
		events:{
			"keyup #J_AddEmployeeInput":"showSuggest",
			"click #J_Suggest>li":"choose",
			"click #J_AddEmployeeBtn":"addToCandidatePool",
			"click .J_RemoveEmployeeCard":"removeFromCandidatePool",
			"click #J_EmployeeCandidatePool":"showWorkInfo",
			"submit .employee-add-form":"updateEmployeeToDepartment"
		},
		initialize:function(){
			
			this.render();
			this.candidatePoolView = new EmployeeCandidatePoolView();
		},
		render:function(){
			this.$el.off();
			this.$el.empty();
			this.$el.html(this.template(this));
			return this;
		},
		dataset:new EmployeeSearchResult(),
		showSuggest:function(evt){
			var value = this.$(evt.target).val();
			if (!this.suggestEmployeesView) {
				this.suggestEmployeesView = new EmployeeSearchResultListView({collection:this.dataset});
			};
			this.suggestEmployeesView.searchResult(value);		

		},
		choose:function(evt){
			this.$el.find('#J_AddEmployeeInput').val(this.$(evt.target).html());
			this.$el.find('#J_Suggest').addClass('inactive');
		},
		addToCandidatePool:function(){
			var employeeName=this.$el.find('#J_AddEmployeeInput').val();
			var model = this.dataset.where({name:employeeName})[0];
			if (model) {
				this.candidatePoolView.add(model);
				this.$el.find('#J_AddEmployeeInput').val('');

			}else{
				console.log("cant't find the employee");
			}
			
			return false;
		},
		removeFromCandidatePool:function(evt){
			var oid = this.$(evt.target).attr('data-oid');
			this.candidatePoolView.remove(oid);
		},
		showWorkInfo:function(evt){
			var oid = this.$(evt.target).parent('.tag').find('.J_RemoveEmployeeCard').attr('data-oid');
			this.candidatePoolView.showWorkInfo(oid);
		},
		updateEmployeeToDepartment:function(evt){
			var employeeIds = [];

			this.candidatePoolView.collection.each(function(employee){
				employeeIds.push(employee.get('id'));
			},this);
			var ids = employeeIds.join(',');
			$.post('/departments/'+ids+'/addemployees/'+ this.options.departmentId);
			return false;
		}
	});

	var EmployeeDetailPageView = Backbone.View.extend({
		el:'#J_DetailPanel',
		template:template('J_EmployeeFrame'),
		initialize:function(){
			this.render();
		},
		render:function(){
			this.$el.off();
			this.$el.empty();
			this.$el.html(this.template(this));
			return this;
		}

	});



	var Activiy = Backbone.Model.extend({
	});
	var Activities = Backbone.Collection.extend({
		model:Activiy,
		url:"../departments/:id/activities.json"
	});


	var Comment = Backbone.Model.extend({

	});
	var Comments = Backbone.Collection.extend({
		model:Comment,
		url:'../activities/:id/comments.json'
	});
	var CommentView = Backbone.View.extend({
		template:template('J_Message'),
		initialize:function(){
			this.render();
		},
		render:function(){
			this.$el.html(this.template(this.model.attributes));
			return this;
		}
	});
	var CommentsView=Backbone.View.extend({
		render:function(){
			this.$el.empty();
			this.collection.each(function(comment){
				this.$el.append(new CommentView({model:comment}).el);
			},this);	
		},
		initialize:function(){
			this.collection.on('all',this.render,this);
			this.collection.fetch();
		}
	});
	var ActivitySectionView = Backbone.View.extend({
		tagName:'div',
		className:'date-section',
		template:template('J_ActivitySection'),
		render:function(){
			this.$el.html(this.template(this.model.attributes));

			// do some adjustment
			this.$el.find('.J_ActiviyType').each(function(){
				if($(this).attr('data-type') != $(this).find('.type').html()){
					$(this).hide();
				}
			});
			

			return this;
		},
		initialize:function(){
			this.render();
		}
	});

	var ActivityDetailPageView = Backbone.View.extend({
		el:'#J_DetailPanel',
		template:template('J_ActivityDetailPage'),
		events:{
			'click .J_ExpandableBox':'togglePanel',
			'click .J_ReplyTrigger':'toggleEditor',
			'keyup .editor textarea':'postMessage'
		},
		render:function(){
			this.$el.off();
			this.$el.empty();
			this.$el.html(this.template(this));
			return this;
		},
		renderItems:function(){
			if(!this.$activityContainer){
				this.$activityContainer = this.$el.find('#J_ActivitySections');
			}
			
			this.$activityContainer.empty();
			this.collection.each(function(activity){
				this.$activityContainer.append(new ActivitySectionView({model:activity}).el);
			},this);


		},
		initialize:function(){
			this.render();
			this.collection.on('all',this.renderItems,this);
			this.collection.fetch();
		},
		togglePanel:function(evt){
			var $currentTarget = this.$(evt.currentTarget);
			var $commentBox = $currentTarget.find('.J_CommentBox');
			var activityId = $currentTarget.attr('data-actid');
			if(this.$(evt.target).hasClass('J_ExpandBtn')){
				this.$(evt.currentTarget).toggleClass('expand');
				if (this.$(evt.currentTarget).hasClass('expand')) {
					this.$(evt.target).removeClass('icon-chevron-up').addClass('icon-chevron-down');
				}else{
					
					this.$(evt.target).removeClass('icon-chevron-down').addClass('icon-chevron-up');
				}
			}

			if ($currentTarget.hasClass('expand') && $commentBox.find('.text-details').length == 0) {
				var commentCollections = new Comments();
				commentCollections.url = '../activities/'+activityId+'/comments.json';
				new CommentsView({collection:commentCollections,el:$commentBox});

			}

		},
		toggleEditor:function(evt){
			evt.preventDefault();
			if ($(evt.target).hasClass('J_ReplyAction')) {

				$(evt.currentTarget).next().toggleClass('inactive');
			}else {
				$(evt.currentTarget).next().addClass('inactive');
			}
		},
		postMessage:function(evt){
			
			if (evt.keyCode == 13) {
				var value = $(evt.currentTarget).val();
				this.collection.url = '../comments.json';
				var replyId = $(evt.currentTarget).attr('data-replyid'); // params for reply
				var activityId = $(evt.currentTarget).attr('data-actid');// params for reply
				this.collection.create({content:value,user_id:getUserId(),parent_id:replyId,activity_id:activityId,create_at:new Date()});
				
			}
			return false;
		}
	});
	var RootView = Backbone.View.extend({
		el:'#page',
		initialize:function(){
			this.departments = new Departments();
			this.departmentMetas= new DepartmentMetas();
			this.departmentMetas.fetch();

			this.employeesInDepartment = new Employees();
			this.documentsInDepartment = new Documents();
		},
		render:function(){
			return this;
		}
	});
	/*DepartmentApp Router*/
	var DepartmentRouter = Backbone.Router.extend({
		routes:{
			"":"boot",
			"departments/:id":"switchDepartment",
			"departments/:id/tasks":"listTasksInDepartment",
			"departments/:id/employees":"listEmployeesInDepartment",
			"departments/:id/activities":"listActivitiesInDepartment",
			"departments/:id/documents":"listDocumentsInDepartment",
			"uploadstart":"uploadstartHandle",
			"uploadsuccess/:id":"uploadsuccessHandle",
		},
		boot:function(){
			this.rootView = new RootView();
			this.departmentListView = new DepartmentListView({collection:this.rootView.departments});
			this.departmentAddFormView = new DepartmentAddFormView({listView:this.departmentListView});
			this.navigate("departments/1/employees",{trigger:true,replace:true});
		},
		listDepartments:function(){
			
		}, // load the department list when started
		loadDepartment:function(departmentId){

		}, // load the department. if not by select, just load the one on the top.

		switchDepartment:function(departmentId){	
			this.testMatch();
			this.sideMenuView = new SideMenuView({model:this.rootView.departments.get(departmentId)});

			this.departmentMetaView = new DepartmentMetaView({model:this.rootView.departmentMetas.get(departmentId)})
		},// switch around in the department list
		loadMenu:function(){

		}, // when switch the department, the menu on the left side should rerender
		listActivitiesInDepartment:function(departmentId){
			this.testMatch();
			var collection = new Activities();
			collection.url = '../departments/'+departmentId+'/activities.json';
			new ActivityDetailPageView({collection:collection});
		},// when hit the "conversation"  menu item list the activities in the current department
		listEmployeesInDepartment:function(departmentId){
			this.testMatch();
			new EmployeeDetailPageView();
			new EmployeeAddFormView({departmentId:departmentId});
			var employees = this.rootView.employeesInDepartment;
			employees.url = "../departments/"+departmentId+"/employees.json";
			this.employeeListView = new EmployeeListView({
				collection:employees
			});
		},// when hit the "employee " menu item list the employees in the current department
		addEmployeeToDepartment:function(departmentId){
			this.testMatch();
		}, // add new employee to the current department
		listTasksInDepartment:function(departmentId){
			this.testMatch();
		},
		listDocumentsInDepartment:function(departmentId){
			this.testMatch();
			new DocumentListView({departmentId:departmentId,collection:this.rootView.documentsInDepartment});

		},// when hit the "document" menu item document list should appear
		addDocument:function(){

		},// upload new document
		testMatch:function(){
			if (!this.rootView) {
				this.navigate("",{trigger:true,replace:true});
				return;
			}	
		},
		uploadstartHandle:function(){
			this.testMatch();
		},
		uploadsuccessHandle:function(departmentId){
			this.testMatch();
			this.listDocumentsInDepartment(departmentId);
		}
	});
	var app = new DepartmentRouter();
	Backbone.history.start();
});