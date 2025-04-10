# Usa una imagen base con Node.js
FROM node:23.11.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el código fuente incluyendo las plantillas
COPY . .

# Expone el puerto que usa NestJS
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "run", "start:prod"]
