# KATA-in

An application with next js based on wordle game but with Bahasa Indonesia. Build with Next JS and Tailwind CSS and some others react library.

### Features

- KATA-in produce different word each day with the help of this [repository][KATA-in db] and with a little bit of filter to extract only the 5 unique words.
- KATA-in can also check is the word appropriate with the KBBI with the help of an API from this [repository][KATA-in api-word-check]

[//]: # "Below are the helper link for this app"
[KATA-in db]: https://github.com/dyazincahya/KBBI-SQL-database
[KATA-in api-word-check]: https://github.com/raf555/kbbi-api

### Usage

First, install the dependencies

```
npm install
```

Then, run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

open [http://localhost:3000](http://localhost:3000) to see the result
