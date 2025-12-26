/* ============================================
   — jewelry DB (FIRST-TIME CREATE)
   MySQL 8+
   (FULL SCRIPT — column order matches your diagrams)
   ============================================ */

CREATE DATABASE IF NOT EXISTS jewelry
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE jewelry;

SET sql_mode = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- ============================================
-- 1) ACTORS
-- ============================================

CREATE TABLE designer (
  designerID    VARCHAR(4)   NOT NULL,
  name          VARCHAR(100) NOT NULL,
  branch        VARCHAR(100) NOT NULL,
  email         VARCHAR(100) NOT NULL,
  countryCode   VARCHAR(5)   NOT NULL DEFAULT '+961',
  phoneNb       CHAR(8)      NULL,
  passwordHash  VARCHAR(255) NOT NULL,

  PRIMARY KEY (designerID),
  UNIQUE KEY uq_designer_email (email),

  CONSTRAINT chk_designer_phone
    CHECK (phoneNb IS NULL OR phoneNb REGEXP '^[0-9]{8}$')
);

CREATE TABLE customer (
  customerID    VARCHAR(4)   NOT NULL,
  firstName     VARCHAR(50)  NOT NULL,
  lastName      VARCHAR(50)  NOT NULL,
  countryCode   VARCHAR(5)   NOT NULL DEFAULT '+961',
  phoneNb       CHAR(8)      NULL,
  email         VARCHAR(100) NOT NULL,
  cardNb        VARCHAR(255) NULL,
  passwordHash  VARCHAR(255) NOT NULL,

  PRIMARY KEY (customerID),
  UNIQUE KEY uq_customer_email (email),

  CONSTRAINT chk_customer_phone
    CHECK (phoneNb IS NULL OR phoneNb REGEXP '^[0-9]{8}$')
);

CREATE TABLE supplier (
  supplierID   VARCHAR(4)   NOT NULL,
  name         VARCHAR(100) NOT NULL,
  location     VARCHAR(200) NULL,
  email        VARCHAR(100) NULL,
  countryCode  VARCHAR(5)   NOT NULL DEFAULT '+961',
  phoneNb      CHAR(8)      NULL,
  description  VARCHAR(100) NULL,

  PRIMARY KEY (supplierID),

  CONSTRAINT chk_supplier_phone
    CHECK (phoneNb IS NULL OR phoneNb REGEXP '^[0-9]{8}$')
);

-- ============================================
-- 2) MATERIALS + ACCESSORY BASE
-- (order matches your images: accessoryID, price, materialID, status)
-- ============================================

CREATE TABLE material (
  materialID VARCHAR(4)    NOT NULL,
  metal      VARCHAR(50)   NOT NULL,
  price      DECIMAL(10,2) NOT NULL DEFAULT 0.00,

  PRIMARY KEY (materialID),

  CONSTRAINT chk_material_price CHECK (price >= 0),
  CONSTRAINT chk_material_metal CHECK (metal IN ('gold','silver','rose gold','14K Gold','14K Silver'))
);

CREATE TABLE accessory (
  accessoryID VARCHAR(4)    NOT NULL,
  price       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  materialID  VARCHAR(4)    NULL,
  status      VARCHAR(20)   NOT NULL DEFAULT 'reserved',

  PRIMARY KEY (accessoryID),

  CONSTRAINT chk_accessory_price  CHECK (price >= 0),
  CONSTRAINT chk_accessory_status CHECK (status IN ('reserved','available','sold')),

  CONSTRAINT fk_accessory_material
    FOREIGN KEY (materialID)
    REFERENCES material(materialID)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

-- ============================================
-- 3) CHARMS + STONES
-- ============================================

CREATE TABLE charm (
  charmID   VARCHAR(4)    NOT NULL,
  qty       INT           NOT NULL DEFAULT 0,
  price     DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  color     VARCHAR(20)   NOT NULL,
  design    VARCHAR(20)   NOT NULL,
  photoURL  VARCHAR(500)  NULL,

  PRIMARY KEY (charmID),

  CONSTRAINT chk_charm_qty   CHECK (qty >= 0),
  CONSTRAINT chk_charm_price CHECK (price >= 0),
  CONSTRAINT chk_charm_color CHECK (color IN ('Silver','Gold','RoseGold','Multicolor')),
  CONSTRAINT chk_charm_design CHECK (design IN ('shapes','letter bubble','letter cursive','letter spark'))
);

CREATE TABLE stone (
  stoneID         VARCHAR(4)    NOT NULL,
  certificationID VARCHAR(50)   NULL,
  cut             VARCHAR(50)   NOT NULL,
  gem             VARCHAR(50)   NOT NULL,
  purity          VARCHAR(50)   NOT NULL,
  rarity          VARCHAR(50)   NULL,
  price           DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  color           VARCHAR(30)   NULL,
  weight          DECIMAL(8,3)  NULL,
  qty             INT           NOT NULL DEFAULT 0,
  photoURL        VARCHAR(500)  NULL,
  colorHex        VARCHAR(7)    NULL,

  PRIMARY KEY (stoneID),

  CONSTRAINT chk_stone_qty   CHECK (qty >= 0),
  CONSTRAINT chk_stone_price CHECK (price >= 0),
  CONSTRAINT chk_stone_hex   CHECK (colorHex IS NULL OR colorHex REGEXP '^#[0-9A-Fa-f]{6}$')
);

-- ============================================
-- 4) ACCESSORY CONTENT (ORNAMENTS + GEMS)
-- (ornaments order matches your image: charmID, accessoryID, quantity)
-- ============================================

CREATE TABLE ornaments (
  charmID     VARCHAR(4) NOT NULL,
  accessoryID VARCHAR(4) NOT NULL,
  quantity    INT        NOT NULL,

  PRIMARY KEY (charmID, accessoryID),

  CONSTRAINT chk_orn_quantity CHECK (quantity >= 1),

  CONSTRAINT fk_orn_charm
    FOREIGN KEY (charmID) REFERENCES charm(charmID)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_orn_accessory
    FOREIGN KEY (accessoryID) REFERENCES accessory(accessoryID)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE gems (
  accessoryID VARCHAR(4)   NOT NULL,
  stoneID     VARCHAR(4)   NOT NULL,
  quantity    DECIMAL(3,0) NOT NULL,

  PRIMARY KEY (accessoryID, stoneID),

  CONSTRAINT chk_gems_quantity CHECK (quantity >= 0),

  CONSTRAINT fk_gems_accessory
    FOREIGN KEY (accessoryID) REFERENCES accessory(accessoryID)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT fk_gems_stone
    FOREIGN KEY (stoneID) REFERENCES stone(stoneID)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- ============================================
-- 5) ACCESSORY SUBTYPES
-- (order matches your images)
-- ============================================

CREATE TABLE bracelet (
  braceletID  VARCHAR(4)   NOT NULL,
  length      DOUBLE       NOT NULL,
  style       VARCHAR(100) NOT NULL,
  accessoryID VARCHAR(4)   NOT NULL,
  chain       VARCHAR(50)  NOT NULL,

  PRIMARY KEY (braceletID),
  UNIQUE KEY uq_bracelet_accessory (accessoryID),

  CONSTRAINT chk_bracelet_length CHECK (length > 0),

  CONSTRAINT fk_bracelet_accessory
    FOREIGN KEY (accessoryID) REFERENCES accessory(accessoryID)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE necklace (
  necklaceID  VARCHAR(4)  NOT NULL,
  length      DOUBLE      NOT NULL,
  accessoryID VARCHAR(4)  NOT NULL,
  chain       VARCHAR(50) NOT NULL,
  style       VARCHAR(20) NOT NULL,

  PRIMARY KEY (necklaceID),
  UNIQUE KEY uq_necklace_accessory (accessoryID),

  CONSTRAINT chk_necklace_length CHECK (length > 0),

  CONSTRAINT fk_necklace_accessory
    FOREIGN KEY (accessoryID) REFERENCES accessory(accessoryID)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE earring (
  earringID   VARCHAR(4)   NOT NULL,
  backing     VARCHAR(100) NOT NULL,
  size        DOUBLE       NOT NULL,
  accessoryID VARCHAR(4)   NOT NULL,
  style       VARCHAR(20)  NOT NULL,

  PRIMARY KEY (earringID),
  UNIQUE KEY uq_earring_accessory (accessoryID),

  CONSTRAINT chk_earring_size CHECK (size > 0),

  CONSTRAINT fk_earring_accessory
    FOREIGN KEY (accessoryID) REFERENCES accessory(accessoryID)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE ring (
  ringID      VARCHAR(4)   NOT NULL,
  bandType    VARCHAR(100) NOT NULL,
  diameter    DOUBLE       NOT NULL,
  accessoryID VARCHAR(4)   NOT NULL,

  PRIMARY KEY (ringID),
  UNIQUE KEY uq_ring_accessory (accessoryID),

  CONSTRAINT chk_ring_diameter CHECK (diameter > 0),

  CONSTRAINT fk_ring_accessory
    FOREIGN KEY (accessoryID) REFERENCES accessory(accessoryID)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- ============================================
-- 6) ORDERS
-- (order matches your image exactly)
-- ============================================

CREATE TABLE orders (
  orderID         VARCHAR(4)    NOT NULL,
  qty             DECIMAL(4,0)  NOT NULL,
  designerID      VARCHAR(4)    NULL,
  isPickup        TINYINT(1)    NOT NULL DEFAULT 0,
  price           DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  orderDate       DATE          NOT NULL,
  completionDate  DATE          NULL,
  address         VARCHAR(100)  NULL,
  paymentType     VARCHAR(50)   NOT NULL,
  customerID      VARCHAR(4)    NOT NULL,
  status          VARCHAR(20)   NOT NULL DEFAULT 'pending',

  PRIMARY KEY (orderID),

  CONSTRAINT chk_orders_qty   CHECK (qty >= 1),
  CONSTRAINT chk_orders_price CHECK (price >= 0),
  CONSTRAINT chk_orders_paytype CHECK (paymentType IN ('cash','card')),
  CONSTRAINT chk_orders_status  CHECK (status IN ('pending','completed')),

  CONSTRAINT fk_orders_designer
    FOREIGN KEY (designerID) REFERENCES designer(designerID)
    ON UPDATE CASCADE
    ON DELETE SET NULL,

  CONSTRAINT fk_orders_customer
    FOREIGN KEY (customerID) REFERENCES customer(customerID)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE TABLE orderitems (
  orderID     VARCHAR(4) NOT NULL,
  accessoryID VARCHAR(4) NOT NULL,

  PRIMARY KEY (orderID, accessoryID),

  CONSTRAINT fk_oi_order
    FOREIGN KEY (orderID) REFERENCES orders(orderID)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT fk_oi_accessory
    FOREIGN KEY (accessoryID) REFERENCES accessory(accessoryID)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- ============================================
-- 7) SUPPLIER ITEMS (as in your diagram: supplieditems)
-- ============================================


CREATE TABLE supplier_material (
  supplierID VARCHAR(10) NOT NULL,
  materialID VARCHAR(10) NOT NULL,

  PRIMARY KEY (supplierID, materialID),

  CONSTRAINT fk_sm_supplier
    FOREIGN KEY (supplierID) REFERENCES supplier(supplierID)
    ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT fk_sm_material
    FOREIGN KEY (materialID) REFERENCES material(materialID)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE supplier_stone (
  supplierID VARCHAR(10) NOT NULL,
  stoneID    VARCHAR(10) NOT NULL,
  qty        INT NOT NULL DEFAULT 1,

  PRIMARY KEY (supplierID, stoneID),

  CONSTRAINT chk_ss_qty CHECK (qty >= 0),

  CONSTRAINT fk_ss_supplier
    FOREIGN KEY (supplierID) REFERENCES supplier(supplierID)
    ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT fk_ss_stone
    FOREIGN KEY (stoneID) REFERENCES stone(stoneID)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE supplier_charm (
  supplierID VARCHAR(10) NOT NULL,
  charmID    VARCHAR(10) NOT NULL,
  qty        INT NOT NULL DEFAULT 1,

  PRIMARY KEY (supplierID, charmID),

  CONSTRAINT chk_sc_qty CHECK (qty >= 0),

  CONSTRAINT fk_sc_supplier
    FOREIGN KEY (supplierID) REFERENCES supplier(supplierID)
    ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT fk_sc_charm
    FOREIGN KEY (charmID) REFERENCES charm(charmID)
    ON DELETE CASCADE ON UPDATE CASCADE
);

