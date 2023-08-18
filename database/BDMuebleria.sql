create database MUEBLERIA

use muebleria

create table Usuario(
	usuario varchar(30) primary key,
	contrasena varchar(100) not null,		
	nombres varchar(50),
	apellidos varchar(50),
	email varchar(30), 
    rol varchar(20) default 'cliente'
);

create table Mueble(
	id int auto_increment primary key,
	tipo varchar(20),
	categoria varchar(20),
	descripcion text,
	precio numeric,
	material varchar(25),
	altura numeric,
	ancho numeric,
	largo numeric,
	stock integer,
	imagen varchar(20)
);
drop table detalleVenta, venta
create table Venta(
	id int auto_increment primary key,
    id_usuario varchar(30), foreign key(id_usuario) references Usuario(usuario),
    id_carrito int, foreign key(id_carrito) references Carrito(id),
	fecha date
);

create table DetalleVenta(
	id_mueble int, foreign key(id_mueble) references Mueble(id),
	id_venta int, foreign key(id_venta) references Venta(id),
	cantidad integer
);

create table Carrito( 
	id int auto_increment primary key,
	id_usuario varchar(30), foreign key(id_usuario) references Usuario(usuario),
	estado varchar(15) default 'libre'
);

create table itemCarrito(
	id_carrito int, foreign key(id_carrito) references Carrito(id),
	id_mueble int, foreign key(id_mueble) references Mueble(id),
    cantidad int
);