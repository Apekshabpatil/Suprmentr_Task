const Blog = require("./blogModel");

console.log("Blog Schema Created Successfully");

const sampleBlog = {
  title: "Introduction to MERN Stack",
  content: "Learning MERN Stack Development",
  author: "Apeksha Patil",
  category: "Technology",
  tags: ["MongoDB", "Express", "React", "Node"]
};

console.log(sampleBlog);