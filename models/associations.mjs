const initAssociations = (User, Editor, Comment, Category, Book, Author) => {
  Book.belongsTo(Category, {
    foreignKey: 'category_fk',
  });
  Category.hasMany(Book, {
    foreignKey: 'category_fk',
  });
  User.belongsToMany(Book, {
    through: Comment,
    foreignKey: 'user_fk',
  });

  Book.belongsToMany(User, {
    through: Comment,
    foreignKey: 'book_fk',
  });
  Comment.belongsTo(User, {
    foreignKey: 'user_fk',
  });

  Comment.belongsTo(Book, {
    foreignKey: 'book_fk',
  });
  Book.belongsTo(Editor, {
    foreignKey: 'editor_fk',
  });
  Editor.hasMany(Book, {
    foreignKey: 'editor_fk',
  });
  Author.hasMany(Book, {
    foreignKey: 'author_fk',
  });
  Book.belongsTo(Author, {
    foreignKey: 'author_fk',
  });
};
export { initAssociations };
