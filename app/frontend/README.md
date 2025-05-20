# ReMemory App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.3.

## Development server

Add to `frontend` folder file named `proxy.conf.json` with content:

```
{
  "/api/*": {
    "target": "https://app.rememory.ru/",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": "https://app.rememory.ru/api"
    }
  }
}
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
