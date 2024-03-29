let app = new Vue({
	el: '#app',
	components: {
		'task': {
			props: ['task'],
			template: `
				<div class="ui cards" v-bind:class="task.completed ? 'done' : 'todo'">
				  	<div class="card">
					    <div class="content">
					    	<img class="right floated mini ui">
					      	<div class="header">
					        	{{ task.name }}
					      	</div>
					      	<div class="description">
					      		<input type="checkbox" name="task" v-on:click="app.toggleDone($event, task.id)" :checked="task.completed">
					        	<label>{{ task.description }}</label>
					      	</div>
					    </div>
					    <div class="extra content">
					      	<div class="ui two buttons">
	        					<div class="ui basic blue button" v-on:click="app.editTask($event, task.id)">
	        						<i alt="Edit" class="icon pencil blue"></i>Edit
	        					</div>
	        					<div class="ui basic red button" v-on:click="app.deleteTask($event, task.id)">
	        						<i alt="Delete" class="icon trash red"></i>Delete
	        					</div>
					      	</div>
					    </div>
				  	</div>
				</div>
			`
		}
	},
	data: {
		tasks: [
			{ id: 1, name: 'Todo 1', description: 'This is a todo', completed: false },
			{ id: 2, name: 'Todo 2', description: 'This is a todo', completed: false },
			{ id: 3, name: 'Todo 3', description: 'This is a todo', completed: true },
			{ id: 4, name: 'Todo 4', description: 'This is a todo', completed: true }
		],
		task: {},
		message: '',
		action: 'create'
	},
	computed: {
		todoTasks: function() {
			return this.tasks.filter(item => item.completed == false);
		},
		completedTasks: function() {
			return this.tasks.filter(item => item.completed == true);
		},
		nextId: function() {
			return (this.tasks.sort(function(a, b){ return a.id-b.id; }))
			[this.tasks.length-1].id+1;
		}
	},
	methods: {
		clear: function() {
			this.task = {};
			this.action = 'create';
			this.message = '';
		},
		toggleDone: function(event, id) {
			event.stopImmediatePropagation();
			event.preventDefault();
			let task = this.tasks.find(item => item.id == id);
			if(task) {
				task.completed = !task.completed;
				this.message = `Task ${id} updated.`;
			}
		},
		createTask: function(event) {
			// event.preventDefault();
			if(!this.task.completed) {
				this.task.completed = false;
			}
			else {
				this.task.completed = true;
			}
			let taskId = this.nextId;
			this.task.id = taskId;
			let newTask = Object.assign({}, this.task);
			this.tasks.push(newTask);
			this.clear();
			this.message = `Task ${taskId} created.`;
		},
		editTask: function(event, id) {
			event.stopImmediatePropagation();
			this.action = 'edit';
			let task = this.tasks.find(item => item.id == id);
			if(task) {
				this.task = {
					id: id,
					name: task.name,
					description: task.description,
					completed: task.completed
				};
			}
		},
		updateTask: function(event, id) {
			event.stopImmediatePropagation();
			// event.preventDefault();
			let task = this.tasks.find(item => item.id == id);
			if(task) {
				task.name = this.task.name;
				task.description = this.task.description;
				task.completed = this.task.completed;
				this.message = `Task ${id} updated.`;
			}
		},
		deleteTask: function(event, id) {
			event.stopImmediatePropagation();
			let taskIndex = this.tasks.findIndex(item => item.id == id);
			if(taskIndex > -1) {
				this.$delete(this.tasks, taskIndex);
				this.message = `Task ${id} deleted.`;
			}
		}
	}
})