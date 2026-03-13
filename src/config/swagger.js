import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BudgetPal API',
      version: '1.0.0',
      description: 'Personal Finance Tracker REST API — Capstone 2026',
      contact: { name: 'BudgetPal' },
    },
    servers: [{ url: '/api/v1', description: 'API v1' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string' },
            data: {},
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            data: { nullable: true, example: null },
          },
        },
        ValidationErrorResponse: {
          allOf: [
            { $ref: '#/components/schemas/ErrorResponse' },
            {
              type: 'object',
              properties: {
                errors: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      field: { type: 'string' },
                      message: { type: 'string' },
                    },
                  },
                },
              },
            },
          ],
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            user_id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'Food' },
            type: { type: 'string', enum: ['income', 'expense'] },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        Transaction: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            user_id: { type: 'string', format: 'uuid' },
            category_id: { type: 'string', format: 'uuid' },
            type: { type: 'string', enum: ['income', 'expense'] },
            amount: { type: 'number', format: 'float', example: 150.00 },
            description: { type: 'string', nullable: true },
            date: { type: 'string', format: 'date', example: '2026-03-06' },
            category: { $ref: '#/components/schemas/Category' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        Budget: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            user_id: { type: 'string', format: 'uuid' },
            category_id: { type: 'string', format: 'uuid' },
            month: { type: 'integer', minimum: 1, maximum: 12 },
            year: { type: 'integer', example: 2026 },
            limit_amount: { type: 'number', format: 'float', example: 500.00 },
            category: { $ref: '#/components/schemas/Category' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/docs/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
