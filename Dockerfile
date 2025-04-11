# Usa una imagen base con Node.js
FROM node:23.11.0

# Crea un directorio de trabajo
WORKDIR /app

# Copia los archivos de definición del proyecto
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el código fuente (incluye /src y templates)
COPY . .

# Compila el proyecto NestJS a JavaScript
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Inicia la aplicación
CMD ["npm", "run", "start:prod"]
