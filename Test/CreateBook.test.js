import { describe, it, expect, vi } from "vitest";
import { Create } from "../controller/book.mjs"; // La fonction Create dans ton contrôleur
import { ValidationError } from "sequelize"; // Si tu utilises Sequelize pour gérer les erreurs
import { Book } from "../db/sequelize.mjs"; // Modèle Book

// Mock pour Book.create
vi.mock("../db/sequelize.mjs", () => {
  return {
    Book: {
      create: vi.fn(), // On va mocker la méthode create
    },
  };
});

describe("Create Function", () => {
  it("should create a book and return a 201 status", async () => {
    const req = {
      body: {
        name: "Book Title",
        author: "Author Name",
        price: 19.99,
        summary: "A great book.",
        editionYear: 2021,
        pages: 300,
        category_fk: 1,
        author_fk: 2,
        editor_fk: 3,
      },
      user: {
        id: 123,
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    // Mock de la création réussie
    Book.create.mockResolvedValue(req.body);

    // Appel de la fonction Create
    await Create(req, res);

    // Vérification de la réponse
    expect(Book.create).toHaveBeenCalledWith({
      name: "Book Title",
      author: "Author Name",
      price: 19.99,
      summary: "A great book.",
      editionYear: 2021,
      pages: 300,
      user_fk: 123,
      category_fk: 1,
      author_fk: 2,
      editor_fk: 3,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it("should return 400 status for validation error", async () => {
    const req = {
      body: {
        name: "Book Title",
        author: "Author Name",
        price: "invalid", // Erreur de validation (prix invalide)
      },
      user: {
        id: 123,
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    // Mock de l'erreur de validation
    const error = new ValidationError("Validation error");
    Book.create.mockRejectedValue(error);

    // Appel de la fonction Create
    await Create(req, res);

    // Vérification de la réponse
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });
  });
});
