CREATE TABLE eating_place (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE menu_item (
    id BIGSERIAL PRIMARY KEY,
    eating_place_id BIGINT NOT NULL REFERENCES eating_place(id),
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2),
    description TEXT
);

CREATE TABLE rating (
    id BIGSERIAL PRIMARY KEY,
    eating_place_id BIGINT NOT NULL REFERENCES eating_place(id),
    score INT NOT NULL CHECK (score BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);