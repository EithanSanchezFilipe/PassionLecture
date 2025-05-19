import { DataTypes, Sequelize } from "sequelize";
import { BookModel } from "../models/book.mjs";
import { AuthorModel } from "../models/author.mjs";
import { CategoryModel } from "../models/category.mjs";
import { CommentModel } from "../models/comment.mjs";
import { EditorModel } from "../models/editor.mjs";
import { UserModel } from "../models/user.mjs";
import { initAssociations } from "../models/associations.mjs";
import { books, authors, editors, categories } from "./data-mock.mjs";

// Create a new instance of Sequelize with the connection string to our database
const sequelize = new Sequelize("db_passion_lecture", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 6033,
  logging: false,
  define: {
    freezeTableName: true,
  },
});

const Editor = EditorModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const Author = AuthorModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Book = BookModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);

await initAssociations(User, Editor, Comment, Category, Book, Author);

// Test the connection

sequelize
  .sync({ force: true })
  .then((_) => {
    initCat();
    initEdi();
    initAut();
    initBook();
    console.log("The database has been synchronized");
  })
  .catch((e) => {
    console.log(`The database couldn't be synchronized`, e);
  });
try {
  await sequelize.authenticate({});
  console.log("Connection to database has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const initCat = () => {
  categories.map((category) => {
    Category.create({ name: category.name });
  });
};
const initEdi = () => {
  editors.map((editor) => {
    Editor.create({ id: editor.id, name: editor.name });
  });
};
const initAut = () => {
  authors.map((author) => {
    Author.create({
      id: author.id,
      lastname: author.lastname,
      firstname: author.firstname,
    });
  });
};
const initBook = () => {
  books.map((book) => {
    Book.create({
      id: book.id,
      name: book.name,
      passage: book.passage,
      summary: book.summary,
      editionYear: book.editionYear,
      pages: book.pages,
      category_fk: book.category_fk,
      author_fk: book.author_fk,
      editor_fk: book.editor_fk,
    });
  });
};

export default sequelize;
export { User, Editor, Comment, Category, Book, Author, sequelize };
