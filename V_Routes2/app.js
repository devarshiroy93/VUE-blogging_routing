var firstComponent = Vue.component('component1', {
    'template': `<div>
    <div><div id="example-3">
    <v-container fluid>
      
      <v-layout row>

        <v-flex xs6 offset-xs3>
        <v-card dark class="primary">
         <v-subheader>Login</v-subheader>
         <v-card class="grey lighten-4 elevation-0">
    <v-card-text>
      <v-container fluid>
        
        <v-layout row>
          <v-flex xs4>
            <v-subheader>UserName</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-2"
              class="input-group--focused">
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Password</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-3"
              type = "password"
              class="input-group--focused">
            </v-text-field>
          </v-flex>
        </v-layout>
        <div>
              <v-btn primary dark>Normal</v-btn>
     </div>
      </v-container>
      
    </v-card-text>
  </v-card>
        </v-card>
      </v-flex>
        
        
      </v-layout>

     
    </v-container>
  </div>
      </div>
      </div>`,


    methods: {
        clickMethod: function () {
            alert('componeent1');
        }
    },
    created() {
        //this.fetchData();
    },
})
var secondComponent = Vue.component('component2', {
    'template': `  <div>
                    <div>
					<div v-on:click="clickMethod2">List of all posts</div><div v-for = 'p in post'>
                     <v-container fluid>
                      <v-layout row>
                      <v-flex xs6 offset-xs3>
                    <v-card>
                    <v-card-title primary-title>
                    <div>
                    <h3 class="headline mb-0"><span>{{p.id}}</span>{{p.title}}</h3>
                    <div>{{p.body}}</div>
                    </div>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn flat class="orange--text">Share{{p.id}}</v-btn>
                    <p class="orange--text btn btn--flat"><router-link :to = "'/inpost/' + p.id">Explore</router-link></p>
                    </v-card-actions>
                    </v-card>
                    </v-flex>
                    </v-layout>
                     </v-container>
                    </div>
                    </div>
                </div>`,
    data: function () {
        return {
            'post': null,
            'error': null
        }
    },
    methods: {
        clickMethod2: function () {
            alert('componeent2');
        },
        fetchData: function () {
            var self = this._data;
            axios.get('http://jsonplaceholder.typicode.com/' + this.$route.params.id)
                .then(response => {
				this.post = response.data;
				console.log('hi')
				} );

        }
    },
    created() {
        //alert('in created 2');
        this.fetchData();
    },
    
})
var individualPostComp = Vue.component('indPostComp',{
    'template' : `<div>
                    <div>
                        <v-container fluid>
                            <v-layout row>
                                <v-flex xs6 offset-xs3>
                                    <v-card>
                                        <v-card-title primary-title>
                                            <div>
                                                 <h3 class="headline mb-0">{{postData.title}}<span></span></h3>
                                                 <div>{{postData.body}}</div>
                                            </div>
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-btn flat class="orange--text" v-on:click = "">Share</v-btn>
                                            <div v-on:click = "beginComment" ><v-btn flat class="orange--text" >Comment</v-btn></div>
                                            <v-btn flat class="orange--text">Report</v-btn>
                                        </v-card-actions>
                                     </v-card>
									<div>
									 <!––comment component begins --> 
									<comment-comp :showComment = doComment></comment-comp>
									</div><!––comment component ends -->
                                </v-flex>
                             </v-layout>
                            </v-container>
                        </div>
                    </div>`,
					data : function(){
						return {
							'postData' : {'title': '','body' : '','userId' : '',},
							'doComment' : false
							
						}
					},
                    created(){
						debugger
                        console.log(this.$route.params.id)
						this.fetchPostData();
                    },
					
					methods : {
						fetchPostData : function(){
							debugger
							 axios.get('http://jsonplaceholder.typicode.com/posts/' + this.$route.params.id)
							.then(response => {
							this.postData = response.data;
							
							} );
						},
						beginComment : function(){
							this.doComment = true;
						}
					}
})

Vue.component('commentComp',{'template' : `<div>
											<div class="comment-wrapper">
											<label class= "subheader">Comments:</label>
												<div class="comment-line" v-for = "c in commentsData">
													<span class="comment-owner">{{c.from}}</span><span>{{c.title}}</span>
													<p><span class="enableHand" v-on:click ="addLike(c)">Like</span><span style="margin-right: 10em;"><img class="like"src="img/like.png"/>{{c.likeCount}}</span> <span>Time of Post</span></p>
												</div>
											</div>
											<div>
											</div>
										  </div>`,
											
				 props: ['showComment'],							
				data : function(){
					return{
						'commentsData' : [{'title' : 'Not very clear' , 'from' : 'Nandita', 'likeCount': 5},
										  {'title' : 'Need to work on some areas' , 'from' : 'Andrew vilnisk' ,'likeCount': 5}]
					}
				},
				methods : {
					addLike : function(comment){
						console.log(comment);
						comment.likeCount++
					}
				}
});;

const routes = [
    { path: '/page1/:id', component: firstComponent },
    { path: '/page2/:id', component: secondComponent },
	{ path: '/inpost/:id', component: individualPostComp}
]
const router = new VueRouter({
    routes
})
var app = new Vue({
    router,
    el: "#app",
}).$mount('#app')





