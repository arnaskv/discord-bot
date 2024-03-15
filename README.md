# discord-bot

# Description

A Discord bot that automatically celebrates user achievements by sending personalized, congratulatory messages with success-themed GIFs.

# Key features

1. Dynamic Messages: Fetches random success GIFs and customizes congratulatory messages using templates, sprint titles, and usernames.
2. Discord Integration: Seamlessly sends celebratory messages to a configured Discord server.
3. Message History: Stores sent messages and metadata for later analysis and retrieval.
4. Error Handling: Provides feedback if a message fails to send or store.

# REST API: Offers the following functionality:

1. POST /messages: Triggers sending a congratulatory message.
2. GET /messages: Lists all congratulatory messages.
3. GET /messages?username=johndoe: Filters messages by a specific user.
4. GET /messages?sprint=WD-1.1: Filters messages by a specific sprint.
5. CRUD /templates: Manages congratulatory message templates.
6. CRUD /sprints: Manages sprint data.

## Project Setup

```sh
npm install
```

### Initialize database

```sh
npm run migrate:latest
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
