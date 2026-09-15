import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'Help Desk API',
            version: '1.0.0',
            description: 'API REST para gerenciamento de chamados de Help Desk'
        },

        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },

            schemas: {
                Ticket: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 18
                        },
                        title: {
                            type: 'string',
                            example: 'Computador não liga'
                        },
                        description: {
                            type: 'string',
                            example: 'O computador do setor financeiro não está ligando.'
                        },
                        status: {
                            type: 'string',
                            example: 'on'
                        },
                        user: {
                            type: 'string',
                            example: 'Gustavo'
                        }
                    }
                },

                CreateTicket: {
                    type: 'object',
                    required:
                        ['title', 'description'],
                    properties: {
                        title: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 100,
                            example: 'Computador não liga'
                        },
                        description: {
                            type: 'string',
                            minLength: 5,
                            maxLength: 1000,
                            example: 'O computador do setor financeiro não está ligando.'
                        }
                    }
                },

                UpdateTicket: {
                    type: 'object',
                    required:
                        ['title', 'description'],
                    properties: {
                        title: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 100,
                            example: 'Computador não liga'
                        },
                        description: {
                            type: 'string',
                            minLength: 5,
                            maxLength: 1000,
                            example: 'Problema identificado pelo suporte.'
                        }
                    }
                },

                UpdateStatus: {
                    type: 'object',
                    required:
                        ['status_id'],
                    properties: {
                        status_id: {
                            type: 'integer',
                            example: 3
                        }
                    }
                },

                Error: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'integer',
                            example: 400
                        },
                        message: {
                            type: 'string',
                            example: 'Dados inválidos'
                        }
                    }
                }
            }
        }
    },

    apis: ['./src/routes/*.js']
}

export const swaggerSpec = swaggerJsdoc(options)
