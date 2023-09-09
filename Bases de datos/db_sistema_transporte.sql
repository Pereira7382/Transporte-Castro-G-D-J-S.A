CREATE SCHEMA db_sistema_transporte;

CREATE  TABLE db_sistema_transporte.herramienta ( 
	id_herramienta       INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	nombre               VARCHAR(100)       ,
	cantidad             INT  NOT NULL     ,
	descripcion          VARCHAR(500)       
 ) engine=InnoDB;

CREATE  TABLE db_sistema_transporte.proveedor ( 
	id_proveedor         INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	correo_electronico   VARCHAR(100)  NOT NULL     ,
	telefono             VARCHAR(50)  NOT NULL     ,
	estado               TINYINT  NOT NULL     ,
	contacto             VARCHAR(50)  NOT NULL     ,
	direccion            VARCHAR(1000)  NOT NULL     
 ) engine=InnoDB;

CREATE  TABLE db_sistema_transporte.repuesto ( 
	id_repuesto          INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	nombre               VARCHAR(100)  NOT NULL     ,
	cantidad             INT  NOT NULL     ,
	descripcion          VARCHAR(500)       
 ) engine=InnoDB;

CREATE  TABLE db_sistema_transporte.repuesto_proveedor ( 
	id_repuesto_proveedor INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	id_repuesto          INT  NOT NULL     ,
	id_proveedor         INT  NOT NULL     
 ) engine=InnoDB;

CREATE  TABLE db_sistema_transporte.salida_herramienta ( 
	id_salida            INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	cantidad             INT  NOT NULL     ,
	id_herramienta       INT  NOT NULL     ,
	detalles             VARCHAR(2000)  NOT NULL     
 ) engine=InnoDB;

CREATE  TABLE db_sistema_transporte.salida_repuesto ( 
	id_salida_repuesto   INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	id_repuesto          INT  NOT NULL     ,
	cantidad             INT  NOT NULL     ,
	detalles             VARCHAR(1000)  NOT NULL     
 ) engine=InnoDB;

CREATE  TABLE db_sistema_transporte.tb_camion ( 
	id_camion            INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	matricula            VARCHAR(50)  NOT NULL     ,
	modelo               VARCHAR(50)  NOT NULL     ,
	estado               TINYINT  NOT NULL     ,
	año                  INT  NOT NULL     ,
	numero_bin           INT  NOT NULL     ,
	kilometraje          DOUBLE  NOT NULL     ,
	tipo_camion          VARCHAR(100)  NOT NULL     
 ) engine=InnoDB;

CREATE  TABLE db_sistema_transporte.tb_gastos ( 
	id_gasto             INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	costo                DOUBLE  NOT NULL     ,
	descripcion          VARCHAR(500)  NOT NULL     
 ) engine=InnoDB;
 
CREATE  TABLE db_sistema_transporte.tipo_mantenimiento_preventivo ( 
	id_tipo_mantenimiento INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	tipo                 VARCHAR(100)  NOT NULL     
 ) engine=InnoDB;

CREATE  TABLE db_sistema_transporte.entrada_herramienta ( 
	id_entrada           INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	cantidad             INT  NOT NULL     ,
	id_herramienta       INT  NOT NULL     ,
	detalles             VARCHAR(2000)  NOT NULL     
 ) engine=InnoDB;

CREATE  TABLE db_sistema_transporte.entrada_repuesto ( 
	id_entrada_repuesto  INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	id_repuesto          INT  NOT NULL     ,
	cantidad             INT  NOT NULL     ,
	detalles             VARCHAR(2000)       
 ) engine=InnoDB;

CREATE  TABLE db_sistema_transporte.herramienta_proveedor ( 
	id_herramienta_proveedor INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	id_herramienta       INT  NOT NULL     ,
	id_proveedor         INT  NOT NULL     
 ) engine=InnoDB;

CREATE  TABLE db_sistema_transporte.tb_mantenimiento_preventivo ( 
	id_mantenimiento_preventivo INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	id_tipo              INT  NOT NULL     ,
	tiempo               INT  NOT NULL     ,
	descripcion          VARCHAR(500)  NOT NULL     ,
	id_camion            INT  NOT NULL     ,
	kilometraje_actual   DOUBLE  NOT NULL     
 ) engine=InnoDB;

CREATE  TABLE db_sistema_transporte.tb_mantenimiento_realizado ( 
	id_mantenimiento     INT  NOT NULL   AUTO_INCREMENT  PRIMARY KEY,
	id_camion            INT  NOT NULL     ,
	id_tipo              INT  NOT NULL     ,
	id_gasto             INT  NOT NULL     ,
	fecha_mantenimiento  DATE  NOT NULL     ,
	detalles             VARCHAR(1000)  NOT NULL     
 ) engine=InnoDB;

ALTER TABLE db_sistema_transporte.entrada_herramienta ADD CONSTRAINT fk_entrada_herramienta_herramienta FOREIGN KEY ( id_herramienta ) REFERENCES db_sistema_transporte.herramienta( id_herramienta ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE db_sistema_transporte.entrada_repuesto ADD CONSTRAINT fk_entrada_repuesto_repuesto FOREIGN KEY ( id_repuesto ) REFERENCES db_sistema_transporte.repuesto( id_repuesto ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE db_sistema_transporte.herramienta_proveedor ADD CONSTRAINT fk_herramienta_proveedor_herramienta FOREIGN KEY ( id_herramienta ) REFERENCES db_sistema_transporte.herramienta( id_herramienta ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE db_sistema_transporte.herramienta_proveedor ADD CONSTRAINT fk_herramienta_proveedor_proveedor FOREIGN KEY ( id_proveedor ) REFERENCES db_sistema_transporte.proveedor( id_proveedor ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE db_sistema_transporte.repuesto_proveedor ADD CONSTRAINT fk_repuesto_proveedor_repuesto FOREIGN KEY ( id_repuesto ) REFERENCES db_sistema_transporte.repuesto( id_repuesto ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE db_sistema_transporte.repuesto_proveedor ADD CONSTRAINT fk_repuesto_proveedor_proveedor FOREIGN KEY ( id_proveedor ) REFERENCES db_sistema_transporte.proveedor( id_proveedor ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE db_sistema_transporte.salida_herramienta ADD CONSTRAINT fk_salida_herramienta_herramienta FOREIGN KEY ( id_herramienta ) REFERENCES db_sistema_transporte.herramienta( id_herramienta ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE db_sistema_transporte.salida_repuesto ADD CONSTRAINT fk_salida_repuesto_repuesto FOREIGN KEY ( id_repuesto ) REFERENCES db_sistema_transporte.repuesto( id_repuesto ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE db_sistema_transporte.tb_mantenimiento_preventivo ADD CONSTRAINT fk_tb_mantenimiento_preventivo FOREIGN KEY ( id_tipo ) REFERENCES db_sistema_transporte.tipo_mantenimiento_preventivo( id_tipo_mantenimiento ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE db_sistema_transporte.tb_mantenimiento_preventivo ADD CONSTRAINT fk_tb_mantenimiento_preventivo_camion FOREIGN KEY ( id_camion ) REFERENCES db_sistema_transporte.tb_camion( id_camion ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE db_sistema_transporte.tb_mantenimiento_realizado ADD CONSTRAINT fk_tb_mantenimiento_realizado_gasto FOREIGN KEY ( id_gasto ) REFERENCES db_sistema_transporte.tb_gastos( id_gasto ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE db_sistema_transporte.tb_mantenimiento_realizado ADD CONSTRAINT fk_tb_mantenimiento_realizado FOREIGN KEY ( id_tipo ) REFERENCES db_sistema_transporte.tipo_mantenimiento_preventivo( id_tipo_mantenimiento ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE db_sistema_transporte.tb_mantenimiento_realizado ADD CONSTRAINT fk_tb_mantenimiento_realizado_camion FOREIGN KEY ( id_camion ) REFERENCES db_sistema_transporte.tb_camion( id_camion ) ON DELETE NO ACTION ON UPDATE NO ACTION;
