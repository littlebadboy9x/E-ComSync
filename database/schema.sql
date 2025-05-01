-- Single PostgreSQL database with multiple schemas
-- ==============================================
-- Create schemas for each service
CREATE SCHEMA user_service;
CREATE SCHEMA product_service;
CREATE SCHEMA order_service;
CREATE SCHEMA payment_service;
CREATE SCHEMA shipping_service;
CREATE SCHEMA chatbot_service;
CREATE SCHEMA notification_service;

-- ================================
-- Users Service Schema
-- ================================
CREATE TABLE user_service.users
(
    user_id       SERIAL PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL UNIQUE,
    email         VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name    VARCHAR(50),
    last_name     VARCHAR(50),
    phone_number  VARCHAR(20),
    created_at    TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    last_login    TIMESTAMP,
    is_active     BOOLEAN     DEFAULT TRUE,
    is_deleted    BOOLEAN     DEFAULT FALSE,
    role          VARCHAR(20) DEFAULT 'USER'
);

CREATE TABLE user_service.addresses
(
    address_id    SERIAL PRIMARY KEY,
    user_id       INTEGER      NOT NULL REFERENCES user_service.users (user_id),
    address_line1 VARCHAR(100) NOT NULL,
    address_line2 VARCHAR(100),
    city          VARCHAR(50)  NOT NULL,
    state         VARCHAR(50),
    postal_code   VARCHAR(20)  NOT NULL,
    country       VARCHAR(50)  NOT NULL,
    is_default    BOOLEAN DEFAULT FALSE,
    is_deleted    BOOLEAN DEFAULT FALSE
);

-- ================================
-- Product Service Schema
-- ================================
CREATE TABLE product_service.categories
(
    category_id SERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    parent_id   INTEGER REFERENCES product_service.categories (category_id),
    image_url   VARCHAR(255),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted  BOOLEAN   DEFAULT FALSE
);

CREATE TABLE product_service.products
(
    product_id        SERIAL PRIMARY KEY,
    name              VARCHAR(100)   NOT NULL,
    description       TEXT,
    price             NUMERIC(10, 2) NOT NULL,
    discount_price    NUMERIC(10, 2),
    quantity_in_stock INTEGER        NOT NULL DEFAULT 0,
    category_id       INTEGER REFERENCES product_service.categories (category_id),
    image_url         VARCHAR(255),
    created_at        TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    is_active         BOOLEAN                 DEFAULT TRUE,
    is_deleted        BOOLEAN                 DEFAULT FALSE
);

CREATE TABLE product_service.product_images
(
    image_id      SERIAL PRIMARY KEY,
    product_id    INTEGER      NOT NULL REFERENCES product_service.products (product_id),
    image_url     VARCHAR(255) NOT NULL,
    is_primary    BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0
);

CREATE TABLE product_service.product_attributes
(
    attribute_id    SERIAL PRIMARY KEY,
    product_id      INTEGER      NOT NULL REFERENCES product_service.products (product_id),
    attribute_name  VARCHAR(50)  NOT NULL,
    attribute_value VARCHAR(255) NOT NULL
);

-- ================================
-- Order Service Schema
-- ================================
CREATE TABLE order_service.orders
(
    order_id            SERIAL PRIMARY KEY,
    user_id             INTEGER        NOT NULL REFERENCES user_service.users (user_id),
    order_date          TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    total_amount        NUMERIC(10, 2) NOT NULL,
    status              VARCHAR(20) DEFAULT 'PENDING',
    shipping_address_id INTEGER,
    payment_id          INTEGER,
    tracking_number     VARCHAR(100),
    notes               TEXT,
    is_deleted          BOOLEAN     DEFAULT FALSE
);

CREATE TABLE order_service.order_items
(
    order_item_id  SERIAL PRIMARY KEY,
    order_id       INTEGER        NOT NULL REFERENCES order_service.orders (order_id),
    product_id     INTEGER        NOT NULL REFERENCES product_service.products (product_id),
    quantity       INTEGER        NOT NULL,
    price_per_unit NUMERIC(10, 2) NOT NULL,
    total_price    NUMERIC(10, 2) NOT NULL
);

CREATE TABLE order_service.order_status_history
(
    history_id SERIAL PRIMARY KEY,
    order_id   INTEGER     NOT NULL REFERENCES order_service.orders (order_id),
    status     VARCHAR(20) NOT NULL,
    timestamp  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes      TEXT,
    updated_by VARCHAR(50)
);

-- ================================
-- Payment Service Schema
-- ================================
CREATE TABLE payment_service.payments
(
    payment_id         SERIAL PRIMARY KEY,
    order_id           INTEGER        NOT NULL REFERENCES order_service.orders (order_id),
    user_id            INTEGER        NOT NULL REFERENCES user_service.users (user_id),
    amount             NUMERIC(10, 2) NOT NULL,
    payment_method     VARCHAR(50)    NOT NULL,
    payment_status     VARCHAR(20) DEFAULT 'PENDING',
    transaction_id     VARCHAR(100),
    payment_date       TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    last_four_digits   VARCHAR(4),
    expiry_date        VARCHAR(7),
    billing_address_id INTEGER
);

CREATE TABLE payment_service.payment_status_history
(
    history_id SERIAL PRIMARY KEY,
    payment_id INTEGER     NOT NULL REFERENCES payment_service.payments (payment_id),
    status     VARCHAR(20) NOT NULL,
    timestamp  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes      TEXT
);

-- ================================
-- Shipping Service Schema
-- ================================
CREATE TABLE shipping_service.shipments
(
    shipment_id        SERIAL PRIMARY KEY,
    order_id           INTEGER     NOT NULL REFERENCES order_service.orders (order_id),
    carrier            VARCHAR(50) NOT NULL,
    tracking_number    VARCHAR(100),
    status             VARCHAR(20) DEFAULT 'PROCESSING',
    estimated_delivery TIMESTAMP,
    actual_delivery    TIMESTAMP,
    shipping_cost      NUMERIC(10, 2),
    created_at         TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shipping_service.shipment_status_history
(
    history_id  SERIAL PRIMARY KEY,
    shipment_id INTEGER     NOT NULL REFERENCES shipping_service.shipments (shipment_id),
    status      VARCHAR(20) NOT NULL,
    location    VARCHAR(100),
    timestamp   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes       TEXT
);

-- ================================
-- Chatbot Service Schema
-- ================================
CREATE TABLE chatbot_service.chat_sessions
(
    session_id    SERIAL PRIMARY KEY,
    user_id       INTEGER REFERENCES user_service.users (user_id),
    session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_end   TIMESTAMP,
    is_active     BOOLEAN   DEFAULT TRUE,
    device_info   VARCHAR(255),
    ip_address    VARCHAR(50)
);

CREATE TABLE chatbot_service.chat_messages
(
    message_id   SERIAL PRIMARY KEY,
    session_id   INTEGER     NOT NULL REFERENCES chatbot_service.chat_sessions (session_id),
    sender_type  VARCHAR(10) NOT NULL,
    message_text TEXT        NOT NULL,
    timestamp    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read      BOOLEAN   DEFAULT FALSE
);

CREATE TABLE chatbot_service.chatbot_responses
(
    response_id   SERIAL PRIMARY KEY,
    keyword       VARCHAR(100) NOT NULL,
    response_text TEXT         NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- Notification Service Schema
-- ================================
CREATE TABLE notification_service.notifications
(
    notification_id   SERIAL PRIMARY KEY,
    user_id           INTEGER      NOT NULL REFERENCES user_service.users (user_id),
    title             VARCHAR(100) NOT NULL,
    message           TEXT         NOT NULL,
    notification_type VARCHAR(20)  NOT NULL,
    channel           VARCHAR(20) DEFAULT 'EMAIL',
    is_read           BOOLEAN     DEFAULT FALSE,
    created_at        TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    expiry_date       TIMESTAMP
);

CREATE TABLE notification_service.notification_preferences
(
    preference_id     SERIAL PRIMARY KEY,
    user_id           INTEGER     NOT NULL REFERENCES user_service.users (user_id),
    notification_type VARCHAR(20) NOT NULL,
    email_enabled     BOOLEAN DEFAULT TRUE,
    push_enabled      BOOLEAN DEFAULT TRUE,
    sms_enabled       BOOLEAN DEFAULT FALSE
);
