import swaggerJSDoc from "swagger-jsdoc";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API PassionLecture",
      version: "1.0.0",
      description: "API REST permettant de gérer l'application PassionLecture",
    },
    servers: [
      {
        url: "https://localhost:443",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "Token",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            id: {
              type: "integer",
              description: "L'identifiant unique de l'utilisateur.",
            },
            username: {
              type: "string",
              description: "Le nom d'utilisateur.",
            },
            email: {
              type: "string",
              description: "L'email de l'utilisateur.",
            },
            password: {
              type: "string",
              description: "Le mot de passe de l'utilisateur.",
            },
            created: {
              type: "string",
              format: "date-time",
              description:
                "La date et l'heure de la création d'un utilisateur.",
            },
          },
        },
        Book: {
          type: "object",
          required: ["name", "summary", "editionYear", "pages"],
          properties: {
            id: {
              type: "integer",
              description: "L'identifiant unique du livre.",
            },
            name: {
              type: "string",
              description: "Le nom du livre.",
            },
            passage: {
              type: "string",
              description: "extrait du livre.",
            },
            summary: {
              type: "string",
              description: "Résumé du livre.",
            },
            editionYear: {
              type: "integer",
              description: "Année d'edition du livre.",
            },
            coverImage: {
              type: "blob",
              description: "Image de couverture du livre.",
            },
            pages: {
              type: "integer",
              description: "Nombre de pages que le livre a.",
            },
            created: {
              type: "string",
              format: "date-time",
              description:
                "La date et l'heure de la création d'un utilisateur.",
            },
            category_fk: {
              type: "integer",
              description: "Identifiant de la catégorie associé.",
            },
            editor_fk: {
              type: "integer",
              description: "Identifiant de l'editeur associé.",
            },
            author_fk: {
              type: "integer",
              description: "Identifiant de l'auteur catégorie associé.",
            },
            user_fk: {
              type: "integer",
              description:
                "Identifiant de l'utilisateur qui a ajouter le livre.",
            },
          },
        },
        Category: {
          type: "object",
          required: ["name"],
          properties: {
            id: {
              type: "integer",
              description: "L'identifiant unique de la catégorie.",
            },
            name: {
              type: "string",
              description: "Le nom de la catégorie.",
            },
            created: {
              type: "string",
              format: "date-time",
              description:
                "La date et l'heure de la création d'un utilisateur.",
            },
          },
        },
        Author: {
          type: "object",
          required: ["firstname", "lastname"],
          properties: {
            id: {
              type: "integer",
              description: "L'identifiant unique de la catégorie.",
            },
            firstname: {
              type: "string",
              description: "Le nom de l'auteur.",
            },
            lastname: {
              type: "string",
              description: "Le prénom de l'auteur.",
            },
            created: {
              type: "string",
              format: "date-time",
              description:
                "La date et l'heure de la création d'un utilisateur.",
            },
          },
        },
        Comment: {
          type: "object",
          required: ["note", "message"],
          properties: {
            id: {
              type: "integer",
              description: "L'identifiant unique du commentaire.",
            },
            note: {
              type: "integer",
              description: "Note sur 5 sur le livre.",
            },
            message: {
              type: "string",
              description: "Commentaire de l'utilisateur.",
            },
            created: {
              type: "string",
              format: "date-time",
              description:
                "La date et l'heure de la création d'un utilisateur.",
            },
            user_fk: {
              type: "integer",
              description:
                "Identifiant de l'utilisateur qui a ajouter le commentaire.",
            },
            book_fk: {
              type: "integer",
              description:
                "Identifiant du livre sur lequel porte le ocmmentaire.",
            },
          },
        },
        Editor: {
          type: "object",
          required: ["name"],
          properties: {
            id: {
              type: "integer",
              description: "L'identifiant unique de l'editeur.",
            },
            name: {
              type: "string",
              description: "Le nom de l'editeur.",
            },
            created: {
              type: "string",
              format: "date-time",
              description:
                "La date et l'heure de la création d'un utilisateur.",
            },
          },
        },
        // Ajoutez d'autres schémas ici si nécessaire
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ["./routes/*.mjs"], // Chemins vers vos fichiers de route
};
const swaggerSpec = swaggerJSDoc(options);
export { swaggerSpec };
