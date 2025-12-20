/* ============================================
    jewelry DB (FIRST-TIME CREATE)
   MySQL 8+ / InnoDB
   ============================================ */

CREATE DATABASE IF NOT EXISTS jewelry
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE jewelry;

-- optional: stricter behavior
SET sql_mode = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- ============================================
-- 1) ACTORS
-- ============================================

CREATE TABLE customer (
  customerID    VARCHAR(10)  NOT NULL,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  countryCode   VARCHAR(10)  NOT NULL DEFAULT '+961',
  phoneNb       VARCHAR(30),
  address       VARCHAR(255),
  cardNb        VARCHAR(255),
  passwordHash  VARCHAR(255) NOT NULL,

  PRIMARY KEY (customerID),
  UNIQUE KEY uq_customer_email (email)
);

CREATE TABLE designer (
  designerID    VARCHAR(10)  NOT NULL,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  countryCode   VARCHAR(10)  NOT NULL DEFAULT '+961',
  phoneNb       VARCHAR(30),
  passwordHash  VARCHAR(255) NOT NULL,

  PRIMARY KEY (designerID),
  UNIQUE KEY uq_designer_email (email)
)      ;

CREATE TABLE supplier (
  supplierID   VARCHAR(10)  NOT NULL,
  name         VARCHAR(120) NOT NULL,
  location     VARCHAR(255),
  email        VARCHAR(255),
  countryCode  VARCHAR(10)  NOT NULL DEFAULT '+961',
  phoneNb      VARCHAR(30),
  description  VARCHAR(500),

  PRIMARY KEY (supplierID)
)      ;

-- ============================================
-- 2) MATERIALS + ACCESSORY BASE
-- ============================================

CREATE TABLE material (
  materialID VARCHAR(10) NOT NULL,
  metal      ENUM('gold','silver','rose gold','14K Gold','14K Silver') NOT NULL,
  price      DECIMAL(10,2) NOT NULL DEFAULT 0.00,

  PRIMARY KEY (materialID),
  CONSTRAINT chk_material_price CHECK (price >= 0)
)      ;

CREATE TABLE accessory (
  accessoryID VARCHAR(10) NOT NULL,
  materialID  VARCHAR(10) NULL,
  price       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  status      ENUM('reserved','available','sold') NOT NULL DEFAULT 'reserved',
  createdAt   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (accessoryID),

  CONSTRAINT chk_accessory_price CHECK (price >= 0),

  CONSTRAINT fk_accessory_material
    FOREIGN KEY (materialID)
    REFERENCES material(materialID)
    ON UPDATE CASCADE
    ON DELETE SET NULL
)      ;

-- ============================================
-- 3) CHARMS + STONES
-- ============================================

CREATE TABLE charm (
  charmID   VARCHAR(10) NOT NULL,
  qty       INT NOT NULL DEFAULT 0,
  price     DECIMAL(10,2) NOT NULL DEFAULT 0.00,

  color     ENUM('Silver','Gold','RoseGold','Multicolor') NOT NULL,
  design    ENUM('shapes','letter bubble','letter cursive','letter spark') NOT NULL,

  photoURL  VARCHAR(500),

  PRIMARY KEY (charmID),
  CONSTRAINT chk_charm_qty   CHECK (qty >= 0),
  CONSTRAINT chk_charm_price CHECK (price >= 0)
)      ;

CREATE TABLE stone (
  stoneID         VARCHAR(10) NOT NULL,
  certificationID VARCHAR(50),

  cut    ENUM('oval','round','princess','pear') NOT NULL,
  gem    VARCHAR(50) NOT NULL,
  purity ENUM('lab grown','real gem') NOT NULL,

  rarity  VARCHAR(30),
  price   DECIMAL(10,2) NOT NULL DEFAULT 0.00,

  color   VARCHAR(50),
  weight  DECIMAL(6,3),
  qty     INT NOT NULL DEFAULT 0,

  photoURL VARCHAR(500),
  colorHex CHAR(7),

  PRIMARY KEY (stoneID),

  CONSTRAINT chk_stone_qty   CHECK (qty >= 0),
  CONSTRAINT chk_stone_price CHECK (price >= 0),
  CONSTRAINT chk_stone_hex   CHECK (colorHex IS NULL OR colorHex REGEXP '^#[0-9A-Fa-f]{6}$')
)      ;

-- ============================================
-- 4) ACCESSORY CONTENT (ORNAMENTS + GEMS)
-- ============================================

CREATE TABLE ornaments (
  accessoryID VARCHAR(10) NOT NULL,
  charmID     VARCHAR(10) NOT NULL,
  quantity    INT NOT NULL DEFAULT 1,

  PRIMARY KEY (accessoryID, charmID),

  CONSTRAINT chk_orn_quantity CHECK (quantity >= 1),

  CONSTRAINT fk_orn_accessory
    FOREIGN KEY (accessoryID) REFERENCES accessory(accessoryID)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT fk_orn_charm
    FOREIGN KEY (charmID) REFERENCES charm(charmID)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
)      ;

CREATE TABLE gems (
  accessoryID VARCHAR(10) NOT NULL,
  stoneID     VARCHAR(10) NOT NULL,
  quantity    INT NOT NULL DEFAULT 1,

  PRIMARY KEY (accessoryID, stoneID),

  CONSTRAINT chk_gems_quantity CHECK (quantity >= 1),

  CONSTRAINT fk_gems_accessory
    FOREIGN KEY (accessoryID) REFERENCES accessory(accessoryID)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT fk_gems_stone
    FOREIGN KEY (stoneID) REFERENCES stone(stoneID)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
)      ;

-- ============================================
-- 5) ACCESSORY SUBTYPES
-- ============================================

CREATE TABLE necklace (
  accessoryID VARCHAR(10) NOT NULL,
  chain       ENUM('cable','thin','rope','box') NOT NULL,
  style       ENUM('name','free charm','birthstone') NOT NULL,

  PRIMARY KEY (accessoryID),

  CONSTRAINT fk_necklace_accessory
    FOREIGN KEY (accessoryID) REFERENCES accessory(accessoryID)
    ON UPDATE CASCADE
    ON DELETE CASCADE
)      ;

CREATE TABLE bracelet (
  accessoryID VARCHAR(10) NOT NULL,
  chain       ENUM('cable','thin','rope','box','satin') NOT NULL,
  style       ENUM('name','free charm','birthstone') NOT NULL,

  PRIMARY KEY (accessoryID),

  CONSTRAINT fk_bracelet_accessory
    FOREIGN KEY (accessoryID) REFERENCES accessory(accessoryID)
    ON UPDATE CASCADE
    ON DELETE CASCADE
)      ;

CREATE TABLE earring (
  accessoryID VARCHAR(10) NOT NULL,
  style       ENUM('hoop square','hoop round','dangling','birthstone') NOT NULL,
  backing     ENUM('clasp','screw') NOT NULL,

  PRIMARY KEY (accessoryID),

  CONSTRAINT fk_earring_accessory
    FOREIGN KEY (accessoryID) REFERENCES accessory(accessoryID)
    ON UPDATE CASCADE
    ON DELETE CASCADE
)      ;

CREATE TABLE ring (
  accessoryID VARCHAR(10) NOT NULL,
  bandType    ENUM('aurora','celeste','tennis') NOT NULL,

  PRIMARY KEY (accessoryID),

  CONSTRAINT fk_ring_accessory
    FOREIGN KEY (accessoryID) REFERENCES accessory(accessoryID)
    ON UPDATE CASCADE
    ON DELETE CASCADE
)      ;

-- ============================================
-- 6) ORDERS
-- ============================================

CREATE TABLE orders (
  orderID         VARCHAR(20) NOT NULL,
  qty             INT NOT NULL DEFAULT 1,
  designerID      VARCHAR(10) NULL,
  isPickup        TINYINT(1) NOT NULL DEFAULT 0,
  price           DECIMAL(10,2) NOT NULL DEFAULT 0.00,

  orderDate       DATE NOT NULL,
  completionDate  DATE NULL,

  address         VARCHAR(255),
  paymentType     ENUM('cash','card') NOT NULL DEFAULT 'cash',

  customerID      VARCHAR(10) NOT NULL,
  status          ENUM('pending','completed') NOT NULL DEFAULT 'pending',

  PRIMARY KEY (orderID),

  CONSTRAINT chk_orders_qty   CHECK (qty >= 1),
  CONSTRAINT chk_orders_price CHECK (price >= 0),

  CONSTRAINT fk_orders_customer
    FOREIGN KEY (customerID) REFERENCES customer(customerID)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_orders_designer
    FOREIGN KEY (designerID) REFERENCES designer(designerID)
    ON UPDATE CASCADE
    ON DELETE SET NULL
)      ;

-- ============================================
-- 7) SUPPLIER BINARY RELATIONS
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
)      ;

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
)      ;

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
)      ;
