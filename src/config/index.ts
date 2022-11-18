export default {
  PORT: process.env.PORT ?? 2003,
  JWT_SECRET: process.env.JWT_SECRET ?? 'there isnt a JWT secret.',
}
