<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <input v-model="search" @keyup="rechercher">
    <p><a @click="artVisible">Articules visibles</a></p>
     <p><a @click="star">Articules stars</a></p>
    <ul class="collection">
    <transition-group name="list" tag="list">
    <li class="collection-item" :key="post.id" v-for="post in posts">{{post.title}} 
    <a @click="remove(post.id)"><i class="material-icons">delete</i></a>
    </li>
    </transition-group>
    </ul>
    
    <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s3">
          <i class="material-icons prefix">account_circle</i>
          <input v-model="newPost.title" id="icon_prefix" type="text" class="validate">
          <label for="icon_prefix">title</label>
        </div>
        <div class="input-field col s3">
          <i class="material-icons prefix">stars</i>
          <input v-model="newPost.note" id="icon_telephone" type="range" min="0" max="15" class="validate">
          <label for="icon_telephone">Note</label>
        </div>
        <div class="input-field col s3">
          <input v-model="newPost.visible" id="icon_telephone" type="checkbox" class="validate">
          <label for="icon_telephone">visible</label>
        </div>
      </div>
      <button @click="send"><i class="material-icons prefix">add</i>ADD</button>
    </form>
  </div>
    
  </div>
</template>

<script>
export default {
  name: 'hello',
   created(){
    this.$http.get('http://localhost:3000/').then((res) => {this.posts = res.body;
  });
  }, methods: {
    rechercher(){
      this.$http.get(`http://localhost:3000/search/${this.search}`).then((res) =>{
        this.posts = res.body;
      });
    },
    artVisible(){
      this.$http.get(`http://localhost:3000/articlesVisble`).then((res) =>{
        this.posts = res.body;
      });
    },
    star(){
      this.$http.get(`http://localhost:3000/star`).then((res) =>{
        this.posts = res.body;
      });
    },
    remove(id){
      console.log(id)
       this.$http.get(`http://localhost:3000/remove/${id}`).then((res) =>{
        this.posts = res.body;
      });
    },
    send(){
      this.$http.post(`http://localhost:3000/send`, this.newPost).then((res) =>{
        this.posts = res.body;
        });
        // despues de agregar los inpunt estan vacios otra vez
        this.newPost = {
        title : "",
        visible: true,
        note: 3,
      }
    }
  },
  data () {
    return {
      msg: 'NodeJS & Vue JS',
      posts : [],
      search: "",
      newPost :{
        title : "",
        visible: true,
        note: 3
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  <!-- display: inline-block; -->
  margin: 0 10px;
}

a {
  color: #42b983;
}
.list-enter-active, .list-leave-active{
  transition: all 0.5s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(-15px);
}
</style>
