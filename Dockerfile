FROM node:18

# Creamos carpeta de trabajo
WORKDIR /app

# Copiamos solo lo necesario para instalar deps
COPY package*.json ./
COPY tsconfig*.json ./
COPY .npmrc ./

# Instalamos deps
RUN npm install

# Copiamos el resto del código
COPY . .

# Compilamos el código TypeScript
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
