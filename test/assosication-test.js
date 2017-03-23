const assert = require('assert');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');
const User = require('../src/user');

describe('Data associations', () => {
   let joe, blogPost, comment;

    beforeEach((done) =>{
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'Post Title', content: 'This really is a nice post'});
        comment = new Comment({content: 'Tottaly agree!'});

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('Saves a relation between a user and a post', (done) => {
        User.findOne({name: 'Joe'})
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === "Post Title");
                done();
            })
    });

    it('Saves all data associations', (done) =>{
       User.findOne({name: 'Joe'})
       //queriying nested associated data. use the config object and state populate method
       //several times including the model
           .populate({
               path: 'blogPosts',
               populate: {
                   path: 'comments',
                   model: 'Comment',
                   populate: {
                       path: 'user',
                       model: 'User'
                   }
               }
           })
           .then((user) => {
               // console.log(user.blogPosts[0].comments[0].content);
               assert(user.name === 'Joe');
               assert(user.blogPosts[0].title === 'Post Title');
               assert(user.blogPosts[0].content === 'This really is a nice post');
               assert(user.blogPosts[0].comments[0].content === 'Tottaly agree!');
               done();
           });
    });

    it('Saves all data associations', (done) =>{
       User.findOne({name: 'Joe'})
           .populate({
               path: 'blogPosts',
               populate: {
                   path: 'comments',
                   model: 'Comment',
                   populate: {
                       path: 'user',
                       model: 'User'
                   }
               }
           })
           .exec((err, user) => {
              if(err){
                  console.warn(err)
              } else {
                  console.log(user);
                  assert(user.name === 'Joe');
                  assert(user.blogPosts[0].title === 'Post Title');
                  assert(user.blogPosts[0].content === 'This really is a nice post');
                  assert(user.blogPosts[0].comments[0].content === 'Tottaly agree!');
                  assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                  done();
              }
           });
    });


});

