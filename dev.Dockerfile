FROM oven/bun:latest

WORKDIR /app/todo-app

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN bun db:push

CMD bun run dev

