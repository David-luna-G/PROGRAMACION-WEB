-- db/init.sql

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('root', 'admin', 'user'))
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuario Root de prueba (Se ignora si ya existe gracias a ON CONFLICT)
INSERT INTO users (username, password_hash, role) 
VALUES ('super_root', 'hash_generico_123', 'root')
ON CONFLICT (username) DO NOTHING;

-- Insertar productos de prueba
INSERT INTO products (name, description, price, stock) 
VALUES 
    ('Laptop MacBook Pro 16"', 'Chip M2 Pro, 16GB RAM, 512GB SSD', 2499.99, 10),
    ('Monitor LG UltraWide 34"', 'Monitor curvo WQHD de 34 pulgadas', 450.50, 25),
    ('Teclado Mecánico Keychron K8', 'Teclado inalámbrico TKL con switches Brown', 89.00, 50);